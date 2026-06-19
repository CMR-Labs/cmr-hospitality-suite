from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.housekeeping import HousekeepingTask
from app.schemas.housekeeping import HousekeepingTaskCreate, HousekeepingTaskUpdate, HousekeepingTaskResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/housekeeping", tags=["Housekeeping"])

@router.get("/", response_model=List[HousekeepingTaskResponse])
async def get_tasks(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(HousekeepingTask).where(HousekeepingTask.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=HousekeepingTaskResponse)
async def create_task(
    data: HousekeepingTaskCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    task = HousekeepingTask(hotel_id=hotel_id, **data.model_dump())
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task

@router.get("/{task_id}", response_model=HousekeepingTaskResponse)
async def get_task(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(HousekeepingTask).where(HousekeepingTask.id == task_id, HousekeepingTask.hotel_id == hotel_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.patch("/{task_id}", response_model=HousekeepingTaskResponse)
async def update_task(
    task_id: UUID,
    data: HousekeepingTaskUpdate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(HousekeepingTask).where(HousekeepingTask.id == task_id, HousekeepingTask.hotel_id == hotel_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(task, key, value)
    await db.commit()
    await db.refresh(task)
    return task

@router.patch("/{task_id}/complete")
async def complete_task(
    task_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(HousekeepingTask).where(HousekeepingTask.id == task_id, HousekeepingTask.hotel_id == hotel_id))
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    task.status = "Completed"
    await db.commit()
    await db.refresh(task)
    return task