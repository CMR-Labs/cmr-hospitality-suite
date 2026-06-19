from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.reservation import Reservation
from app.schemas.reservation import ReservationCreate, ReservationUpdate, ReservationResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/reservations", tags=["Reservations"])

@router.get("/", response_model=List[ReservationResponse])
async def get_reservations(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=ReservationResponse)
async def create_reservation(
    data: ReservationCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    reservation = Reservation(hotel_id=hotel_id, **data.model_dump())
    db.add(reservation)
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.get("/{reservation_id}", response_model=ReservationResponse)
async def get_reservation(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation

@router.patch("/{reservation_id}", response_model=ReservationResponse)
async def update_reservation(
    reservation_id: UUID,
    data: ReservationUpdate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(reservation, key, value)
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.patch("/{reservation_id}/checkin")
async def checkin(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Checked In"
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.patch("/{reservation_id}/checkout")
async def checkout(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Checked Out"
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.delete("/{reservation_id}")
async def delete_reservation(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    await db.delete(reservation)
    await db.commit()
    return {"message": "Reservation deleted"}