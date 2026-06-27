from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id, get_current_user, require_permission
from app.models.reservation import Reservation
from app.models.user import User
from app.schemas.reservation import ReservationCreate, ReservationUpdate, ReservationResponse
from app.services.audit import log_action
from typing import List
from uuid import UUID

router = APIRouter(prefix="/reservations", tags=["Reservations"])

@router.get("/", response_model=List[ReservationResponse])
async def get_reservations(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("reservations.view")),
):
    result = await db.execute(select(Reservation).where(Reservation.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=ReservationResponse)
async def create_reservation(
    request: Request,
    data: ReservationCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("reservations.create")),
):
    reservation = Reservation(hotel_id=hotel_id, **data.model_dump())
    db.add(reservation)
    await db.flush()
    await log_action(
        db=db, action="reservation.created", user=current_user,
        description=f"Created reservation {reservation.reservation_number}",
        table_name="reservations", record_id=reservation.id,
        new_data={"reservation_number": reservation.reservation_number, "total_amount": reservation.total_amount},
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.get("/{reservation_id}", response_model=ReservationResponse)
async def get_reservation(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("reservations.view")),
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
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("reservations.update")),
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
    request: Request,
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("reservations.checkin")),
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Checked In"
    await log_action(
        db=db, action="reservation.checkin", user=current_user,
        description=f"Checked in guest for reservation {reservation.reservation_number}",
        table_name="reservations", record_id=reservation.id,
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.patch("/{reservation_id}/checkout")
async def checkout(
    request: Request,
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("reservations.checkout")),
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    reservation.status = "Checked Out"
    await log_action(
        db=db, action="reservation.checkout", user=current_user,
        description=f"Checked out guest for reservation {reservation.reservation_number}",
        table_name="reservations", record_id=reservation.id,
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(reservation)
    return reservation

@router.delete("/{reservation_id}")
async def delete_reservation(
    reservation_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("reservations.cancel")),
):
    result = await db.execute(select(Reservation).where(Reservation.id == reservation_id, Reservation.hotel_id == hotel_id))
    reservation = result.scalar_one_or_none()
    if not reservation:
        raise HTTPException(status_code=404, detail="Reservation not found")
    await db.delete(reservation)
    await db.commit()
    return {"message": "Reservation deleted"}