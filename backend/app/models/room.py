from sqlalchemy import Column, String, Text, Integer, ForeignKey, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class RoomType(Base):
    __tablename__ = "room_types"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    name = Column(String(100), nullable=False)
    description = Column(Text)
    base_price = Column(Integer, nullable=False)
    capacity = Column(Integer, default=2)
    amenities = Column(ARRAY(String))

    hotel = relationship("Hotel", backref="room_types")

class Room(Base):
    __tablename__ = "rooms"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    room_type_id = Column(UUID(as_uuid=True), ForeignKey("room_types.id"))
    room_number = Column(String(20), nullable=False)
    floor = Column(Integer)
    status = Column(String(50), default="Available")
    notes = Column(Text)

    hotel = relationship("Hotel", backref="rooms")
    room_type = relationship("RoomType", backref="rooms")