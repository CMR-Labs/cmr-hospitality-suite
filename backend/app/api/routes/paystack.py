from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id
from app.core.config import settings
from app.models.payment import Payment
from app.models.reservation import Reservation
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import httpx

router = APIRouter(prefix="/paystack", tags=["Paystack"])

PAYSTACK_BASE = "https://api.paystack.co"

class InitializePaymentRequest(BaseModel):
    email: str
    amount: int
    reservation_id: Optional[UUID] = None
    guest_id: Optional[UUID] = None
    callback_url: Optional[str] = None

class VerifyPaymentRequest(BaseModel):
    reference: str
    payment_id: Optional[UUID] = None

@router.post("/initialize")
async def initialize_payment(
    data: InitializePaymentRequest,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    if not settings.PAYSTACK_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Paystack not configured")

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{PAYSTACK_BASE}/transaction/initialize",
            headers={
                "Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "email": data.email,
                "amount": data.amount * 100,
                "callback_url": data.callback_url or "https://cmr-hospitality-suite.vercel.app/dashboard/payments",
                "metadata": {
                    "hotel_id": str(hotel_id),
                    "reservation_id": str(data.reservation_id) if data.reservation_id else None,
                    "guest_id": str(data.guest_id) if data.guest_id else None,
                },
            },
        )

    result = response.json()
    if not result.get("status"):
        raise HTTPException(status_code=400, detail=result.get("message", "Payment initialization failed"))

    payment = Payment(
        hotel_id=hotel_id,
        reservation_id=data.reservation_id,
        guest_id=data.guest_id,
        amount=data.amount,
        method="Paystack",
        status="Pending",
        reference=result["data"]["reference"],
    )
    db.add(payment)
    await db.commit()
    await db.refresh(payment)

    return {
        "payment_id": str(payment.id),
        "authorization_url": result["data"]["authorization_url"],
        "reference": result["data"]["reference"],
        "access_code": result["data"]["access_code"],
    }

@router.post("/verify")
async def verify_payment(
    data: VerifyPaymentRequest,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    if not settings.PAYSTACK_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Paystack not configured")

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{PAYSTACK_BASE}/transaction/verify/{data.reference}",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
        )

    result = response.json()
    if not result.get("status"):
        raise HTTPException(status_code=400, detail="Verification failed")

    transaction = result["data"]
    payment_status = "Successful" if transaction["status"] == "success" else "Failed"

    result_query = await db.execute(
        select(Payment).where(Payment.reference == data.reference, Payment.hotel_id == hotel_id)
    )
    payment = result_query.scalar_one_or_none()

    if payment:
        payment.status = payment_status
        if payment.reservation_id and payment_status == "Successful":
            res_query = await db.execute(
                select(Reservation).where(Reservation.id == payment.reservation_id)
            )
            reservation = res_query.scalar_one_or_none()
            if reservation:
                reservation.payment_status = "Paid"
        await db.commit()
        await db.refresh(payment)

    return {
        "status": payment_status,
        "reference": data.reference,
        "amount": transaction["amount"] // 100,
        "channel": transaction.get("channel"),
        "paid_at": transaction.get("paid_at"),
    }

@router.get("/transactions")
async def list_transactions(
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    if not settings.PAYSTACK_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Paystack not configured")

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{PAYSTACK_BASE}/transaction",
            headers={"Authorization": f"Bearer {settings.PAYSTACK_SECRET_KEY}"},
        )

    result = response.json()
    if not result.get("status"):
        raise HTTPException(status_code=400, detail="Failed to fetch transactions")

    return result["data"]

@router.post("/webhook")
async def paystack_webhook(request: dict, db: AsyncSession = Depends(get_db)):
    event = request.get("event")
    data = request.get("data", {})

    if event == "charge.success":
        reference = data.get("reference")
        if reference:
            result = await db.execute(select(Payment).where(Payment.reference == reference))
            payment = result.scalar_one_or_none()
            if payment:
                payment.status = "Successful"
                if payment.reservation_id:
                    res_result = await db.execute(select(Reservation).where(Reservation.id == payment.reservation_id))
                    reservation = res_result.scalar_one_or_none()
                    if reservation:
                        reservation.payment_status = "Paid"
                await db.commit()

    return {"status": "ok"}