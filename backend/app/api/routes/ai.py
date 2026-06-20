from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.security import get_current_user, get_current_hotel_id
from app.models.user import User
from app.models.room import Room
from app.models.guest import Guest
from app.models.reservation import Reservation
from app.models.payment import Payment
from app.models.housekeeping import HousekeepingTask
from app.models.staff import Staff
from app.core.config import settings
from pydantic import BaseModel
from typing import List
from uuid import UUID
import anthropic

router = APIRouter(prefix="/ai", tags=["AI Concierge"])

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

async def get_hotel_context(db: AsyncSession, hotel_id: UUID) -> str:
    total_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id))
    available_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Available"))
    occupied_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Occupied"))
    cleaning_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Cleaning"))
    maintenance_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Maintenance"))
    total_guests = await db.execute(select(func.count(Guest.id)).where(Guest.hotel_id == hotel_id))
    vip_guests = await db.execute(select(func.count(Guest.id)).where(Guest.hotel_id == hotel_id, Guest.vip == True))
    total_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id))
    confirmed_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id, Reservation.status == "Confirmed"))
    checkedin_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id, Reservation.status == "Checked In"))
    total_revenue = await db.execute(select(func.sum(Payment.amount)).where(Payment.hotel_id == hotel_id, Payment.status == "Successful"))
    pending_payments = await db.execute(select(func.sum(Payment.amount)).where(Payment.hotel_id == hotel_id, Payment.status == "Pending"))
    pending_tasks = await db.execute(select(func.count(HousekeepingTask.id)).where(HousekeepingTask.hotel_id == hotel_id, HousekeepingTask.status == "Pending"))
    total_staff = await db.execute(select(func.count(Staff.id)).where(Staff.hotel_id == hotel_id))
    active_staff = await db.execute(select(func.count(Staff.id)).where(Staff.hotel_id == hotel_id, Staff.status == "Active"))

    total_r = total_rooms.scalar() or 0
    occupied_r = occupied_rooms.scalar() or 0
    occupancy_rate = round((occupied_r / total_r * 100), 1) if total_r > 0 else 0

    recent_reservations = await db.execute(
        select(Reservation).where(Reservation.hotel_id == hotel_id).order_by(Reservation.check_in.desc()).limit(5)
    )
    reservations = recent_reservations.scalars().all()
    res_details = "\n".join([f"- {r.reservation_number}: Check-in {r.check_in}, Check-out {r.check_out}, Status: {r.status}, Amount: ₦{r.total_amount:,}" for r in reservations]) or "No recent reservations"

    context = f"""
LIVE HOTEL DATA:

ROOMS:
- Total: {total_r}
- Available: {available_rooms.scalar() or 0}
- Occupied: {occupied_r}
- Cleaning: {cleaning_rooms.scalar() or 0}
- Maintenance: {maintenance_rooms.scalar() or 0}
- Occupancy Rate: {occupancy_rate}%

GUESTS:
- Total Registered: {total_guests.scalar() or 0}
- VIP Guests: {vip_guests.scalar() or 0}

RESERVATIONS:
- Total: {total_reservations.scalar() or 0}
- Confirmed: {confirmed_reservations.scalar() or 0}
- Checked In: {checkedin_reservations.scalar() or 0}

RECENT RESERVATIONS:
{res_details}

REVENUE:
- Total Collected: ₦{(total_revenue.scalar() or 0):,}
- Pending Payments: ₦{(pending_payments.scalar() or 0):,}

HOUSEKEEPING:
- Pending Tasks: {pending_tasks.scalar() or 0}

STAFF:
- Total: {total_staff.scalar() or 0}
- Active: {active_staff.scalar() or 0}
"""
    return context

@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    if not settings.ANTHROPIC_API_KEY:
        raise HTTPException(status_code=500, detail="AI service not configured")

    hotel_context = await get_hotel_context(db, hotel_id)

    system_prompt = f"""You are the CMR AI Concierge — an intelligent hospitality operations assistant built into CMR Hospitality Suite by CMR Group.

You have real-time access to live hotel data. Use this data to answer questions accurately and helpfully.

{hotel_context}

INSTRUCTIONS:
- Answer questions about hotel operations clearly and concisely
- Be professional, helpful, and specific with numbers from the live data above
- Format responses with line breaks for readability
- Keep responses under 200 words unless a detailed breakdown is needed
- If asked about something not in the data, say you don't have that information
- Always refer to actual numbers from the live data, never make up figures"""

    client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        system=system_prompt,
        messages=[{"role": m.role, "content": m.content} for m in request.messages],
    )

    return {"reply": response.content[0].text}