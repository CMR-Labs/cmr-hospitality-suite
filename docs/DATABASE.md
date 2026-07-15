# Database Documentation

## CMR Hospitality Suite

Version: 1.6.10

Database: PostgreSQL (Supabase)

---

# Overview

CMR Hospitality Suite uses PostgreSQL as its primary relational database.

The application follows a multi-tenant architecture where each hotel owns its own data. Every business entity is linked to a hotel using the `hotel_id` foreign key to ensure complete tenant isolation.

Database Provider:
- Supabase PostgreSQL

ORM:
- SQLAlchemy

Migration Tool:
- Alembic

Architecture:
- Multi-Tenant
- Relational
- ACID Compliant

---

# Database Design Principles

The database is designed with the following goals:

- Multi-tenant isolation
- Data integrity
- Referential integrity
- Auditability
- High performance
- Scalability

---

# Entity Relationship Overview

```
Hotels
│
├── Users
│      ├── Roles
│      └── Permissions
│
├── Rooms
│      └── Room Types
│
├── Guests
│
├── Reservations
│      ├── Payments
│      └── Guests
│
├── Staff
│
├── Housekeeping Tasks
│
├── Event Halls
│      └── Event Bookings
│
└── Audit Logs
```

---

# Tables

## hotels

Stores information about each registered hotel.

### Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| name | VARCHAR | Hotel name |
| email | VARCHAR | Contact email |
| phone | VARCHAR | Contact number |
| address | TEXT | Hotel address |
| city | VARCHAR | City |
| country | VARCHAR | Country |
| logo_url | TEXT | Hotel logo |
| subscription_plan | VARCHAR | Current subscription |
| created_at | TIMESTAMP | Record creation |

---

## users

Application users.

Each user belongs to exactly one hotel.

### Columns

| Column | Type |
|---------|------|
| id | UUID |
| hotel_id | UUID |
| role_id | UUID |
| full_name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| password_hash | TEXT |
| is_verified | BOOLEAN |
| is_active | BOOLEAN |
| created_at | TIMESTAMP |

---

## roles

System roles.

Examples:

- Super Admin
- Hotel Owner
- Manager
- Receptionist
- Housekeeping
- Finance
- Event Manager

---

## permissions

Fine-grained permissions.

Examples:

- rooms.view
- rooms.create
- reservations.create
- payments.refund
- settings.manage

---

## role_permissions

Many-to-many relationship between roles and permissions.

---

## room_types

Defines room categories.

Examples:

- Standard
- Deluxe
- Executive
- Presidential Suite

---

## rooms

Stores all hotel rooms.

### Key Fields

- room_number
- room_type_id
- floor
- status
- price_per_night
- photo_url

---

## guests

Guest profiles.

Includes:

- Contact information
- Nationality
- ID type
- ID number
- VIP status

---

## reservations

Booking records.

Relationships:

- Guest
- Room
- Payment

Statuses:

- Pending
- Confirmed
- Checked In
- Checked Out
- Cancelled

---

## payments

Payment records.

Supports:

- Paystack
- Cash
- Bank Transfer

Statuses:

- Pending
- Successful
- Failed
- Refunded

---

## staff

Hotel employees.

Includes:

- Department
- Position
- Employment Status

---

## housekeeping_tasks

Cleaning and maintenance tasks.

Statuses:

- Pending
- In Progress
- Completed

---

## event_halls

Event venues managed by the hotel.

Includes:

- Capacity
- Pricing
- Availability

---

## event_bookings

Bookings for event halls.

Relationships:

- Guest
- Event Hall
- Payment

---

## audit_logs

Tracks important system activities.

Examples:

- Login
- Reservation Created
- Payment Refunded
- User Updated
- Settings Changed

Fields include:

- User
- Action
- Resource
- Timestamp
- IP Address

---

# Multi-Tenant Architecture

Every business table contains a `hotel_id`.

Example:

```
Hotel A
│
├── Rooms
├── Guests
├── Reservations
└── Payments

Hotel B
│
├── Rooms
├── Guests
├── Reservations
└── Payments
```

Users can only access records belonging to their own hotel.

Tenant isolation is enforced using JWT authentication and backend authorization.

---

# Relationships

```
Hotel
 ├── Users
 ├── Rooms
 │      └── Room Types
 ├── Guests
 ├── Reservations
 │      ├── Payments
 │      └── Guests
 ├── Staff
 ├── Housekeeping Tasks
 ├── Event Halls
 │      └── Event Bookings
 └── Audit Logs
```

---

# Security

The database implements:

- Foreign Keys
- UUID Primary Keys
- Password Hashing (bcrypt)
- JWT Authentication
- Multi-Tenant Isolation
- Role-Based Access Control
- Audit Logging

---

# Performance

Optimizations include:

- Indexed primary keys
- Indexed foreign keys
- UUID identifiers
- Optimized relational queries
- Pagination for large datasets

---

# Future Improvements

- Database partitioning
- Read replicas
- Automated backups
- Full-text search
- Redis caching
- Advanced analytics warehouse
