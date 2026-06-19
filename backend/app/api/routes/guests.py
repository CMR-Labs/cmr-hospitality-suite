from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.guest import Guest
from app.schemas.guest import GuestCreate, GuestUpdate, GuestResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/guests", tags=["Guests"])

@router.get("/", response_model=List[GuestResponse])
async def get_guests(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Guest).where(Guest.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=GuestResponse)
async def create_guest(
    data: GuestCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    guest = Guest(hotel_id=hotel_id, **data.model_dump())
    db.add(guest)
    await db.commit()
    await db.refresh(guest)
    return guest

@router.get("/{guest_id}", response_model=GuestResponse)
async def get_guest(
    guest_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Guest).where(Guest.id == guest_id, Guest.hotel_id == hotel_id))
    guest = result.scalar_one_or_none()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    return guest

@router.patch("/{guest_id}", response_model=GuestResponse)
async def update_guest(
    guest_id: UUID,
    data: GuestUpdate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Guest).where(Guest.id == guest_id, Guest.hotel_id == hotel_id))
    guest = result.scalar_one_or_none()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(guest, key, value)
    await db.commit()
    await db.refresh(guest)
    return guest

@router.delete("/{guest_id}")
async def delete_guest(
    guest_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Guest).where(Guest.id == guest_id, Guest.hotel_id == hotel_id))
    guest = result.scalar_one_or_none()
    if not guest:
        raise HTTPException(status_code=404, detail="Guest not found")
    await db.delete(guest)
    await db.commit()
    return {"message": "Guest deleted"}