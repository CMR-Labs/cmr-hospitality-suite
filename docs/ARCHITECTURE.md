# Architecture

## Overview

CMR Hospitality Suite is a cloud-native, multi-tenant Hospitality Management System (HMS) developed by **CMR Labs**, a subsidiary of **CMR Group**.

The platform follows a modern client-server architecture, separating the frontend, backend, database, storage, authentication, and third-party integrations into independent services.

This architecture allows the platform to scale from a single hotel to multiple hotels while maintaining data isolation, security, and high availability.

---

# High-Level Architecture

```
                        Users
                          │
                          ▼
                 Next.js Frontend (Vercel)
                          │
                HTTPS / REST API / JWT
                          │
                          ▼
              FastAPI Backend (Render)
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
 PostgreSQL        Supabase Storage     Background Jobs
 (Supabase)         Images & Files      (Future)

        │
        ├───────────────┬─────────────────────┬─────────────────┐
        │               │                     │                 │
        ▼               ▼                     ▼                 ▼
    Paystack         Resend              Anthropic         Sentry
   Payments      Email Service          AI Concierge    Error Monitoring
```

---

# System Components

## 1. Frontend

Technology

- Next.js 16
- TypeScript
- Tailwind CSS
- React
- App Router

Deployment

- Vercel

Responsibilities

- User Interface
- Authentication Screens
- Dashboard
- Forms
- API Communication
- Client-side Validation
- Responsive Design

---

## 2. Backend

Technology

- FastAPI
- Python 3.11
- SQLAlchemy
- Pydantic
- JWT Authentication

Deployment

- Render
- (Future migration: DigitalOcean App Platform)

Responsibilities

- Business Logic
- Authentication
- Authorization
- Validation
- API Endpoints
- Payment Processing
- AI Integration
- Audit Logging

---

## 3. Database

Technology

- PostgreSQL
- Supabase

Architecture

Multi-Tenant

Each authenticated user belongs to a specific hotel.

Every business record references:

```
hotel_id
```

ensuring complete tenant isolation.

---

# Database Design

Core Tables

```
hotels

users

roles

permissions

role_permissions

rooms

room_types

guests

reservations

payments

staff

housekeeping_tasks

event_halls

event_bookings

audit_logs

subscriptions
```

---

# Authentication Flow

```
User Registers
        │
        ▼
Email Verification
        │
        ▼
User Login
        │
        ▼
JWT Generated
        │
        ▼
JWT attached to every request
        │
        ▼
Backend validates token
        │
        ▼
Access Granted
```

---

# Authorization (RBAC)

Authorization is implemented using Role-Based Access Control.

Roles

- Super Admin
- Hotel Owner
- Manager
- Receptionist
- Housekeeping
- Finance
- Event Manager

Permissions determine access to:

- Rooms
- Reservations
- Guests
- Payments
- Analytics
- Reports
- CRM
- AI
- Settings

Authorization is enforced on every protected API endpoint.

---

# Multi-Tenant Architecture

CMR Hospitality Suite is designed as a SaaS platform.

```
CMR Hospitality Suite

├── Hotel A
│     ├── Users
│     ├── Guests
│     ├── Rooms
│     └── Reservations
│
├── Hotel B
│     ├── Users
│     ├── Guests
│     ├── Rooms
│     └── Reservations
│
└── Hotel C
```

Data is isolated using:

```
hotel_id
```

Users cannot access another hotel's data.

---

# Security Architecture

Authentication

- JWT Tokens
- Password Hashing (bcrypt)
- Email Verification
- Password Reset

Authorization

- RBAC
- Permission Middleware
- Hotel Isolation

Protection

- Rate Limiting
- CORS
- Audit Logs
- Secure Password Storage

Future Enhancements

- Session Management
- Two-Factor Authentication
- Phone Verification

---

# API Architecture

```
Frontend

↓

REST API

↓

Authentication Middleware

↓

Permission Middleware

↓

Business Logic

↓

Database

↓

JSON Response
```

API Version

```
/api/v1
```

Future versions

```
/api/v2
```

will remain backward compatible whenever possible.

---

# Payment Architecture

Provider

- Paystack

Flow

```
Reservation

↓

Initialize Payment

↓

Customer Pays

↓

Paystack

↓

Webhook

↓

Backend Verification

↓

Payment Stored

↓

Reservation Updated

↓

Email Notification
```

---

# Email Architecture

Provider

- Resend

Supported Emails

- Verify Email
- Password Reset
- Reservation Confirmation
- Payment Confirmation
- Welcome Email

Future

- Marketing Emails
- Newsletter
- Promotional Campaigns

---

# AI Architecture

Provider

- Anthropic Claude

Flow

```
Dashboard

↓

AI Concierge

↓

Secure Backend Proxy

↓

Anthropic API

↓

Response

↓

User
```

API keys are never exposed to the frontend.

---

# File Storage

Provider

- Supabase Storage

Current Files

- Hotel Logos
- Room Images

Future

- Documents
- Staff Photos
- Guest Identification
- Invoice PDFs

---

# Monitoring

Current

- Audit Logs

Planned

- Sentry
- Performance Monitoring
- Health Checks
- Error Tracking

---

# Deployment Architecture

Frontend

```
Vercel
```

Backend

```
Render

(Future: DigitalOcean)
```

Database

```
Supabase PostgreSQL
```

Storage

```
Supabase Storage
```

Domain (Planned)

```
cmrgroup.com

app.cmrgroup.com

api.cmrgroup.com
```

---

# Scalability Strategy

The platform is designed to support:

- Multiple Hotels
- Multiple Branches
- Thousands of Rooms
- Thousands of Reservations
- Concurrent Users
- Horizontal API Scaling
- Future Microservices

---

# Future Architecture

```
                    Internet
                        │
                        ▼
                Load Balancer
                        │
        ┌───────────────┴───────────────┐
        │                               │
 Frontend (Vercel)              Backend Cluster
                                        │
                           ┌────────────┴────────────┐
                           │                         │
                     PostgreSQL              Redis Cache
                           │
                    Supabase Storage
                           │
             Paystack • Resend • Claude • Sentry
```

---

# Design Principles

CMR Hospitality Suite is built around the following principles:

- Security by Design
- Multi-Tenant SaaS Architecture
- Scalability
- Separation of Concerns
- RESTful API Design
- Role-Based Access Control
- Modular Development
- Cloud-Native Deployment
- Maintainability
- Performance
- Extensibility

---

# Architecture Version

**Version:** 1.0 (Release Candidate)

**Last Updated:** July 2026

**Maintained By:** CMR Labs
