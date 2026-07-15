# Changelog

All notable changes to **CMR Hospitality Suite** will be documented in this file.

The format is based on **Keep a Changelog**, and this project follows **Semantic Versioning (SemVer)**.

---

## [1.0.0-rc.1] - 2026-07-15

### 🎉 Added

#### Product

* Initial Release Candidate (RC1)
* Multi-tenant SaaS architecture
* Subscription and feature gating
* Hotel onboarding wizard
* Demo account for product demonstrations

#### Authentication

* User registration
* Secure login
* JWT authentication
* Email verification
* Password reset
* Protected dashboard routes

#### Dashboard

* Live occupancy metrics
* Revenue summary
* Reservation statistics
* Guest statistics
* Quick action shortcuts

#### Room Management

* Room CRUD operations
* Room status management
* Room type management
* Room availability tracking
* Room image upload support

#### Reservations

* Reservation management
* Check-in workflow
* Check-out workflow
* Reservation filtering
* Reservation status tracking

#### Guests

* Guest profiles
* Guest history
* Guest search
* VIP guest support

#### Payments

* Payment records
* Payment confirmation
* Refund support
* Paystack integration
* Transaction verification

#### Staff

* Staff management
* Department assignment
* Staff records

#### Housekeeping

* Task assignment
* Task completion tracking
* Room cleaning status

#### Event Halls

* Event hall management
* Event booking support

#### CRM

* Customer records
* Customer segmentation
* Interaction history

#### Analytics

* Revenue analytics
* Occupancy analytics
* Reservation analytics
* Performance dashboard

#### AI Concierge

* Anthropic AI integration
* Secure backend proxy
* Hotel-aware responses

#### Settings

* Hotel profile management
* Account settings
* Password management

#### Notifications

* Notification center UI

#### Reports

* Report dashboard UI

#### Audit Logs

* User activity logging
* Administrative audit trail

#### Administration

* Secure admin dashboard
* Hotel management
* User management
* Platform statistics

---

### 🔒 Security

* JWT authentication
* Password hashing (bcrypt)
* Email verification
* Password reset workflow
* Role-Based Access Control (RBAC)
* Seven predefined user roles
* Twenty-seven permission policies
* Multi-tenant isolation using `hotel_id`
* Rate limiting
* Audit logging
* CORS protection
* Secure AI backend proxy

---

### 💳 Integrations

* Paystack
* Anthropic API
* Resend Email

---

### 🗄 Database

Implemented core relational database with tables for:

* Hotels
* Users
* Roles
* Permissions
* Role Permissions
* Rooms
* Room Types
* Guests
* Reservations
* Payments
* Staff
* Housekeeping Tasks
* Event Halls
* Event Bookings
* Audit Logs

---

### 🚀 Deployment

#### Frontend

* Next.js 16
* TypeScript
* Tailwind CSS
* Vercel deployment

#### Backend

* FastAPI
* Python 3.11
* SQLAlchemy
* Render deployment

#### Database

* Supabase PostgreSQL

---

### 📚 Documentation

Added documentation for:

* API
* Architecture
* Database
* Deployment
* Installation
* Security
* RBAC
* Roadmap

---

### ⚠ Known Issues

* Room photo upload is not persisting image references to the database.
* Event hall bookings are not being saved correctly after submission.

---

## [Unreleased]

### Planned

#### Production

* Resolve flagged issues
* Mobile responsiveness audit
* Custom domain
* Production hosting migration
* Performance optimization
* Health monitoring
* Backup strategy

#### Features

* Guest booking portal
* WhatsApp notifications
* SMS notifications (Termii)
* Progressive Web App (PWA)
* Active session management
* Multi-property support

#### Infrastructure

* Sentry monitoring
* DigitalOcean deployment
* Automated backups
* CI/CD improvements

#### Future

* Mobile application
* Channel manager integrations
* OTA integrations
* Business intelligence enhancements
* Advanced AI insights
* White-label support
