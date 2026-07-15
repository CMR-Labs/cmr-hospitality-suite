# Role-Based Access Control (RBAC)

## Overview

CMR Hospitality Suite implements a comprehensive **Role-Based Access Control (RBAC)** system to ensure that every authenticated user can only access resources and perform actions that align with their assigned responsibilities.

The authorization system is enforced on the backend using JWT authentication, role validation, permission checks, and multi-tenant isolation.

---

# Objectives

- Protect sensitive business data
- Enforce least-privilege access
- Support multiple staff roles
- Prevent unauthorized operations
- Maintain auditability across the platform

---

# Architecture

```
                    User Login
                         │
                         ▼
                  JWT Authentication
                         │
                         ▼
                Extract User Information
                         │
                         ▼
                 Validate JWT Signature
                         │
                         ▼
               Identify User's Hotel ID
                         │
                         ▼
                Retrieve User Role
                         │
                         ▼
             Load Assigned Permissions
                         │
                         ▼
            Permission Middleware Check
                         │
              ┌──────────┴──────────┐
              │                     │
          Authorized           Forbidden (403)
```

---

# Authentication Flow

1. User logs in.
2. Backend validates credentials.
3. JWT access token is generated.
4. Token contains:

- User ID
- Hotel ID
- Assigned Role

5. Every protected request requires the JWT.
6. Backend validates:
   - Authentication
   - Hotel ownership
   - Required permission

---

# Multi-Tenant Isolation

CMR Hospitality Suite is a **multi-tenant SaaS platform**.

Every authenticated user belongs to a single hotel.

Example:

```
Hotel A
 ├── Rooms
 ├── Guests
 ├── Payments

Hotel B
 ├── Rooms
 ├── Guests
 ├── Payments
```

Users from one hotel can never access data belonging to another hotel.

Isolation is enforced using the `hotel_id` stored in the JWT.

---

# Roles

The platform currently supports **7 system roles**.

| Role | Description |
|------|-------------|
| Super Admin | Platform administrator with global access |
| Hotel Owner | Full control of a hotel |
| Manager | Operational management |
| Receptionist | Guest-facing operations |
| Housekeeping | Cleaning and room preparation |
| Finance | Payment and financial operations |
| Event Manager | Event hall operations |

---

# Role Capabilities

## Super Admin

Platform-wide administration.

Capabilities:

- Manage hotels
- Manage subscriptions
- Manage users
- Platform analytics
- View audit logs
- System monitoring

---

## Hotel Owner

Complete control over a hotel.

Capabilities:

- Rooms
- Reservations
- Guests
- Staff
- Payments
- Analytics
- CRM
- Reports
- Settings
- AI Concierge

---

## Manager

Responsible for hotel operations.

Capabilities:

- Rooms
- Reservations
- Guests
- Staff
- Housekeeping
- Payments
- Reports
- Analytics

Restrictions:

- Cannot modify platform settings
- Cannot manage subscriptions

---

## Receptionist

Front desk operations.

Capabilities:

- Check-in
- Check-out
- Reservations
- Guests
- Payment collection

Restrictions:

- No staff management
- No analytics
- No settings
- No audit logs

---

## Housekeeping

Cleaning operations.

Capabilities:

- View assigned rooms
- Update room status
- Complete housekeeping tasks

Restrictions:

- No guest access
- No payments
- No reports

---

## Finance

Financial management.

Capabilities:

- View payments
- Refund payments
- Financial reporting

Restrictions:

- No reservations
- No room management
- No staff management

---

## Event Manager

Event operations.

Capabilities:

- Manage event halls
- Manage bookings
- View event payments

Restrictions:

- No hotel administration

---

# Permission System

Permissions are stored separately from roles.

This allows new roles to be created without changing application logic.

Current permission count:

**27 Permissions**

---

# Permission List

## Room Management

```
rooms.view
rooms.create
rooms.update
rooms.delete
```

---

## Reservations

```
reservations.view
reservations.create
reservations.update
reservations.cancel
reservations.checkin
reservations.checkout
```

---

## Guests

```
guests.view
guests.create
guests.update
```

---

## Payments

```
payments.view
payments.create
payments.refund
```

---

## Staff

```
staff.view
staff.manage
```

---

## Housekeeping

```
housekeeping.view
housekeeping.manage
```

---

## Event Management

```
events.view
events.manage
```

---

## Analytics

```
analytics.view
```

---

## CRM

```
crm.view
```

---

## Reports

```
reports.export
```

---

## Settings

```
settings.manage
```

---

## AI Concierge

```
ai.use
```

---

# Authorization Middleware

Every protected endpoint follows the same validation sequence.

```
Incoming Request
        │
        ▼
JWT Validation
        │
        ▼
User Exists?
        │
        ▼
Hotel ID Match?
        │
        ▼
Permission Exists?
        │
        ▼
Execute Request
```

If any validation fails, the request is rejected.

---

# HTTP Responses

| Status | Meaning |
|---------|---------|
| 200 | Authorized |
| 401 | Authentication required |
| 403 | Permission denied |
| 404 | Resource not found |

---

# Database Structure

RBAC is implemented using the following tables.

```
roles

permissions

role_permissions

users
```

Relationship:

```
Users
   │
   ▼
Roles
   │
   ▼
Role Permissions
   │
   ▼
Permissions
```

---

# API Endpoints

Retrieve current permissions

```
GET /api/v1/roles/my-permissions
```

Retrieve all roles

```
GET /api/v1/roles
```

Assign a role

```
POST /api/v1/roles/assign
```

---

# Security Features

RBAC works together with the following security components.

- JWT Authentication
- Password Hashing (bcrypt)
- Email Verification
- Password Reset
- Multi-Tenant Isolation
- Audit Logging
- Rate Limiting
- CORS Protection
- Admin Authentication

---

# Audit Logging

Every privileged action is automatically recorded.

Example:

```
2026-07-15 14:05 UTC

User:
John Doe

Role:
Manager

Action:
Created Reservation #1042

Hotel:
CMR Demo Hotel

IP:
102.xxx.xxx.xxx
```

---

# Best Practices

- Never hardcode role names in business logic.
- Always authorize using permissions.
- Enforce hotel isolation on every query.
- Log all sensitive operations.
- Deny access by default.
- Apply the principle of least privilege.

---

# Future Enhancements

Planned RBAC improvements include:

- Custom roles per hotel
- Dynamic permission editor
- Temporary permissions
- Department-based permissions
- Permission inheritance
- Time-based access control
- IP-based access restrictions
- Multi-factor authentication (MFA)

---

# Version

**RBAC Version:** 1.0

Last Updated: July 2026
Project: CMR Hospitality Suite
```
