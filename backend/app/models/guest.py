from sqlalchemy import Column, String, Text, Integer, Boolean, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class Guest(Base):
    __tablename__ = "guests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    full_name = Column(String(255), nullable=False)
    email = Column(String(255))
    phone = Column(String(50))
    nationality = Column(String(100))
    id_type = Column(String(100))
    id_number = Column(String(100))
    date_of_birth = Column(Date)
    vip = Column(Boolean, default=False)
    preferred_room_type = Column(String(100))
    notes = Column(Text)
    total_stays = Column(Integer, default=0)
    total_spend = Column(Integer, default=0)

    hotel = relationship("Hotel", backref="guests")