from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date

class StaffCreate(BaseModel):
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    role: str
    department: Optional[str] = None
    shift: Optional[str] = None
    join_date: Optional[date] = None

class StaffUpdate(BaseModel):
    status: Optional[str] = None
    shift: Optional[str] = None
    department: Optional[str] = None
    role: Optional[str] = None

class StaffResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    role: str
    department: Optional[str] = None
    shift: Optional[str] = None
    status: str
    join_date: Optional[date] = None

    class Config:
        from_attributes = True