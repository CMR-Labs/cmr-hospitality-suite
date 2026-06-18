from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import date, time

class EventHallCreate(BaseModel):
    name: str
    description: Optional[str] = None
    capacity: int
    size_sqm: Optional[int] = None
    floor: Optional[int] = None
    price_per_day: int
    amenities: Optional[List[str]] = []

class EventHallUpdate(BaseModel):
    status: Optional[str] = None
    price_per_day: Optional[int] = None
    notes: Optional[str] = None

class EventHallResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    name: str
    description: Optional[str] = None
    capacity: int
    size_sqm: Optional[int] = None
    floor: Optional[int] = None
    price_per_day: int
    amenities: Optional[List[str]] = []
    status: str

    class Config:
        from_attributes = True

class EventBookingCreate(BaseModel):
    event_hall_id: UUID
    client_name: str
    client_email: Optional[str] = None
    client_phone: Optional[str] = None
    event_name: str
    event_date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    guest_count: Optional[int] = None
    amount: int
    notes: Optional[str] = None

class EventBookingResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    event_hall_id: UUID
    client_name: str
    event_name: str
    event_date: date
    guest_count: Optional[int] = None
    amount: int
    status: str

    class Config:
        from_attributes = True