from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.staff import Staff
from app.schemas.staff import StaffCreate, StaffUpdate, StaffResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/staff", tags=["Staff"])

@router.get("/", response_model=List[StaffResponse])
async def get_staff(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Staff).where(Staff.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=StaffResponse)
async def create_staff(
    data: StaffCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    staff = Staff(hotel_id=hotel_id, **data.model_dump())
    db.add(staff)
    await db.commit()
    await db.refresh(staff)
    return staff

@router.get("/{staff_id}", response_model=StaffResponse)
async def get_staff_member(
    staff_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Staff).where(Staff.id == staff_id, Staff.hotel_id == hotel_id))
    staff = result.scalar_one_or_none()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    return staff

@router.patch("/{staff_id}", response_model=StaffResponse)
async def update_staff(
    staff_id: UUID,
    data: StaffUpdate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Staff).where(Staff.id == staff_id, Staff.hotel_id == hotel_id))
    staff = result.scalar_one_or_none()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(staff, key, value)
    await db.commit()
    await db.refresh(staff)
    return staff

@router.delete("/{staff_id}")
async def delete_staff(
    staff_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Staff).where(Staff.id == staff_id, Staff.hotel_id == hotel_id))
    staff = result.scalar_one_or_none()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff member not found")
    await db.delete(staff)
    await db.commit()
    return {"message": "Staff member deleted"}