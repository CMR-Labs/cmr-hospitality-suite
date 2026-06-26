from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import get_current_hotel_id, require_permission
from app.models.room import Room, RoomType
from app.schemas.room import RoomCreate, RoomUpdate, RoomResponse, RoomTypeCreate, RoomTypeResponse
from typing import List
from uuid import UUID

router = APIRouter(prefix="/rooms", tags=["Rooms"])

@router.get("/", response_model=List[RoomResponse])
async def get_rooms(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.view")),
):
    result = await db.execute(select(Room).where(Room.hotel_id == hotel_id))
    return result.scalars().all()

@router.post("/", response_model=RoomResponse)
async def create_room(
    data: RoomCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.create")),
):
    room = Room(hotel_id=hotel_id, **data.model_dump())
    db.add(room)
    await db.commit()
    await db.refresh(room)
    return room

@router.get("/{room_id}", response_model=RoomResponse)
async def get_room(
    room_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.view")),
):
    result = await db.execute(select(Room).where(Room.id == room_id, Room.hotel_id == hotel_id))
    room = result.scalar_one_or_none()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.patch("/{room_id}", response_model=RoomResponse)
async def update_room(
    room_id: UUID,
    data: RoomUpdate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.update")),
):
    result = await db.execute(select(Room).where(Room.id == room_id, Room.hotel_id == hotel_id))
    room = result.scalar_one_or_none()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(room, key, value)
    await db.commit()
    await db.refresh(room)
    return room

@router.delete("/{room_id}")
async def delete_room(
    room_id: UUID,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.delete")),
):
    result = await db.execute(select(Room).where(Room.id == room_id, Room.hotel_id == hotel_id))
    room = result.scalar_one_or_none()
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    await db.delete(room)
    await db.commit()
    return {"message": "Room deleted"}

@router.post("/types/", response_model=RoomTypeResponse)
async def create_room_type(
    data: RoomTypeCreate,
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.create")),
):
    room_type = RoomType(hotel_id=hotel_id, **data.model_dump())
    db.add(room_type)
    await db.commit()
    await db.refresh(room_type)
    return room_type

@router.get("/types/list", response_model=List[RoomTypeResponse])
async def get_room_types(
    db: AsyncSession = Depends(get_db),
    hotel_id: UUID = Depends(get_current_hotel_id),
    _: None = Depends(require_permission("rooms.view")),
):
    result = await db.execute(select(RoomType).where(RoomType.hotel_id == hotel_id))
    return result.scalars().all()