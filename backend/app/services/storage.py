from supabase import create_client, Client
from app.core.config import settings
from fastapi import HTTPException
import uuid

def get_supabase() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        raise HTTPException(status_code=500, detail="Storage service not configured")
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

def upload_hotel_logo(file_bytes: bytes, content_type: str, hotel_id: str) -> str:
    supabase = get_supabase()
    file_ext = "jpg" if "jpeg" in content_type else content_type.split("/")[-1]
    file_path = f"{hotel_id}/logo.{file_ext}"
    supabase.storage.from_("hotel-logos").upload(
        file_path,
        file_bytes,
        {"content-type": content_type, "upsert": "true"},
    )
    result = supabase.storage.from_("hotel-logos").get_public_url(file_path)
    return result

def upload_room_photo(file_bytes: bytes, content_type: str, hotel_id: str, room_id: str) -> str:
    supabase = get_supabase()
    file_ext = "jpg" if "jpeg" in content_type else content_type.split("/")[-1]
    file_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = f"{hotel_id}/{room_id}/{file_name}"
    supabase.storage.from_("room-photos").upload(
        file_path,
        file_bytes,
        {"content-type": content_type, "upsert": "true"},
    )
    result = supabase.storage.from_("room-photos").get_public_url(file_path)
    return result

def delete_room_photo(file_path: str):
    supabase = get_supabase()
    supabase.storage.from_("room-photos").remove([file_path])