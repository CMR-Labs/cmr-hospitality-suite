from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate, ReservationUpdate, ReservationResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/reservations", tags=["Reservations"])

@router.get("/", response_model=List[ReservationResponse])
async def get_reservations(hotel_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reservation).where(Reservation.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=ReservationResponse)
async def create_reservation(hotel_id: UUID, data: ReservationCreate, db: AsyncSession = Depends(get_db)):
    reservation = Reservation(hotel_id=hotel_id, **data.model_dump())
    db.add(reservation)
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.get("/{reservation_id}", response_model=ReservationResponse)
async def get_reservation(reservation_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

@router.patch("/{reservation_id}", response_model=ReservationResponse)
async def update_reservation(reservation_id: UUID, data: ReservationUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(reservation, key, value)
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.delete("/{reservation_id}")
async def delete_reservation(reservation_id: UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    await db.delete(reservation)
    await db.commit()
    return {"message": "Reservation deleted"}