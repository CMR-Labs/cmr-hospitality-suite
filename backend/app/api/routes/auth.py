from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.auth import HotelRegisterRequest, LoginRequest, TokenResponse
from app.services.auth import register_hotel, login_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
async def register(data: HotelRegisterRequest, db: AsyncSession = Depends(get_db)):
    user = await register_hotel(db, data)
    from app.services.auth import create_access_token
    token = create_access_token({"sub": str(user.id), "hotel_id": str(user.hotel_id)})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login_user(db, data)