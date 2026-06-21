from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class HotelRegisterRequest(BaseModel):
    hotel_name: str
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

class UserResponse(BaseModel):
    id: UUID
    full_name: str
    email: str
    hotel_id: Optional[UUID] = None
    role_id: Optional[UUID] = None
    status: str
    email_verified: bool = False

    class Config:
        from_attributes = True

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

class VerifyEmailRequest(BaseModel):
    token: str