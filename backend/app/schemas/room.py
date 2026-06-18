from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

class RoomTypeCreate(BaseModel):
    name: str
    description: Optional[str] = None
    base_price: int
    capacity: int = 2
    amenities: Optional[List[str]] = []

class RoomTypeResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    name: str
    description: Optional[str] = None
    base_price: int
    capacity: int
    amenities: Optional[List[str]] = []

    class Config:
        from_attributes = True

class RoomCreate(BaseModel):
    room_type_id: UUID
    room_number: str
    floor: Optional[int] = None
    status: str = "Available"
    notes: Optional[str] = None

class RoomUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
    floor: Optional[int] = None

class RoomResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    room_type_id: Optional[UUID] = None
    room_number: str
    floor: Optional[int] = None
    status: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True