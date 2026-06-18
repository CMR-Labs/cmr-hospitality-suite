from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date, time

class HousekeepingTaskCreate(BaseModel):
    room_id: UUID
    assigned_to: Optional[UUID] = None
    task_type: str
    priority: str = "Normal"
    scheduled_date: Optional[date] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    notes: Optional[str] = None

class HousekeepingTaskUpdate(BaseModel):
    status: Optional[str] = None
    assigned_to: Optional[UUID] = None
    priority: Optional[str] = None
    notes: Optional[str] = None

class HousekeepingTaskResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    room_id: UUID
    assigned_to: Optional[UUID] = None
    task_type: str
    priority: str
    status: str
    scheduled_date: Optional[date] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True