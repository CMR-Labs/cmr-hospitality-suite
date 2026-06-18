from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date

class GuestCreate(BaseModel):
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    nationality: Optional[str] = None
    id_type: Optional[str] = None
    id_number: Optional[str] = None
    date_of_birth: Optional[date] = None
    vip: bool = False
    preferred_room_type: Optional[str] = None
    notes: Optional[str] = None

class GuestUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    nationality: Optional[str] = None
    vip: Optional[bool] = None
    notes: Optional[str] = None

class GuestResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    nationality: Optional[str] = None
    id_type: Optional[str] = None
    vip: bool
    preferred_room_type: Optional[str] = None
    notes: Optional[str] = None
    total_stays: int
    total_spend: int

    class Config:
        from_attributes = True