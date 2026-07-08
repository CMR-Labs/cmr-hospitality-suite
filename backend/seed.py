import asyncio
import sys
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import AsyncSessionLocal
from app.models.hotel import Hotel
from app.models.user import User
from app.models.role import Role
from app.models.room import Room, RoomType
from app.models.guest import Guest
from app.models.reservation import Reservation
from app.models.payment import Payment
from app.models.staff import Staff
from app.models.housekeeping import HousekeepingTask
from app.models.event import EventHall, EventBooking
from app.models.subscription import Subscription, Plan
from passlib.context import CryptContext
from datetime import datetime, timedelta, date
from sqlalchemy import select, delete
import uuid

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DEMO_HOTEL_ID = uuid.UUID("fba938d7-10d9-4b40-af17-1d2c4b0f8c41")

async def clear_demo_data(db: AsyncSession):
    print("Clearing existing demo data...")
    await db.execute(delete(EventBooking).where(EventBooking.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(EventHall).where(EventHall.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(HousekeepingTask).where(HousekeepingTask.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(Payment).where(Payment.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(Reservation).where(Reservation.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(Guest).where(Guest.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(Staff).where(Staff.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(Room).where(Room.hotel_id == DEMO_HOTEL_ID))
    await db.execute(delete(RoomType).where(RoomType.hotel_id == DEMO_HOTEL_ID))
    await db.commit()
    print("Demo data cleared.")

async def seed_demo_data(db: AsyncSession):
    print("Seeding demo data...")

    # Room Types
    room_types = [
        RoomType(hotel_id=DEMO_HOTEL_ID, name="Standard Room", description="Comfortable standard room", base_price=45000, capacity=2, amenities=["AC", "WiFi", "TV", "Hot Shower"]),
        RoomType(hotel_id=DEMO_HOTEL_ID, name="Deluxe Room", description="Spacious deluxe room", base_price=75000, capacity=2, amenities=["AC", "WiFi", "TV", "Minibar", "Bathtub"]),
        RoomType(hotel_id=DEMO_HOTEL_ID, name="Executive Suite", description="Luxury suite with living area", base_price=150000, capacity=3, amenities=["AC", "WiFi", "TV", "Minibar", "Jacuzzi", "Living Room"]),
        RoomType(hotel_id=DEMO_HOTEL_ID, name="Presidential Suite", description="Top-floor presidential suite", base_price=350000, capacity=4, amenities=["AC", "WiFi", "TV", "Minibar", "Jacuzzi", "Butler Service"]),
    ]
    for rt in room_types:
        db.add(rt)
    await db.flush()
    print(f"  ✓ {len(room_types)} room types created")

    # Get room type IDs
    standard = next(r for r in room_types if r.name == "Standard Room")
    deluxe = next(r for r in room_types if r.name == "Deluxe Room")
    executive = next(r for r in room_types if r.name == "Executive Suite")
    presidential = next(r for r in room_types if r.name == "Presidential Suite")

    # Rooms
    rooms_data = [
        ("101", 1, "Available", "Corner room", standard),
        ("102", 1, "Occupied", "Recently renovated", standard),
        ("103", 1, "Available", "", standard),
        ("104", 1, "Cleaning", "", standard),
        ("201", 2, "Available", "City view", deluxe),
        ("202", 2, "Occupied", "VIP guest", deluxe),
        ("203", 2, "Reserved", "", deluxe),
        ("204", 2, "Available", "", deluxe),
        ("301", 3, "Available", "Corner suite", executive),
        ("302", 3, "Occupied", "Long stay guest", executive),
        ("401", 4, "Available", "Panoramic view", presidential),
        ("402", 4, "Maintenance", "AC servicing", presidential),
    ]
    rooms = []
    for room_number, floor, status, notes, room_type in rooms_data:
        room = Room(hotel_id=DEMO_HOTEL_ID, room_number=room_number, floor=floor, status=status, notes=notes, room_type_id=room_type.id)
        db.add(room)
        rooms.append(room)
    await db.flush()
    print(f"  ✓ {len(rooms)} rooms created")

    # Guests
    guests_data = [
        ("Adebayo Okonkwo", "adebayo@email.com", "+234 802 111 2222", "Nigerian", "Passport", True, "Executive Suite", 12, 2400000),
        ("Amina Ibrahim", "amina@email.com", "+234 803 222 3333", "Nigerian", "National ID", True, "Presidential Suite", 8, 3200000),
        ("Chukwuemeka Eze", "emeka@email.com", "+234 805 333 4444", "Nigerian", "Drivers License", False, "Deluxe Room", 4, 480000),
        ("Fatima Al-Hassan", "fatima@email.com", "+234 806 444 5555", "Nigerian", "Passport", True, "Executive Suite", 6, 1200000),
        ("James Okafor", "james@email.com", "+234 807 555 6666", "Nigerian", "National ID", False, "Standard Room", 2, 135000),
        ("Ngozi Adeleke", "ngozi@email.com", "+234 808 666 7777", "Nigerian", "Passport", False, "Deluxe Room", 3, 360000),
        ("Tunde Bakare", "tunde@email.com", "+234 809 777 8888", "Nigerian", "National ID", False, "Standard Room", 1, 45000),
        ("Kemi Oduya", "kemi@email.com", "+234 810 888 9999", "Nigerian", "Drivers License", True, "Presidential Suite", 9, 4500000),
    ]
    guests = []
    for full_name, email, phone, nationality, id_type, vip, preferred_room_type, total_stays, total_spend in guests_data:
        guest = Guest(hotel_id=DEMO_HOTEL_ID, full_name=full_name, email=email, phone=phone, nationality=nationality, id_type=id_type, vip=vip, preferred_room_type=preferred_room_type, total_stays=total_stays, total_spend=total_spend)
        db.add(guest)
        guests.append(guest)
    await db.flush()
    print(f"  ✓ {len(guests)} guests created")

    # Staff
    staff_data = [
        ("Emmanuel Obi", "emmanuel@cmrdemohotel.com", "+234 801 000 0001", "General Manager", "Management", "Morning"),
        ("Grace Nwachukwu", "grace@cmrdemohotel.com", "+234 801 000 0002", "Front Desk Officer", "Front Office", "Morning"),
        ("Peter Adeyemi", "peter@cmrdemohotel.com", "+234 801 000 0003", "Front Desk Officer", "Front Office", "Evening"),
        ("Blessing Okeke", "blessing@cmrdemohotel.com", "+234 801 000 0004", "Housekeeper", "Housekeeping", "Morning"),
        ("Samuel Dike", "samuel@cmrdemohotel.com", "+234 801 000 0005", "Housekeeper", "Housekeeping", "Evening"),
        ("Chioma Eze", "chioma@cmrdemohotel.com", "+234 801 000 0006", "Finance Officer", "Finance", "Morning"),
        ("Ibrahim Musa", "ibrahim@cmrdemohotel.com", "+234 801 000 0007", "Security Officer", "Security", "Night"),
        ("Adeola Fashola", "adeola@cmrdemohotel.com", "+234 801 000 0008", "Event Coordinator", "Events", "Morning"),
    ]
    staff_list = []
    for full_name, email, phone, role, department, shift in staff_data:
        staff = Staff(hotel_id=DEMO_HOTEL_ID, full_name=full_name, email=email, phone=phone, role=role, department=department, shift=shift, status="Active", join_date=date(2023, 1, 15))
        db.add(staff)
        staff_list.append(staff)
    await db.flush()
    print(f"  ✓ {len(staff_list)} staff created")

    # Reservations
    room_102 = next(r for r in rooms if r.room_number == "102")
    room_202 = next(r for r in rooms if r.room_number == "202")
    room_203 = next(r for r in rooms if r.room_number == "203")
    room_302 = next(r for r in rooms if r.room_number == "302")
    room_401 = next(r for r in rooms if r.room_number == "401")

    guest_adebayo = next(g for g in guests if g.full_name == "Adebayo Okonkwo")
    guest_amina = next(g for g in guests if g.full_name == "Amina Ibrahim")
    guest_fatima = next(g for g in guests if g.full_name == "Fatima Al-Hassan")
    guest_emeka = next(g for g in guests if g.full_name == "Chukwuemeka Eze")
    guest_kemi = next(g for g in guests if g.full_name == "Kemi Oduya")

    reservations_data = [
        (guest_adebayo, room_302, "RES-001", date(2026, 6, 28), date(2026, 7, 10), 12, 2, "Checked In", "Paid", 1800000, "Long stay corporate"),
        (guest_amina, room_202, "RES-002", date(2026, 7, 1), date(2026, 7, 5), 4, 1, "Checked In", "Paid", 300000, "VIP guest"),
        (guest_fatima, room_203, "RES-003", date(2026, 7, 7), date(2026, 7, 10), 3, 2, "Confirmed", "Pending", 225000, ""),
        (guest_emeka, room_102, "RES-004", date(2026, 7, 7), date(2026, 7, 10), 3, 2, "Confirmed", "Paid", 135000, "Business trip"),
        (guest_kemi, room_401, "RES-005", date(2026, 7, 15), date(2026, 7, 20), 5, 3, "Confirmed", "Pending", 1750000, "Anniversary"),
    ]

    reservations = []
    for guest, room, res_number, check_in, check_out, nights, adults, status, payment_status, amount, notes in reservations_data:
        reservation = Reservation(
            hotel_id=DEMO_HOTEL_ID, guest_id=guest.id, room_id=room.id,
            reservation_number=res_number, check_in=check_in, check_out=check_out,
            nights=nights, adults=adults, status=status, payment_status=payment_status,
            total_amount=amount, notes=notes
        )
        db.add(reservation)
        reservations.append(reservation)
    await db.flush()
    print(f"  ✓ {len(reservations)} reservations created")

    # Payments
    res_001 = next(r for r in reservations if r.reservation_number == "RES-001")
    res_002 = next(r for r in reservations if r.reservation_number == "RES-002")
    res_004 = next(r for r in reservations if r.reservation_number == "RES-004")

    payments_data = [
        (guest_adebayo, res_001, 1800000, "Bank Transfer", "Successful", "TXN-001-2026"),
        (guest_amina, res_002, 300000, "Paystack", "Successful", "TXN-002-2026"),
        (guest_emeka, res_004, 135000, "Cash", "Successful", "TXN-003-2026"),
    ]
    for guest, reservation, amount, method, status, reference in payments_data:
        payment = Payment(hotel_id=DEMO_HOTEL_ID, guest_id=guest.id, reservation_id=reservation.id, amount=amount, method=method, status=status, reference=reference)
        db.add(payment)
    await db.flush()
    print(f"  ✓ {len(payments_data)} payments created")

    # Housekeeping Tasks
    room_104 = next(r for r in rooms if r.room_number == "104")
    room_301 = next(r for r in rooms if r.room_number == "301")
    room_402 = next(r for r in rooms if r.room_number == "402")

    hk_data = [
        (room_104, "Full Cleaning", "High", "Pending", "Guest checked out"),
        (room_202, "Turndown Service", "Normal", "Pending", "VIP guest"),
        (room_302, "Linen Change", "Normal", "In Progress", ""),
        (room_402, "Maintenance Report", "Urgent", "Pending", "AC servicing"),
        (room_301, "Deep Cleaning", "High", "Pending", "Pre-arrival"),
    ]
    for room, task_type, priority, status, notes in hk_data:
        task = HousekeepingTask(hotel_id=DEMO_HOTEL_ID, room_id=room.id, task_type=task_type, priority=priority, status=status, notes=notes, scheduled_date=datetime.utcnow().date())
        db.add(task)
    await db.flush()
    print(f"  ✓ {len(hk_data)} housekeeping tasks created")

    # Event Halls
    grand_ballroom = EventHall(hotel_id=DEMO_HOTEL_ID, name="Grand Ballroom", description="Elegant ballroom for events", capacity=500, size_sqm=1200, floor=1, price_per_day=800000, amenities=["AC", "Stage", "Sound System", "Projector", "LED Lighting"], status="Available")
    boardroom = EventHall(hotel_id=DEMO_HOTEL_ID, name="Executive Board Room", description="Premium boardroom for meetings", capacity=30, size_sqm=80, floor=3, price_per_day=150000, amenities=["AC", "Projector", "Video Conferencing", "WiFi"], status="Available")
    db.add(grand_ballroom)
    db.add(boardroom)
    await db.flush()
    print("  ✓ 2 event halls created")

    # Event Bookings
    booking1 = EventBooking(hotel_id=DEMO_HOTEL_ID, event_hall_id=grand_ballroom.id, client_name="Adeyemi Holdings Ltd", client_email="events@adeyemi.com", client_phone="+234 812 000 0001", event_name="Annual Gala Dinner 2026", event_date=date(2026, 7, 20), guest_count=350, amount=800000, status="Confirmed")
    booking2 = EventBooking(hotel_id=DEMO_HOTEL_ID, event_hall_id=boardroom.id, client_name="Sterling Bank PLC", client_email="corporate@sterling.com", client_phone="+234 812 000 0002", event_name="Q3 Board Meeting", event_date=date(2026, 7, 15), guest_count=20, amount=150000, status="Confirmed")
    db.add(booking1)
    db.add(booking2)
    await db.flush()
    print("  ✓ 2 event bookings created")

    await db.commit()
    print("\n✅ Demo data seeded successfully!")
    print(f"   Login: demo@cmrhospitality.com")
    print(f"   Password: CMRDemo2026")

async def main():
    print("\n🌱 CMR Hospitality Suite — Seed Script")
    print("=" * 40)

    async with AsyncSessionLocal() as db:
        if "--reset" in sys.argv:
            await clear_demo_data(db)
        await seed_demo_data(db)

if __name__ == "__main__":
    asyncio.run(main())