from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.room import Room
from app.models.guest import Guest
from app.models.reservation import Reservation
from app.models.payment import Payment
from app.models.housekeeping import HousekeepingTask
from uuid import UUID

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/summary")
async def get_summary(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    total_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id))
    available_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Available"))
    occupied_rooms = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id, Room.status == "Occupied"))
    total_guests = await db.execute(select(func.count(Guest.id)).where(Guest.hotel_id == hotel_id))
    total_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id))
    confirmed_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id, Reservation.status == "Confirmed"))
    checkedin_reservations = await db.execute(select(func.count(Reservation.id)).where(Reservation.hotel_id == hotel_id, Reservation.status == "Checked In"))
    total_revenue = await db.execute(select(func.sum(Payment.amount)).where(Payment.hotel_id == hotel_id, Payment.status == "Successful"))
    pending_tasks = await db.execute(select(func.count(HousekeepingTask.id)).where(HousekeepingTask.hotel_id == hotel_id, HousekeepingTask.status == "Pending"))

    total_r = total_rooms.scalar() or 0
    available_r = available_rooms.scalar() or 0
    occupied_r = occupied_rooms.scalar() or 0
    occupancy_rate = round((occupied_r / total_r * 100), 1) if total_r > 0 else 0

    return {
        "rooms": {
            "total": total_r,
            "available": available_r,
            "occupied": occupied_r,
            "occupancy_rate": f"{occupancy_rate}%",
        },
        "guests": {
            "total": total_guests.scalar() or 0,
        },
        "reservations": {
            "total": total_reservations.scalar() or 0,
            "confirmed": confirmed_reservations.scalar() or 0,
            "checked_in": checkedin_reservations.scalar() or 0,
        },
        "revenue": {
            "total": total_revenue.scalar() or 0,
        },
        "housekeeping": {
            "pending_tasks": pending_tasks.scalar() or 0,
        },
    }