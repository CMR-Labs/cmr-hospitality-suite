from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.core.database import Base

class Plan(Base):
    __tablename__ = "plans"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    slug = Column(String(50), unique=True, nullable=False)
    price_monthly = Column(Integer, nullable=False)
    price_annual = Column(Integer, nullable=False)
    max_hotels = Column(Integer, default=1)
    max_rooms = Column(Integer, default=7)
    max_staff = Column(Integer, default=1)
    max_event_centers = Column(Integer, default=0)
    has_ai = Column(Boolean, default=False)
    has_photos = Column(Boolean, default=False)
    has_event_management = Column(Boolean, default=False)
    photo_limit_per_room = Column(Integer, default=0)
    trial_days = Column(Integer, default=14)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id", ondelete="CASCADE"))
    plan_id = Column(UUID(as_uuid=True), ForeignKey("plans.id"))
    status = Column(String(50), default="trial")
    trial_ends_at = Column(DateTime(timezone=True))
    current_period_start = Column(DateTime(timezone=True))
    current_period_end = Column(DateTime(timezone=True))
    paystack_subscription_code = Column(String(255))
    paystack_customer_code = Column(String(255))
    cancelled_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class SubscriptionInvoice(Base):
    __tablename__ = "subscription_invoices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subscription_id = Column(UUID(as_uuid=True), ForeignKey("subscriptions.id"))
    hotel_id = Column(UUID(as_uuid=True), ForeignKey("hotels.id"))
    plan_id = Column(UUID(as_uuid=True), ForeignKey("plans.id"))
    amount = Column(Integer, nullable=False)
    status = Column(String(50), default="unpaid")
    due_date = Column(DateTime(timezone=True))
    paid_at = Column(DateTime(timezone=True))
    paystack_reference = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())