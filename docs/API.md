# CMR Hospitality Suite API Documentation

**Version:** v1.6.10  
**Status:** Release Candidate (RC)  
**API Base URL:** `https://cmr-hospitality-suite.onrender.com/api/v1`  
**API Documentation (Swagger):** `https://cmr-hospitality-suite.onrender.com/docs`

---

# Overview

The CMR Hospitality Suite API provides secure, RESTful endpoints for managing hospitality operations, including:

- Authentication
- Hotels
- Rooms & Room Types
- Reservations
- Guests
- Payments
- Staff
- Housekeeping
- Event Halls
- Analytics
- CRM
- AI Concierge
- Notifications
- Reports
- Settings
- Administration

All endpoints return JSON responses.

---

# Authentication

Authentication uses **JWT Bearer Tokens**.

After a successful login:

```http
Authorization: Bearer <access_token>
```

must be included in every protected request.

Example:

```http
GET /api/v1/rooms
Authorization: Bearer eyJhbGc...
```

---

# API Response Format

## Success

```json
{
    "success": true,
    "message": "Request successful",
    "data": {}
}
```

---

## Error

```json
{
    "success": false,
    "message": "Validation failed",
    "errors": []
}
```

---

# Authentication Endpoints

## Register

```
POST /auth/register
```

Creates a new hotel owner account.

### Request

```json
{
    "hotel_name": "CMR Hotel",
    "full_name": "John Doe",
    "email": "john@example.com",
    "password": "********"
}
```

### Response

```json
{
    "message": "Verification email sent."
}
```

---

## Login

```
POST /auth/login
```

Returns JWT access token.

---

## Current User

```
GET /auth/me
```

Returns authenticated user profile.

---

## Verify Email

```
POST /auth/verify-email
```

Verifies a newly registered account.

---

## Forgot Password

```
POST /auth/forgot-password
```

Sends password reset email.

---

## Reset Password

```
POST /auth/reset-password
```

Updates user password.

---

# Room Management

Base Route

```
/rooms
```

---

## Get Rooms

```
GET /rooms
```

Returns all rooms belonging to authenticated hotel.

---

## Create Room

```
POST /rooms
```

---

## Update Room

```
PUT /rooms/{room_id}
```

---

## Delete Room

```
DELETE /rooms/{room_id}
```

---

## Upload Room Photo

```
POST /rooms/{room_id}/photo
```

Uploads room image to Supabase Storage.

---

# Room Types

```
GET /rooms/types

POST /rooms/types

PUT /rooms/types/{id}

DELETE /rooms/types/{id}
```

---

# Guest Management

```
GET /guests

POST /guests

PUT /guests/{id}

DELETE /guests/{id}
```

Stores guest profiles, contact details and stay history.

---

# Reservations

```
GET /reservations

POST /reservations

PUT /reservations/{id}

DELETE /reservations/{id}
```

---

## Check In

```
POST /reservations/{id}/checkin
```

---

## Check Out

```
POST /reservations/{id}/checkout
```

---

# Payments

```
GET /payments

POST /payments
```

---

## Confirm Payment

```
POST /payments/{id}/confirm
```

---

## Refund Payment

```
POST /payments/{id}/refund
```

---

# Paystack

## Initialize Payment

```
POST /paystack/initialize
```

Returns Paystack checkout URL.

---

## Verify Payment

```
GET /paystack/verify/{reference}
```

Verifies transaction status.

---

## Webhook

```
POST /paystack/webhook
```

Receives payment notifications from Paystack.

---

# Staff

```
GET /staff

POST /staff

PUT /staff/{id}

DELETE /staff/{id}
```

---

# Housekeeping

```
GET /housekeeping

POST /housekeeping

PUT /housekeeping/{id}

DELETE /housekeeping/{id}
```

---

## Complete Task

```
POST /housekeeping/{id}/complete
```

---

# Event Halls

```
GET /events/halls

POST /events/halls

PUT /events/halls/{id}

DELETE /events/halls/{id}
```

---

# Event Bookings

```
GET /events/bookings

POST /events/bookings

PUT /events/bookings/{id}

DELETE /events/bookings/{id}
```

---

# Analytics

```
GET /analytics/summary
```

Returns:

- Occupancy Rate
- Revenue
- Reservations
- Check-ins
- Check-outs
- Average Stay
- Payment Summary

---

# CRM

```
GET /crm
```

Customer segmentation and interaction history.

---

# AI Concierge

```
POST /ai/chat
```

Secure backend proxy to Anthropic Claude.

Example:

```json
{
    "message": "Which rooms are available tomorrow?"
}
```

---

# Notifications

```
GET /notifications
```

Returns user notifications.

---

# Reports

```
GET /reports
```

Returns generated reports.

Export formats:

- PDF
- Excel

---

# Settings

```
GET /settings

PUT /settings
```

Manage:

- Hotel profile
- Logo
- Currency
- Timezone
- Contact details
- Password
- Preferences

---

# Roles

```
GET /roles

POST /roles

PUT /roles/{id}

DELETE /roles/{id}
```

---

## Assign Role

```
POST /roles/assign
```

---

## Current Permissions

```
GET /roles/my-permissions
```

Returns all permissions assigned to current user.

---

# Audit Logs

```
GET /audit
```

Returns system activity logs.

Each log contains:

- User
- Action
- Resource
- Timestamp
- IP Address

---

# Administration

Accessible only to **Super Admin**.

```
GET /admin/hotels

GET /admin/users

GET /admin/stats
```

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
| 200 | Success |
| 201 | Resource Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# Rate Limiting

The API is protected using **SlowAPI**.

Example limits:

- Authentication endpoints
- AI Concierge
- Password reset
- Payment endpoints

Clients exceeding the configured limit receive:

```
429 Too Many Requests
```

---

# Authentication & Authorization

CMR Hospitality Suite uses:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-Tenant Isolation
- Hotel-based data segregation

Every protected endpoint validates:

1. JWT Token
2. User Identity
3. Hotel Ownership
4. Assigned Permissions

---

# Security Features

- JWT Authentication
- bcrypt Password Hashing
- Email Verification
- Password Reset
- RBAC
- Multi-Tenant Architecture
- Audit Logging
- Rate Limiting
- CORS Protection
- Paystack Signature Verification
- Secure AI Backend Proxy

---

# API Versioning

Current Version

```
v1
```

Base URL

```
/api/v1
```

Future breaking changes will be released under:

```
/api/v2
```

to maintain backward compatibility.

---

# Contact

**CMR Group**

Email: support@cmrgroup.com *(Update before production)*

Website: *(Coming Soon)*

GitHub: https://github.com/CMR-Labs

---

© CMR Group. All Rights Reserved.
