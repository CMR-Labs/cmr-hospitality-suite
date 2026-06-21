from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.auth import (
    HotelRegisterRequest, LoginRequest, TokenResponse,
    UserResponse, ForgotPasswordRequest, ResetPasswordRequest, VerifyEmailRequest
)
from app.services.auth import (
    register_hotel, login_user, verify_email_token,
    forgot_password, reset_password, create_access_token
)
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(data: HotelRegisterRequest, db: AsyncSession = Depends(get_db)):
    user = await register_hotel(db, data)
    token = create_access_token({"sub": str(user.id), "hotel_id": str(user.hotel_id)})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login_user(db, data)

@router.get("/me", response_model=UserResponse)
async def me(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/verify-email")
async def verify_email(data: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    return await verify_email_token(db, data.token)

@router.post("/forgot-password")
async def forgot_password_route(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):
    return await forgot_password(db, data.email)

@router.post("/reset-password")
async def reset_password_route(data: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    return await reset_password(db, data.token, data.new_password)