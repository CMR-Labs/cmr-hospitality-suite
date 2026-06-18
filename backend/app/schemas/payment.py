from pydantic import BaseModel
from typing import Optional
from uuid import UUID

class PaymentCreate(BaseModel):
    reservation_id: Optional[UUID] = None
    guest_id: Optional[UUID] = None
    amount: int
    method: str
    reference: Optional[str] = None
    notes: Optional[str] = None

class PaymentResponse(BaseModel):
    id: UUID
    hotel_id: UUID
    reservation_id: Optional[UUID] = None
    guest_id: Optional[UUID] = None
    amount: int
    method: str
    status: str
    reference: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True