from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.models.hotel import Hotel
from app.models.user import User
from app.core.config import settings
from fastapi import Header
from typing import Optional

router = APIRouter(prefix="/admin", tags=["Admin"])

ADMIN_KEY = "cmr-admin-2025"

def verify_admin(x_admin_key: Optional[str] = Header(None)):
    if x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized")

@router.get("/hotels")
async def get_all_hotels(
    db: AsyncSession = Depends(get_db),
    _: None = Depends(verify_admin),
):
    result = await db.execute(select(Hotel).order_by(Hotel.created_at.desc()))
    hotels = result.scalars().all()
    return [
        {
            "id": str(h.id),
            "name": h.name,
            "email": h.email,
            "phone": h.phone,
            "city": h.city,
            "country": h.country,
            "status": h.status,
            "created_at": h.created_at.isoformat() if h.created_at else None,
        }
        for h in hotels
    ]

@router.get("/users")
async def get_all_users(
    db: AsyncSession = Depends(get_db),
    _: None = Depends(verify_admin),
):
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    return [
        {
            "id": str(u.id),
            "full_name": u.full_name,
            "email": u.email,
            "status": u.status,
            "email_verified": u.email_verified,
            "hotel_id": str(u.hotel_id) if u.hotel_id else None,
            "created_at": u.created_at.isoformat() if u.created_at else None,
        }
        for u in users
    ]

@router.get("/stats")
async def get_stats(
    db: AsyncSession = Depends(get_db),
    _: None = Depends(verify_admin),
):
    from sqlalchemy import func
    total_hotels = await db.execute(select(func.count(Hotel.id)))
    total_users = await db.execute(select(func.count(User.id)))
    verified_users = await db.execute(select(func.count(User.id)).where(User.email_verified == True))

    return {
        "total_hotels": total_hotels.scalar() or 0,
        "total_users": total_users.scalar() or 0,
        "verified_users": verified_users.scalar() or 0,
    }