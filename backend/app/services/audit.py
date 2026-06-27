from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit import AuditLog
from app.models.user import User
from app.models.hotel import Hotel
from sqlalchemy import select
from uuid import UUID
from typing import Optional
import json

async def log_action(
    db: AsyncSession,
    action: str,
    user: User,
    description: str,
    table_name: Optional[str] = None,
    record_id: Optional[UUID] = None,
    old_data: Optional[dict] = None,
    new_data: Optional[dict] = None,
    ip_address: Optional[str] = None,
):
    try:
        hotel_name = None
        if user.hotel_id:
            hotel_result = await db.execute(select(Hotel).where(Hotel.id == user.hotel_id))
            hotel = hotel_result.scalar_one_or_none()
            if hotel:
                hotel_name = hotel.name

        log = AuditLog(
            hotel_id=user.hotel_id,
            user_id=user.id,
            user_name=user.full_name,
            hotel_name=hotel_name,
            action=action,
            table_name=table_name,
            record_id=record_id,
            description=description,
            old_data=old_data,
            new_data=new_data,
            ip_address=ip_address,
        )
        db.add(log)
        await db.flush()
    except Exception as e:
        print(f"Audit log failed: {e}")