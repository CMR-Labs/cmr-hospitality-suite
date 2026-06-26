from fastapi import Depends, HTTPException, status
from app.core.security import get_current_user
from app.models.user import User

ROLE_PERMISSIONS = {
    "Super Admin": ["*"],
    "Hotel Owner": ["*"],
    "Manager": [
        "rooms", "reservations", "guests", "payments",
        "staff", "housekeeping", "events", "analytics",
        "crm", "ai", "reports", "notifications",
    ],
    "Receptionist": [
        "rooms:read", "reservations", "guests",
        "payments:read", "housekeeping:read",
    ],
    "Housekeeping": [
        "rooms:read", "housekeeping",
    ],
    "Finance": [
        "payments", "analytics:read", "reports",
    ],
}

ROLE_SIDEBAR_ACCESS = {
    "Super Admin": ["all"],
    "Hotel Owner": ["all"],
    "Manager": [
        "Dashboard", "Reservations", "Guests", "Rooms",
        "Housekeeping", "Event Halls", "Payments", "Analytics",
        "CRM", "AI Concierge", "Notifications", "Reports", "Staff",
    ],
    "Receptionist": [
        "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
    ],
    "Housekeeping": [
        "Dashboard", "Housekeeping", "Rooms",
    ],
    "Finance": [
        "Dashboard", "Payments", "Analytics", "Reports",
    ],
}

async def require_role(*allowed_roles: str):
    async def checker(current_user: User = Depends(get_current_user)):
        if not current_user.role_id:
            return current_user
        from sqlalchemy import select
        from app.core.database import AsyncSessionLocal
        from app.models.role import Role
        async with AsyncSessionLocal() as db:
            result = await db.execute(select(Role).where(Role.id == current_user.role_id))
            role = result.scalar_one_or_none()
            if not role:
                return current_user
            if role.name not in allowed_roles and "Super Admin" not in allowed_roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied. Required role: {', '.join(allowed_roles)}"
                )
        return current_user
    return checker

async def get_user_role(current_user: User = Depends(get_current_user)) -> str:
    if not current_user.role_id:
        return "Hotel Owner"
    from sqlalchemy import select
    from app.core.database import AsyncSessionLocal
    from app.models.role import Role
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Role).where(Role.id == current_user.role_id))
        role = result.scalar_one_or_none()
        return role.name if role else "Hotel Owner"