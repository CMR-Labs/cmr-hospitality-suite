from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.subscription import Plan, Subscription
from app.models.room import Room
from app.models.staff import Staff
from app.services.subscription import get_hotel_subscription
from uuid import UUID
from datetime import datetime

router = APIRouter(prefix="/subscription", tags=["Subscription & Billing"])

@router.get("/plans")
async def get_plans(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Plan).where(Plan.is_active == True))
    plans = result.scalars().all()
    return [
        {
            "id": str(p.id),
            "name": p.name,
            "slug": p.slug,
            "price_monthly": p.price_monthly,
            "price_annual": p.price_annual,
            "max_hotels": p.max_hotels,
            "max_rooms": p.max_rooms,
            "max_staff": p.max_staff,
            "max_event_centers": p.max_event_centers,
            "has_ai": p.has_ai,
            "has_photos": p.has_photos,
            "has_event_management": p.has_event_management,
            "trial_days": p.trial_days,
        }
        for p in plans
    ]

@router.get("/current")
async def get_current_subscription(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    subscription, plan = await get_hotel_subscription(db, hotel_id)
    if not subscription:
        raise HTTPException(status_code=404, detail="No subscription found")

    room_count_result = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id))
    room_count = room_count_result.scalar() or 0

    staff_count_result = await db.execute(select(func.count(Staff.id)).where(Staff.hotel_id == hotel_id))
    staff_count = staff_count_result.scalar() or 0

    days_left = None
    if subscription.status == "trial" and subscription.trial_ends_at:
        delta = subscription.trial_ends_at - datetime.utcnow()
        days_left = max(0, delta.days)

    return {
        "subscription": {
            "id": str(subscription.id),
            "status": subscription.status,
            "trial_ends_at": subscription.trial_ends_at.isoformat() if subscription.trial_ends_at else None,
            "days_left_in_trial": days_left,
            "current_period_end": subscription.current_period_end.isoformat() if subscription.current_period_end else None,
        },
        "plan": {
            "name": plan.name,
            "slug": plan.slug,
            "price_monthly": plan.price_monthly,
            "max_rooms": plan.max_rooms,
            "max_staff": plan.max_staff,
            "max_hotels": plan.max_hotels,
            "has_ai": plan.has_ai,
            "has_photos": plan.has_photos,
            "has_event_management": plan.has_event_management,
        },
        "usage": {
            "rooms_used": room_count,
            "rooms_limit": plan.max_rooms,
            "staff_used": staff_count,
            "staff_limit": plan.max_staff,
        },
    }