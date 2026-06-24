from sqlalchemy import Column, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.core.database import Base

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50))
    address = Column(Text)
    city = Column(String(100))
    country = Column(String(100), default="Nigeria")
    logo_url = Column(Text)
    website = Column(String(255))
    status = Column(String(50), default="Active")
    created_at = Column(DateTime(timezone=True), server_default=func.now())