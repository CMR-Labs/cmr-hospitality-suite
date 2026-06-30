from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.subscription import Plan, Subscription
from app.models.room import Room
from app.models.staff import Staff
from app.models.hotel import Hotel
from datetime import datetime, timedelta
from uuid import UUID
from fastapi import HTTPException

async def create_trial_subscription(db: AsyncSession, hotel_id: UUID, plan_slug: str = "starter"):
    plan_result = await db.execute(select(Plan).where(Plan.slug == plan_slug))
    plan = plan_result.scalar_one_or_none()
    if not plan:
        return None

    trial_end = datetime.utcnow() + timedelta(days=plan.trial_days)

    subscription = Subscription(
        hotel_id=hotel_id,
        plan_id=plan.id,
        status="trial",
        trial_ends_at=trial_end,
        current_period_start=datetime.utcnow(),
        current_period_end=trial_end,
    )
    db.add(subscription)
    await db.flush()
    return subscription

async def get_hotel_subscription(db: AsyncSession, hotel_id: UUID):
    result = await db.execute(
        select(Subscription, Plan)
        .join(Plan, Plan.id == Subscription.plan_id)
        .where(Subscription.hotel_id == hotel_id)
        .order_by(Subscription.created_at.desc())
    )
    row = result.first()
    if not row:
        return None, None
    return row[0], row[1]

async def check_subscription_status(db: AsyncSession, hotel_id: UUID):
    subscription, plan = await get_hotel_subscription(db, hotel_id)
    if not subscription:
        raise HTTPException(status_code=403, detail="No active subscription found")

    if subscription.status == "trial":
        if subscription.trial_ends_at and subscription.trial_ends_at < datetime.utcnow():
            subscription.status = "expired"
            await db.commit()
            raise HTTPException(status_code=403, detail="Your trial has expired. Please upgrade to continue.")

    if subscription.status == "suspended":
        raise HTTPException(status_code=403, detail="Your subscription has been suspended. Please contact support.")

    if subscription.status == "expired":
        raise HTTPException(status_code=403, detail="Your subscription has expired. Please renew to continue.")

    return subscription, plan

async def check_room_limit(db: AsyncSession, hotel_id: UUID):
    subscription, plan = await check_subscription_status(db, hotel_id)
    room_count_result = await db.execute(select(func.count(Room.id)).where(Room.hotel_id == hotel_id))
    room_count = room_count_result.scalar() or 0

    if room_count >= plan.max_rooms:
        raise HTTPException(
            status_code=403,
            detail=f"Room limit reached ({plan.max_rooms} rooms on {plan.name} plan). Upgrade your plan to add more rooms."
        )
    return True

async def check_staff_limit(db: AsyncSession, hotel_id: UUID):
    subscription, plan = await check_subscription_status(db, hotel_id)
    staff_count_result = await db.execute(select(func.count(Staff.id)).where(Staff.hotel_id == hotel_id))
    staff_count = staff_count_result.scalar() or 0

    if staff_count >= plan.max_staff:
        raise HTTPException(
            status_code=403,
            detail=f"Staff limit reached ({plan.max_staff} staff on {plan.name} plan). Upgrade your plan to add more staff."
        )
    return True

async def check_ai_access(db: AsyncSession, hotel_id: UUID):
    subscription, plan = await check_subscription_status(db, hotel_id)
    if not plan.has_ai:
        raise HTTPException(
            status_code=403,
            detail=f"AI Concierge is not available on {plan.name} plan. Upgrade to Professional or higher."
        )
    return True

async def check_event_access(db: AsyncSession, hotel_id: UUID):
    subscription, plan = await check_subscription_status(db, hotel_id)
    if not plan.has_event_management:
        raise HTTPException(
            status_code=403,
            detail=f"Event Hall management is not available on {plan.name} plan. Upgrade to Professional or higher."
        )
    return True