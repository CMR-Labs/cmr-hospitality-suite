from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.event import EventHall, EventBooking
from app.schemas.event import EventHallCreate, EventHallUpdate, EventHallResponse, EventBookingCreate, EventBookingResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/events", tags=["Event Halls"])

@router.get("/halls", response_model=List[EventHallResponse])
async def get_halls(hotel_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EventHall).where(EventHall.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/halls", response_model=EventHallResponse)
async def create_hall(hotel_id: UUID, data: EventHallCreate, db: AsyncSession = Depends(get_db)):
    hall = EventHall(hotel_id=hotel_id, **data.model_dump())
    db.add(hall)
    await db.commit()
    await db.refresh(hall)
    return hall

@router.patch("/halls/{hall_id}", response_model=EventHallResponse)
async def update_hall(hall_id: UUID, data: EventHallUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EventHall).where(EventHall.id == hall_id))
    hall = result.scalar_one_or_none()
    if not hall:
        raise HTTPException(status_code=404, detail="Event hall not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(hall, key, value)
    await db.commit()
    await db.refresh(hall)
    return hall

@router.get("/bookings", response_model=List[EventBookingResponse])
async def get_bookings(hotel_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EventBooking).where(EventBooking.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/bookings", response_model=EventBookingResponse)
async def create_booking(hotel_id: UUID, data: EventBookingCreate, db: AsyncSession = Depends(get_db)):
    booking = EventBooking(hotel_id=hotel_id, **data.model_dump())
    db.add(booking)
    await db.commit()
    await db.refresh(booking)
    return booking

@router.patch("/bookings/{booking_id}/confirm")
async def confirm_booking(booking_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EventBooking).where(EventBooking.id == booking_id))
    booking = result.scalar_one_or_none()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = "Confirmed"
    await db.commit()
    await db.refresh(booking)
    return booking