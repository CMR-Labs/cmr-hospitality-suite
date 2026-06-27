from sqlalchemy import Column, String, Text, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy import DateTime
import uuid
from app.core.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    user_name = Column(String(255))
    hotel_name = Column(String(255))
    action = Column(String(255), nullable=False)
    table_name = Column(String(100))
    record_id = Column(UUID(as_uuid=True))
    description = Column(Text)
    old_data = Column(JSONB)
    new_data = Column(JSONB)
    ip_address = Column(String(50))
    created_at = Column(DateTime(timezone=True), server_default=func.now())