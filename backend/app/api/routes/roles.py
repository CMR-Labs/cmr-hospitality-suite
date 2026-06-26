from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_user, get_current_hotel_id, get_user_permissions, require_permission
from app.models.role import Role
from app.models.user import User
from app.models.permission import Permission, RolePermission
from pydantic import BaseModel
from typing import List
from uuid import UUID

router = APIRouter(prefix="/roles", tags=["Roles & Permissions"])

class AssignRoleRequest(BaseModel):
    user_id: UUID
    role_id: UUID

@router.get("/")
async def get_roles(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Role))
    roles = result.scalars().all()
    return [{"id": str(r.id), "name": r.name, "description": r.description} for r in roles]

@router.get("/my-permissions")
async def get_my_permissions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    permissions = await get_user_permissions(current_user, db)
    return {
        "user_id": str(current_user.id),
        "role_id": str(current_user.role_id) if current_user.role_id else None,
        "permissions": permissions,
    }

@router.post("/assign")
async def assign_role(
    data: AssignRoleRequest,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("staff.manage")),
):
    result = await db.execute(select(User).where(User.id == data.user_id, User.hotel_id == hotel_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    role_result = await db.execute(select(Role).where(Role.id == data.role_id))
    role = role_result.scalar_one_or_none()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    user.role_id = data.role_id
    await db.commit()
    return {"message": f"Role '{role.name}' assigned successfully"}

@router.get("/permissions")
async def get_all_permissions(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Permission))
    permissions = result.scalars().all()
    return [{"id": str(p.id), "name": p.name, "description": p.description} for p in permissions]