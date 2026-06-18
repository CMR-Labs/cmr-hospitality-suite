from sqlalchemy import Column, String, Text, Date, Time, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class HousekeepingTask(Base):
    __tablename__ = "housekeeping_tasks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    room_id = Column(UUID(as_uuid=True), ForeignKey("rooms.id"))
    assigned_to = Column(UUID(as_uuid=True), ForeignKey("staff.id"), nullable=True)
    task_type = Column(String(100), nullable=False)
    priority = Column(String(50), default="Normal")
    status = Column(String(50), default="Pending")
    scheduled_date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    notes = Column(Text)

    hotel = relationship("Hotel", backref="housekeeping_tasks")
    room = relationship("Room", backref="housekeeping_tasks")