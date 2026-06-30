from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.hotel import Hotel
from app.models.role import Role
from app.schemas.auth import HotelRegisterRequest, LoginRequest
from app.core.config import settings
from app.services.email import send_verification_email, send_password_reset_email
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status
import secrets
from app.services.subscription import create_trial_subscription

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def register_hotel(db: AsyncSession, data: HotelRegisterRequest):
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    hotel = Hotel(name=data.hotel_name, email=data.email, phone=data.phone)
    db.add(hotel)
    await db.flush()

    role_result = await db.execute(select(Role).where(Role.name == "Hotel Owner"))
    hotel_owner_role = role_result.scalar_one_or_none()

    verification_token = secrets.token_urlsafe(32)
    verification_expires = datetime.utcnow() + timedelta(hours=24)

    user = User(
        hotel_id=hotel.id,
        role_id=hotel_owner_role.id if hotel_owner_role else None,
        full_name=data.full_name,
        email=data.email,
        phone=data.phone,
        password_hash=hash_password(data.password),
        email_verified=False,
        verification_token=verification_token,
        verification_token_expires=verification_expires,
    )
    db.add(user)
    await db.flush()

    await create_trial_subscription(db, hotel.id, "starter")

    await db.commit()
    await db.refresh(user)

    try:
        send_verification_email(user.email, user.full_name, verification_token)
    except Exception as e:
        print(f"Email send failed: {e}")

    return user

async def verify_email_token(db: AsyncSession, token: str):
    result = await db.execute(select(User).where(User.verification_token == token))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid verification token")
    if user.verification_token_expires and user.verification_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Verification token has expired")
    user.email_verified = True
    user.verification_token = None
    user.verification_token_expires = None
    await db.commit()
    return {"message": "Email verified successfully"}

async def forgot_password(db: AsyncSession, email: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        return {"message": "If this email exists, a reset link has been sent"}
    reset_token = secrets.token_urlsafe(32)
    reset_expires = datetime.utcnow() + timedelta(hours=1)
    user.reset_token = reset_token
    user.reset_token_expires = reset_expires
    await db.commit()
    try:
        send_password_reset_email(user.email, user.full_name, reset_token)
    except Exception as e:
        print(f"Email send failed: {e}")
    return {"message": "If this email exists, a reset link has been sent"}

async def reset_password(db: AsyncSession, token: str, new_password: str):
    result = await db.execute(select(User).where(User.reset_token == token))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset token")
    if user.reset_token_expires and user.reset_token_expires < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Reset token has expired")
    user.password_hash = hash_password(new_password)
    user.reset_token = None
    user.reset_token_expires = None
    await db.commit()
    return {"message": "Password reset successfully"}

async def login_user(db: AsyncSession, data: LoginRequest):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id), "hotel_id": str(user.hotel_id)})
    return {"access_token": token, "token_type": "bearer", "user": user}