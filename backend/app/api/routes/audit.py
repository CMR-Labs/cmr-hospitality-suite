from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_user, get_current_hotel_id
from app.models.audit import AuditLog
from app.models.user import User
from typing import List
from uuid import UUID

router = APIRouter(prefix="/audit", tags=["Audit Logs"])

@router.get("/")
async def get_audit_logs(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    limit: int = 50,
):
    result = await db.execute(
        select(AuditLog)
        .where(AuditLog.hotel_id == hotel_id)
        .order_by(AuditLog.created_at.desc())
        .limit(limit)
    )
    logs = result.scalars().all()
    return [
        {
            "id": str(log.id),
            "action": log.action,
            "user_name": log.user_name,
            "description": log.description,
            "table_name": log.table_name,
            "record_id": str(log.record_id) if log.record_id else None,
            "ip_address": log.ip_address,
            "created_at": log.created_at.isoformat() if log.created_at else None,
        }
        for log in logs
    ]