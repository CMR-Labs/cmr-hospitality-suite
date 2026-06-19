from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.models.payment import Payment
from app.schemas.payment import PaymentCreate, PaymentResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.get("/", response_model=List[PaymentResponse])
async def get_payments(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Payment).where(Payment.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=PaymentResponse)
async def create_payment(
    data: PaymentCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    payment = Payment(hotel_id=hotel_id, **data.model_dump())
    db.add(payment)
    await db.commit()
    await db.refresh(payment)
    return payment

@router.get("/{payment_id}", response_model=PaymentResponse)
async def get_payment(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment

@router.patch("/{payment_id}/confirm")
async def confirm_payment(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = "Successful"
    await db.commit()
    await db.refresh(payment)
    return payment

@router.patch("/{payment_id}/refund")
async def refund_payment(
    payment_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id)
):
    result = await db.execute(select(Payment).where(Payment.id == payment_id, Payment.hotel_id == hotel_id))
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    payment.status = "Refunded"
    await db.commit()
    await db.refresh(payment)
    return payment