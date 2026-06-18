from sqlalchemy import Column, String, Text, Integer, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    guest_id = Column(UUID(as_uuid=True), ForeignKey("guests.id"))
    room_id = Column(UUID(as_uuid=True), ForeignKey("rooms.id"))
    reservation_number = Column(String(50), unique=True, nullable=False)
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    nights = Column(Integer)
    adults = Column(Integer, default=1)
    children = Column(Integer, default=0)
    status = Column(String(50), default="Confirmed")
    payment_status = Column(String(50), default="Pending")
    total_amount = Column(Integer, nullable=False)
    notes = Column(Text)

    hotel = relationship("Hotel", backref="reservations")
    guest = relationship("Guest", backref="reservations")
    room = relationship("Room", backref="reservations")