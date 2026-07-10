# CMR Hospitality Suite — API v1.0

**Base URL:** `https://cmr-hospitality-suite.onrender.com`  
**Version:** v1.0  
**Frozen:** July 2026  
**Auth:** Bearer JWT token in Authorization header

---

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register hotel + owner |
| POST | /api/v1/auth/login | Login and get JWT token |
| GET | /api/v1/auth/me | Get current user |
| POST | /api/v1/auth/verify-email | Verify email token |
| POST | /api/v1/auth/forgot-password | Request password reset |
| POST | /api/v1/auth/reset-password | Reset password with token |

---

## Rooms

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/rooms/ | rooms.view |
| POST | /api/v1/rooms/ | rooms.create |
| GET | /api/v1/rooms/{id} | rooms.view |
| PATCH | /api/v1/rooms/{id} | rooms.update |
| DELETE | /api/v1/rooms/{id} | rooms.delete |
| GET | /api/v1/rooms/types/list | rooms.view |
| POST | /api/v1/rooms/types/ | rooms.create |

---

## Guests

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/guests/ | guests.view |
| POST | /api/v1/guests/ | guests.create |
| GET | /api/v1/guests/{id} | guests.view |
| PATCH | /api/v1/guests/{id} | guests.update |

---

## Reservations

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/reservations/ | reservations.view |
| POST | /api/v1/reservations/ | reservations.create |
| GET | /api/v1/reservations/{id} | reservations.view |
| PATCH | /api/v1/reservations/{id} | reservations.update |
| PATCH | /api/v1/reservations/{id}/checkin | reservations.checkin |
| PATCH | /api/v1/reservations/{id}/checkout | reservations.checkout |
| DELETE | /api/v1/reservations/{id} | reservations.cancel |

---

## Payments

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/payments/ | payments.view |
| POST | /api/v1/payments/ | payments.create |
| GET | /api/v1/payments/{id} | payments.view |
| PATCH | /api/v1/payments/{id}/confirm | payments.create |
| PATCH | /api/v1/payments/{id}/refund | payments.refund |

---

## Staff

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/staff/ | staff.view |
| POST | /api/v1/staff/ | staff.manage |
| GET | /api/v1/staff/{id} | staff.view |
| PATCH | /api/v1/staff/{id} | staff.manage |

---

## Housekeeping

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/housekeeping/ | housekeeping.view |
| POST | /api/v1/housekeeping/ | housekeeping.manage |
| PATCH | /api/v1/housekeeping/{id} | housekeeping.manage |
| PATCH | /api/v1/housekeeping/{id}/complete | housekeeping.manage |

---

## Event Halls

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/events/halls | events.view |
| POST | /api/v1/events/halls | events.manage |
| GET | /api/v1/events/bookings | events.view |
| POST | /api/v1/events/bookings | events.manage |
| PATCH | /api/v1/events/bookings/{id}/confirm | events.manage |

---

## Analytics

| Method | Endpoint | Permission |
|--------|----------|------------|
| GET | /api/v1/analytics/summary | analytics.view |

---

## AI Concierge

| Method | Endpoint | Permission |
|--------|----------|------------|
| POST | /api/v1/ai/chat | ai.use |

---

## Paystack

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/v1/paystack/initialize | Bearer token |
| POST | /api/v1/paystack/verify | Bearer token |
| GET | /api/v1/paystack/transactions | Bearer token |
| POST | /api/v1/paystack/webhook | None (Paystack) |

---

## Subscription

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/v1/subscription/plans | None (public) |
| GET | /api/v1/subscription/current | Bearer token |

---

## Settings

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/v1/settings/profile | Bearer token |
| PATCH | /api/v1/settings/profile | Bearer token |
| GET | /api/v1/settings/hotel | Bearer token |
| PATCH | /api/v1/settings/hotel | Bearer token |
| PATCH | /api/v1/settings/password | Bearer token |

---

## Uploads

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/v1/uploads/hotel-logo | Bearer token |
| POST | /api/v1/uploads/room-photo/{room_id} | Bearer token |
| DELETE | /api/v1/uploads/room-photo/{room_id} | Bearer token |

---

## Roles & Permissions

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/v1/roles/ | Bearer token |
| GET | /api/v1/roles/my-permissions | Bearer token |
| POST | /api/v1/roles/assign | staff.manage |
| GET | /api/v1/roles/permissions | Bearer token |

---

## Audit Logs

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/v1/audit/ | Bearer token |

---

## Admin (Internal)

| Method | Endpoint | Auth |
|--------|----------|------|
| GET | /api/v1/admin/hotels | x-admin-key header |
| GET | /api/v1/admin/users | x-admin-key header |
| GET | /api/v1/admin/stats | x-admin-key header |

---

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad request / validation error |
| 401 | Not authenticated |
| 403 | Permission denied / plan limit reached |
| 404 | Resource not found |
| 422 | Validation error |
| 429 | Rate limit exceeded |
| 500 | Server error |

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| /auth/login | 10/minute |
| /auth/register | 5/minute |
| /auth/forgot-password | 5/minute |
| /ai/chat | 20/minute |

---

## Versioning Policy

- Current version: v1
- Breaking changes will increment to v2
- Non-breaking additions are backwards compatible
- Deprecated endpoints will have 90-day notice period
