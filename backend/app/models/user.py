from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    role_id = Column(UUID(as_uuid=True), ForeignKey("roles.id"))
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(50))
    password_hash = Column(String(255), nullable=False)
    status = Column(String(50), default="Active")
    email_verified = Column(Boolean, default=False)
    verification_token = Column(String(255))
    verification_token_expires = Column(DateTime(timezone=True))
    reset_token = Column(String(255))
    reset_token_expires = Column(DateTime(timezone=True))

    hotel = relationship("Hotel", backref="users")
    role = relationship("Role", backref="users")