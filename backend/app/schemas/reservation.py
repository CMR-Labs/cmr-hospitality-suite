from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import date

class ReservationCreate(BaseModel):
    guest_id: UUID
    room_id: UUID
    reservation_number: str
    check_in: date
    check_out: date
    nights: Optional[int] = None
    adults: int = 1
    children: int = 0
    total_amount: int
    notes: Optional[str] = None

class ReservationUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    notes: Optional[str] = None
    check_in: Optional[date] = None
    check_out: Optional[date] = None

class ReservationResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    guest_id: Optional[UUID] = None
    room_id: Optional[UUID] = None
    reservation_number: str
    check_in: date
    check_out: date
    nights: Optional[int] = None
    adults: int
    children: int
    status: str
    payment_status: str
    total_amount: int
    notes: Optional[str] = None

    class Config:
        from_attributes = True