from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id, get_current_user, require_permission
from app.models.payment import Payment
from app.models.user import User
from app.schemas.payment import PaymentCreate, PaymentResponse
from app.services.audit import log_action
from typing import List
from uuid import UUID

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.get("/", response_model=List[PaymentResponse])
async def get_payments(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("payments.view")),
):
    result = await db.execute(select(Payment).where(Payment.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=PaymentResponse)
async def create_payment(
    request: Request,
    data: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("payments.create")),
):
    payment = Payment(hotel_id=hotel_id, **data.model_dump())
    db.add(payment)
    await db.flush()
    await log_action(
        db=db, action="payment.created", user=current_user,
        description=f"Recorded payment of ₦{data.amount:,} via {data.method}",
        table_name="payments", record_id=payment.id,
        new_data={"amount": data.amount, "method": data.method},
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(payment)
    return payment

@router.get("/{payment_id}", response_model=PaymentResponse)
async def get_payment(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("payments.view")),
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.patch("/{payment_id}/confirm")
async def confirm_payment(
    request: Request,
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("payments.create")),
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = "Successful"
    await log_action(
        db=db, action="payment.confirmed", user=current_user,
        description=f"Confirmed payment of ₦{payment.amount:,}",
        table_name="payments", record_id=payment.id,
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(payment)
    return payment

@router.patch("/{payment_id}/refund")
async def refund_payment(
    request: Request,
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_permission("payments.refund")),
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = "Refunded"
    await log_action(
        db=db, action="payment.refunded", user=current_user,
        description=f"Refunded payment of ₦{payment.amount:,}",
        table_name="payments", record_id=payment.id,
        ip_address=request.client.host if request.client else None,
    )
    await db.commit()
    await db.refresh(payment)
    return payment