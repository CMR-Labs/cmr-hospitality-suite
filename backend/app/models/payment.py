from sqlalchemy import Column, String, Text, Integer, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Payment(Base):
    __tablename__ = "payments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    reservation_id = Column(UUID(as_uuid=True), ForeignKey("reservations.id"))
    guest_id = Column(UUID(as_uuid=True), ForeignKey("guests.id"))
    amount = Column(Integer, nullable=False)
    method = Column(String(100), nullable=False)
    status = Column(String(50), default="Pending")
    reference = Column(String(255))
    notes = Column(Text)

    hotel = relationship("Hotel", backref="payments")
    reservation = relationship("Reservation", backref="payments")
    guest = relationship("Guest", backref="payments")