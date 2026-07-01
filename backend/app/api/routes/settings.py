from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_user, get_current_hotel_id
from app.models.user import User
from app.models.hotel import Hotel
from app.services.auth import hash_password, verify_password
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

router = APIRouter(prefix="/settings", tags=["Settings"])

class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None

class UpdateHotelRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    website: Optional[str] = None

class UpdatePasswordRequest(BaseModel):
    current_password: str
    new_password: str

@router.get("/profile")
async def get_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "phone": current_user.phone,
        "status": current_user.status,
        "email_verified": current_user.email_verified,
    }

@router.patch("/profile")
async def update_profile(
    data: UpdateProfileRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if data.full_name:
        current_user.full_name = data.full_name
    if data.phone:
        current_user.phone = data.phone
    await db.commit()
    await db.refresh(current_user)
    return {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email,
        "phone": current_user.phone,
    }

@router.get("/hotel")
async def get_hotel(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    result = await db.execute(select(Hotel).where(Hotel.id == hotel_id))
    hotel = result.scalar_one_or_none()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    return {
        "id": str(hotel.id),
        "name": hotel.name,
        "email": hotel.email,
        "phone": hotel.phone,
        "address": hotel.address,
        "city": hotel.city,
        "country": hotel.country,
        "website": hotel.website,
        "status": hotel.status,
    }

@router.patch("/hotel")
async def update_hotel(
    data: UpdateHotelRequest,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    result = await db.execute(select(Hotel).where(Hotel.id == hotel_id))
    hotel = result.scalar_one_or_none()
    if not hotel:
        raise HTTPException(status_code=404, detail="Hotel not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(hotel, key, value)
    await db.commit()
    await db.refresh(hotel)
    return {
        "id": str(hotel.id),
        "name": hotel.name,
        "email": hotel.email,
        "phone": hotel.phone,
        "address": hotel.address,
        "city": hotel.city,
        "country": hotel.country,
        "website": hotel.website,
    }

@router.patch("/password")
async def update_password(
    data: UpdatePasswordRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not verify_password(data.current_password, current_user.password_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    if len(data.new_password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")
    current_user.password_hash = hash_password(data.new_password)
    await db.commit()
    return {"message": "Password updated successfully"}