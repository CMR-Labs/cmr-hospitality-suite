from sqlalchemy import Column, String, Text, Integer, Date, Time, ForeignKey, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class EventHall(Base):
    __tablename__ = "event_halls"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    description = Column(Text)
    capacity = Column(Integer, nullable=False)
    size_sqm = Column(Integer)
    floor = Column(Integer)
    price_per_day = Column(Integer, nullable=False)
    amenities = Column(ARRAY(String))
    status = Column(String(50), default="Available")

    hotel = relationship("Hotel", backref="event_halls")

class EventBooking(Base):
    __tablename__ = "event_bookings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    event_hall_id = Column(UUID(as_uuid=True), ForeignKey("event_halls.id"))
    client_name = Column(String(255), nullable=False)
    client_email = Column(String(255))
    client_phone = Column(String(50))
    event_name = Column(String(255), nullable=False)
    event_date = Column(Date, nullable=False)
    start_time = Column(Time)
    end_time = Column(Time)
    guest_count = Column(Integer)
    amount = Column(Integer, nullable=False)
    status = Column(String(50), default="Pending")
    notes = Column(Text)

    hotel = relationship("Hotel", backref="event_bookings")
    event_hall = relationship("EventHall", backref="bookings")