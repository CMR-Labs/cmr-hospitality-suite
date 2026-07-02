from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_user, get_current_hotel_id
from app.models.hotel import Hotel
from app.models.room import Room
from app.services.storage import upload_hotel_logo, upload_room_photo
from app.services.subscription import get_hotel_subscription
from uuid import UUID

router = APIRouter(prefix="/uploads", tags=["Uploads"])

ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
MAX_LOGO_SIZE = 5 * 1024 * 1024  # 5MB
MAX_PHOTO_SIZE = 3 * 1024 * 1024  # 3MB per photo

@router.post("/hotel-logo")
async def upload_hotel_logo_endpoint(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG and WebP images are allowed")

    file_bytes = await file.read()

    if len(file_bytes) > MAX_LOGO_SIZE:
        raise HTTPException(status_code=400, detail="Logo must be under 5MB")

    logo_url = upload_hotel_logo(file_bytes, file.content_type, str(hotel_id))

    result = await db.execute(select(Hotel).where(Hotel.id == hotel_id))
    hotel = result.scalar_one_or_none()
    if hotel:
        hotel.logo_url = logo_url
        await db.commit()

    return {"logo_url": logo_url, "message": "Logo uploaded successfully"}

@router.post("/room-photo/{room_id}")
async def upload_room_photo_endpoint(
    room_id: UUID,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    subscription, plan = await get_hotel_subscription(db, hotel_id)

    if not plan or not plan.has_photos:
        raise HTTPException(
            status_code=403,
            detail=f"Room photo uploads are not available on your current plan. Upgrade to Professional or higher."
        )

    result = await db.execute(select(Room).where(Room.id == room_id, Room.hotel_id == hotel_id))
    room = result.scalar_one_or_none()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    current_photos = room.photos or []
    if len(current_photos) >= plan.photo_limit_per_room:
        raise HTTPException(
            status_code=403,
            detail=f"Photo limit reached ({plan.photo_limit_per_room} photos per room on {plan.name} plan)"
        )

    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Only JPG, PNG and WebP images are allowed")

    file_bytes = await file.read()

    if len(file_bytes) > MAX_PHOTO_SIZE:
        raise HTTPException(status_code=400, detail="Photo must be under 3MB")

    photo_url = upload_room_photo(file_bytes, file.content_type, str(hotel_id), str(room_id))

    room.photos = current_photos + [photo_url]
    await db.commit()

    return {"photo_url": photo_url, "photos": room.photos, "message": "Photo uploaded successfully"}

@router.delete("/room-photo/{room_id}")
async def delete_room_photo_endpoint(
    room_id: UUID,
    photo_url: str,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
):
    result = await db.execute(select(Room).where(Room.id == room_id, Room.hotel_id == hotel_id))
    room = result.scalar_one_or_none()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    current_photos = room.photos or []
    room.photos = [p for p in current_photos if p != photo_url]
    await db.commit()

    return {"message": "Photo deleted", "photos": room.photos}