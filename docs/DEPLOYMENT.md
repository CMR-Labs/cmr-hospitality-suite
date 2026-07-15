# Deployment Guide

## CMR Hospitality Suite

This document explains how to deploy CMR Hospitality Suite to a production environment.

---

# Deployment Architecture

```
                        Internet
                            │
                    https://app.domain.com
                            │
                    Vercel (Next.js)
                            │
                ┌───────────┴───────────┐
                │                       │
         FastAPI Backend         Anthropic API
        (DigitalOcean/Render)           │
                │                       │
                └───────────┬───────────┘
                            │
                  Supabase PostgreSQL
                            │
                    Supabase Storage
                            │
        Paystack • Resend • Sentry
```

---

# Production Stack

| Component        | Technology                                |
| ---------------- | ----------------------------------------- |
| Frontend         | Next.js 16                                |
| Backend          | FastAPI                                   |
| Database         | PostgreSQL (Supabase)                     |
| File Storage     | Supabase Storage                          |
| Authentication   | JWT + RBAC                                |
| Payments         | Paystack                                  |
| Email            | Resend                                    |
| AI               | Anthropic Claude                          |
| Monitoring       | Sentry                                    |
| Frontend Hosting | Vercel                                    |
| Backend Hosting  | DigitalOcean App Platform *(recommended)* |

---

# Frontend Deployment

## Vercel

1. Connect GitHub repository.
2. Import the project.
3. Configure environment variables.
4. Deploy.

### Required Environment Variables

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=
```

---

# Backend Deployment

Recommended:

* DigitalOcean App Platform

Alternative:

* Render

### Environment Variables

```env
DATABASE_URL=

JWT_SECRET_KEY=

JWT_ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60

SUPABASE_URL=

SUPABASE_SERVICE_ROLE_KEY=

PAYSTACK_SECRET_KEY=

PAYSTACK_WEBHOOK_SECRET=

RESEND_API_KEY=

ANTHROPIC_API_KEY=

SENTRY_DSN=

FRONTEND_URL=
```

Never commit these values to GitHub.

---

# Database Deployment

The application uses Supabase PostgreSQL.

Deployment steps:

1. Create Supabase project.
2. Configure database.
3. Run migrations.
4. Seed demo data (optional).

Tables include:

* hotels
* users
* roles
* permissions
* role_permissions
* rooms
* room_types
* guests
* reservations
* payments
* staff
* housekeeping_tasks
* event_halls
* event_bookings
* audit_logs

---

# File Storage

Uploads are stored in Supabase Storage.

Buckets:

* hotel-logos
* room-images
* event-images
* profile-images

Recommended limits:

* Maximum file size: 5 MB
* Allowed formats:

  * JPG
  * PNG
  * WEBP

---

# Domain Configuration

Recommended production domains:

```
www.cmrgroup.com

app.cmrgroup.com

api.cmrgroup.com
```

Example:

```
www.cmrgroup.com
Landing Website

↓

app.cmrgroup.com
Application

↓

api.cmrgroup.com
REST API
```

---

# SSL

HTTPS is mandatory.

Use automatic SSL certificates provided by the hosting provider.

---

# Database Backups

Recommended schedule:

* Daily automated backups
* Weekly snapshot
* Monthly archive

Backup retention:

* Daily: 14 days
* Weekly: 8 weeks
* Monthly: 12 months

---

# Monitoring

Sentry monitors:

* Frontend exceptions
* Backend exceptions
* API failures
* Performance metrics

Health endpoint:

```
GET /health
```

Recommended uptime monitoring:

* Every 5 minutes

---

# Logging

Application logs include:

* Authentication
* API requests
* Errors
* Audit logs
* Payment events

Sensitive information must never be logged.

---

# CI/CD

Deployment flow:

```
Developer

↓

GitHub

↓

Automatic Build

↓

Tests

↓

Production Deployment
```

Every push to the main branch should trigger:

1. Install dependencies
2. Run tests
3. Build frontend
4. Build backend
5. Deploy
6. Health check

---

# Security Checklist

Before every production deployment:

* Environment variables configured
* HTTPS enabled
* JWT secret updated
* Database backups enabled
* Rate limiting enabled
* RBAC verified
* Multi-tenant isolation verified
* Paystack webhook configured
* Email verification enabled
* Password reset tested
* Sentry enabled

---

# Deployment Checklist

## Frontend

* Next.js builds successfully
* Environment variables configured
* API URL correct
* Production build tested

## Backend

* Database connected
* Migrations completed
* JWT configured
* Email configured
* Paystack configured
* AI configured

## Database

* Tables migrated
* Seed data loaded (optional)
* Indexes verified

## Security

* RBAC functioning
* Audit logging enabled
* Rate limiting enabled
* CORS configured

## Payments

* Paystack initialized
* Webhooks verified
* Refund flow tested

## Monitoring

* Sentry connected
* Health endpoint available
* Logs accessible

---

# Rollback Strategy

If deployment fails:

1. Restore previous backend release.
2. Restore previous frontend deployment.
3. Restore latest verified database backup if necessary.
4. Verify application health.
5. Investigate logs before redeploying.

---

# Production Status

Current deployment status:

* Frontend: Vercel
* Backend: Render (planned migration to DigitalOcean)
* Database: Supabase PostgreSQL
* Storage: Supabase Storage
* Payments: Paystack
* Email: Resend
* AI: Anthropic Claude
* Monitoring: Sentry

---

# Future Infrastructure Roadmap

* DigitalOcean App Platform migration
* Redis for caching
* Background job processing
* Multi-region deployment
* CDN optimization
* Automatic scaling
* Blue/Green deployments
* Disaster recovery automation
