Chapter 1 — Introduction
Chapter 2 — User Roles
Chapter 3 — Getting Started
Chapter 4 — Dashboard
Chapter 5 — Rooms
Chapter 6 — Room Types
Chapter 7 — Reservations
Chapter 8 — Guests
Chapter 9 — Payments
Chapter 10 — Staff
Chapter 11 — Housekeeping
Chapter 12 — Event Halls
Chapter 13 — CRM
Chapter 14 — Analytics
Chapter 15 — AI Concierge
Chapter 16 — Notifications
Chapter 17 — Reports
Chapter 18 — Settings
Chapter 19 — Audit Logs
Chapter 20 — Admin Panel

# Chapter 1 — Introduction

## Welcome to CMR Hospitality Suite

Welcome to **CMR Hospitality Suite**, an AI-powered Hospitality Management Platform developed by **CMR Labs**, a software engineering and artificial intelligence division of **CMR Group**.

CMR Hospitality Suite is designed to simplify and automate the day-to-day operations of hotels, resorts, guest houses, serviced apartments, and event centres. The platform provides a centralized workspace where hotel staff can manage reservations, guests, rooms, payments, housekeeping, event bookings, customer relationships, and business analytics from a single secure system.

Built with a cloud-native architecture, the platform enables hospitality businesses to improve operational efficiency, reduce manual processes, and deliver exceptional guest experiences while maintaining enterprise-grade security and scalability.

---

# Purpose of the Platform

The hospitality industry depends on speed, accuracy, and coordination across multiple departments. Traditional methods of managing reservations, guests, payments, and operations often rely on spreadsheets or disconnected software, leading to inefficiencies and data inconsistencies.

CMR Hospitality Suite was created to solve these challenges by providing one integrated platform that connects every department within a hospitality business.

The platform helps organizations:

- Digitize daily hotel operations
- Improve guest experiences
- Automate repetitive tasks
- Track operational performance
- Secure sensitive business data
- Enable data-driven decision making
- Scale efficiently as the business grows

---

# Who is CMR Hospitality Suite For?

CMR Hospitality Suite is suitable for organizations of different sizes within the hospitality industry, including:

- Hotels
- Boutique Hotels
- Resorts
- Guest Houses
- Serviced Apartments
- Lodges
- Holiday Homes
- Conference Centres
- Event Centres
- Hospitality Groups managing multiple properties

Whether managing a small boutique hotel or a large multi-property hospitality business, the platform is designed to adapt to operational requirements through flexible roles, permissions, and subscription plans.

---

# Key Capabilities

CMR Hospitality Suite provides an integrated set of operational modules, including:

- Reservations Management
- Guest Management
- Room Management
- Room Type Management
- Online Payment Processing
- Housekeeping Management
- Staff Administration
- Event Hall Management
- Customer Relationship Management (CRM)
- Business Analytics
- Reports
- Notifications
- AI Concierge
- Audit Logging
- Administration Panel

Each module is designed to work together, eliminating duplicate data entry and ensuring consistency across the organization.

---

# Platform Architecture

CMR Hospitality Suite follows a modern Software-as-a-Service (SaaS) architecture.

The platform consists of:

- A web-based frontend built with Next.js
- A FastAPI backend providing secure REST APIs
- PostgreSQL database hosted on Supabase
- Secure authentication using JWT
- Role-Based Access Control (RBAC)
- Multi-tenant data isolation
- Cloud storage for files and images
- Third-party integrations for payments, email, and artificial intelligence

This architecture enables secure access from anywhere while ensuring each hotel's data remains completely isolated.

---

# Security and Access Control

Security is a core design principle of CMR Hospitality Suite.

The platform incorporates multiple layers of protection, including:

- Secure user authentication
- Email verification
- Password encryption using bcrypt
- JWT-based session management
- Role-Based Access Control (RBAC)
- Multi-tenant architecture
- Audit logging
- API rate limiting
- Secure payment verification

Every user is assigned a specific role that determines which features and data they are authorized to access.

---

# Intended Users

CMR Hospitality Suite supports multiple user roles within a hospitality organization.

These include:

- Super Administrator
- Hotel Owner
- General Manager
- Receptionist
- Finance Officer
- Housekeeping Staff
- Event Manager

Each role has a defined set of permissions that aligns with their operational responsibilities.

---

# System Requirements

To access CMR Hospitality Suite, users require:

### Supported Devices

- Desktop Computer
- Laptop
- Tablet
- Mobile Phone

### Supported Browsers

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

### Internet Connection

A stable internet connection is required to access the cloud-hosted platform.

---

# Getting Started

New users can begin using the platform by following these steps:

1. Register an account.
2. Verify the registered email address.
3. Sign in to the platform.
4. Complete the hotel onboarding process.
5. Configure hotel information.
6. Add room types.
7. Create rooms.
8. Invite staff members.
9. Begin managing daily hotel operations.

The onboarding wizard guides administrators through the initial setup process to ensure the platform is ready for operational use.

---

# About This User Guide

This manual provides detailed instructions for using every module within CMR Hospitality Suite.

It is intended for:

- Hotel Owners
- Managers
- Receptionists
- Finance Officers
- Housekeeping Teams
- Event Managers
- System Administrators
- Technical Support Personnel

Each subsequent chapter explains the purpose of a specific module, identifies the users who should access it, and provides step-by-step guidance on performing common tasks.

---

# Document Information

**Product:** CMR Hospitality Suite

**Version:** 1.0 Release Candidate (RC)

**Developed By:** CMR Labs

**Parent Organization:** CMR Group

**Document Type:** User Guide

**Last Updated:** July 2026


# Chapter 2 — User Roles & Permissions

## Overview

CMR Hospitality Suite uses a **Role-Based Access Control (RBAC)** system to ensure that every user has access only to the features required for their job.

Rather than giving every employee full system access, permissions are assigned based on responsibilities. This improves security, protects sensitive information, and helps maintain accountability across hotel operations.

Every action performed within the system is linked to a user account and recorded in the Audit Log.

---

# User Hierarchy

```
CMR Super Admin
        │
        ▼
Hotel Owner
        │
        ▼
General Manager
        │
 ┌──────┼──────────┬───────────┬────────────┐
 │      │          │           │            │
 ▼      ▼          ▼           ▼            ▼
Reception Finance Housekeeping Event Manager Other Staff
```

Each role inherits only the permissions necessary to perform its assigned duties.

---

# 1. Super Admin

## Description

The Super Admin is the highest-level user in CMR Hospitality Suite. This role belongs exclusively to CMR Group and is responsible for managing the SaaS platform itself.

The Super Admin oversees all hotels registered on the platform but does not participate in their day-to-day operations.

### Responsibilities

- Manage hotels
- Manage subscriptions
- View platform statistics
- Suspend or activate hotels
- Monitor platform health
- Manage platform users
- View global audit logs
- Configure system-wide settings

### Accessible Modules

- Admin Panel
- Hotels
- Users
- Subscriptions
- Platform Analytics
- Audit Logs
- System Settings

### Restrictions

The Super Admin cannot alter hotel operational records unless performing platform administration or authorized support.

---

# 2. Hotel Owner

## Description

The Hotel Owner is the primary administrator for an individual hotel. This role has complete control over hotel operations, staff, and configuration.

### Responsibilities

- Manage hotel profile
- Manage rooms
- Manage reservations
- View analytics
- Configure settings
- Manage staff
- Monitor finances
- View audit logs

### Accessible Modules

- Dashboard
- Rooms
- Room Types
- Reservations
- Guests
- Payments
- Staff
- Housekeeping
- Event Halls
- CRM
- Analytics
- Reports
- Settings
- Notifications
- Audit Logs
- AI Concierge

### Restrictions

- Cannot access data belonging to another hotel.
- Cannot modify CMR platform settings.

---

# 3. General Manager

## Description

The General Manager oversees the hotel's daily operations and ensures smooth coordination between departments.

### Responsibilities

- Supervise departments
- Monitor reservations
- Oversee housekeeping
- Review reports
- Manage operational staff
- Resolve guest issues

### Accessible Modules

- Dashboard
- Rooms
- Reservations
- Guests
- Payments (View)
- Staff
- Housekeeping
- Event Halls
- CRM
- Analytics
- Reports
- AI Concierge

### Restrictions

- Cannot change subscription plans.
- Cannot delete the hotel.
- Limited access to system settings.

---

# 4. Receptionist

## Description

Receptionists manage guest-facing activities from arrival to departure.

### Responsibilities

- Register guests
- Create reservations
- Check guests in
- Check guests out
- Receive payments
- Update guest information

### Accessible Modules

- Dashboard
- Rooms (View)
- Reservations
- Guests
- Payments
- Notifications
- AI Concierge

### Restrictions

Cannot:

- Manage staff
- View financial reports
- Access analytics
- Modify hotel settings
- Export reports
- Access audit logs

---

# 5. Housekeeping Staff

## Description

Housekeeping personnel ensure rooms remain clean, prepared, and ready for guests.

### Responsibilities

- View assigned tasks
- Update room cleaning status
- Report maintenance issues

### Accessible Modules

- Dashboard (Limited)
- Housekeeping
- Notifications

### Restrictions

Cannot access:

- Guests
- Reservations
- Payments
- CRM
- Reports
- Analytics
- Settings

---

# 6. Finance Officer

## Description

The Finance Officer manages hotel financial transactions and reporting.

### Responsibilities

- Process payments
- Verify transactions
- Issue refunds
- Review financial records
- Generate payment reports

### Accessible Modules

- Dashboard (Financial View)
- Payments
- Reports
- Analytics (Financial)

### Restrictions

Cannot:

- Manage rooms
- Manage guests
- Manage housekeeping
- Manage staff
- Access CRM

---

# 7. Event Manager

## Description

The Event Manager oversees conference halls, meeting rooms, and event bookings.

### Responsibilities

- Manage event halls
- Schedule bookings
- Coordinate events
- Track hall availability

### Accessible Modules

- Dashboard
- Event Halls
- Reservations (Event Related)
- Payments (Event Related)
- Notifications

### Restrictions

Cannot:

- Manage hotel rooms
- Manage staff
- View hotel analytics
- Access CRM
- Modify settings

---

# Permission Categories

Permissions within the system are grouped into functional categories.

## Room Management

- View Rooms
- Create Rooms
- Update Rooms
- Delete Rooms

---

## Reservation Management

- View Reservations
- Create Reservations
- Update Reservations
- Cancel Reservations
- Check-in Guests
- Check-out Guests

---

## Guest Management

- View Guests
- Create Guests
- Update Guests

---

## Payment Management

- View Payments
- Create Payments
- Refund Payments

---

## Staff Management

- View Staff
- Manage Staff

---

## Housekeeping

- View Tasks
- Manage Tasks

---

## Event Management

- View Event Halls
- Manage Event Halls
- Manage Bookings

---

## Analytics

- View Dashboard Analytics
- View Revenue Reports
- View Occupancy Reports

---

## CRM

- View Customers
- Manage Customer Records

---

## Reports

- Export Reports

---

## Settings

- Manage Hotel Settings

---

## AI

- Access AI Concierge

---

# Role Permission Matrix

| Module | Super Admin | Owner | Manager | Reception | Finance | Housekeeping | Event Manager |
|---------|:-----------:|:-----:|:-------:|:---------:|:-------:|:------------:|:-------------:|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ | Limited | ✅ |
| Rooms | ✅ | ✅ | ✅ | View | ❌ | ❌ | ❌ |
| Room Types | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Reservations | ✅ | ✅ | ✅ | ✅ | View | ❌ | Limited |
| Guests | ✅ | ✅ | ✅ | ✅ | View | ❌ | ❌ |
| Payments | ✅ | ✅ | View | Limited | ✅ | ❌ | Limited |
| Staff | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Housekeeping | ✅ | ✅ | ✅ | View | ❌ | ✅ | ❌ |
| Event Halls | ✅ | ✅ | ✅ | View | ❌ | ❌ | ✅ |
| CRM | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Analytics | ✅ | ✅ | ✅ | ❌ | Financial | ❌ | ❌ |
| Reports | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Notifications | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Settings | ✅ | ✅ | Limited | ❌ | ❌ | ❌ | ❌ |
| Audit Logs | ✅ | ✅ | View | ❌ | ❌ | ❌ | ❌ |
| AI Concierge | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

# Security Principles

CMR Hospitality Suite follows these security principles:

- Least Privilege Access
- Separation of Duties
- Tenant Data Isolation
- Role-Based Authorization
- Audit Logging
- Secure Authentication
- Permission-Based Feature Access

These principles ensure users can perform their responsibilities without exposing sensitive information or compromising system integrity.

---

# Summary

The Role-Based Access Control system is a core security component of CMR Hospitality Suite. By assigning permissions according to job responsibilities, the platform maintains operational efficiency while safeguarding hotel data and ensuring accountability across all user activities.


-----------------------------------
-----------------------------------
# Chapter 3 — Getting Started

## Overview

This chapter walks new users through the initial setup of CMR Hospitality Suite. Before your hotel can begin managing reservations, guests, payments, and daily operations, a few essential configuration steps must be completed.

The onboarding wizard guides administrators through these steps to ensure the platform is configured correctly.

---

# Step 1 — Create an Account

Visit the CMR Hospitality Suite website and click **Get Started**.

Provide the following information:

- Full Name
- Email Address
- Password
- Confirm Password

Click **Create Account**.

> **Note:** Your email address must be unique and will be used as your login username.

---

# Step 2 — Verify Your Email Address

After registration, the system automatically sends a verification email.

Open your inbox and click the verification link.

If you do not receive the email:

- Check your Spam/Junk folder.
- Click **Resend Verification Email**.
- Ensure your email address was entered correctly.

Your account cannot be used until your email has been verified.

---

# Step 3 — Log In

After verification:

1. Navigate to the Login page.
2. Enter your email address.
3. Enter your password.
4. Click **Login**.

Upon successful authentication, you will be redirected to the onboarding wizard (first login) or directly to your dashboard.

---

# Step 4 — Create Your Hotel

The first login requires creating your hotel profile.

Provide:

- Hotel Name
- Hotel Type
- Address
- City
- State
- Country
- Phone Number
- Email Address
- Website (Optional)

This information appears on invoices, reports, booking confirmations, and customer communications.

---

# Step 5 — Upload Your Hotel Logo

Upload your official hotel logo.

Supported formats:

- PNG
- JPG
- JPEG
- SVG (Recommended)

The logo is displayed on:

- Dashboard
- Reports
- Booking Confirmations
- Payment Receipts
- Guest Communications

---

# Step 6 — Configure Hotel Settings

Configure your operational preferences.

### General Settings

- Hotel Name
- Contact Email
- Phone Number
- Address

### Regional Settings

- Currency
- Time Zone
- Date Format
- Time Format

### Financial Settings

- Tax/VAT Percentage
- Payment Preferences

### Notification Settings

- Email Notifications
- Booking Notifications
- Payment Notifications
- Staff Notifications

---

# Step 7 — Select Your Subscription Plan

Choose the plan that best suits your hotel's operational requirements.

Available plans include:

- Starter
- Professional
- Professional Elite
- Enterprise

Each subscription includes different limits and feature access.

Examples include:

- Maximum number of rooms
- Staff accounts
- AI Concierge availability
- Event hall limits
- Storage capacity

Subscriptions can be upgraded at any time.

---

# Step 8 — Add Room Types

Before creating rooms, define your room categories.

Examples include:

- Standard Room
- Deluxe Room
- Executive Room
- Family Room
- Junior Suite
- Presidential Suite

For each room type, configure:

- Name
- Description
- Base Price
- Maximum Occupancy
- Amenities

Room types ensure pricing and room classification remain consistent.

---

# Step 9 — Create Rooms

After room types have been created, add individual rooms.

For each room provide:

- Room Number
- Room Type
- Floor
- Price Override (Optional)
- Status
- Description
- Room Photos

Available room statuses include:

- Available
- Occupied
- Reserved
- Cleaning
- Maintenance
- Out of Service

---

# Step 10 — Add Staff Members

Create user accounts for hotel employees.

Each staff member requires:

- Full Name
- Email Address
- Phone Number
- Department
- Job Title
- Assigned Role

Available system roles include:

- Hotel Owner
- Manager
- Receptionist
- Housekeeping
- Finance Officer
- Event Manager

Each role automatically receives the permissions assigned through the Role-Based Access Control (RBAC) system.

---

# Step 11 — Invite Staff

After creating staff accounts, invite employees to access the platform.

Each staff member will receive:

- Login credentials
- Email verification link
- Instructions for first-time login

Staff must verify their email before accessing the system.

---

# Step 12 — Configure Payment Gateway

To begin accepting online payments:

1. Navigate to **Settings → Payments**.
2. Enter your Paystack credentials.
3. Save your configuration.
4. Perform a test transaction.
5. Verify successful payment processing.

Once configured, customers can pay securely through Paystack during reservation.

---

# Step 13 — Test Your System

Before accepting real guests, perform a complete workflow.

Recommended checklist:

- Create a room type.
- Create a room.
- Register a guest.
- Create a reservation.
- Receive a payment.
- Check in the guest.
- Assign housekeeping.
- Check out the guest.
- Review reports.
- Verify audit logs.

Completing this test ensures your hotel is fully operational.

---

# Step 14 — You're Ready

Congratulations.

Your hotel is now fully configured and ready to begin managing daily operations using CMR Hospitality Suite.

From this point, you can:

- Accept reservations
- Register guests
- Manage rooms
- Track payments
- Coordinate housekeeping
- Manage event bookings
- View analytics
- Generate reports
- Use the AI Concierge
- Monitor hotel performance from a single dashboard

---

# Getting Help

If you encounter any issues during setup:

- Consult the User Guide.
- Contact your Hotel Administrator.
- Reach out to CMR Support.
- Submit a support request through the platform (when available).

--------------------------------
--------------------------------

# Chapter 4 — Dashboard

## Overview

The Dashboard is the central workspace of CMR Hospitality Suite. It provides a real-time overview of hotel operations, allowing authorized users to monitor key performance indicators (KPIs), recent activities, operational alerts, and quick actions from a single screen.

Instead of navigating through multiple modules, users can immediately understand the current state of the hotel upon logging in.

---

# Purpose

The Dashboard is designed to:

- Provide an overview of daily hotel operations.
- Display real-time business performance.
- Highlight tasks requiring immediate attention.
- Enable quick access to frequently used features.
- Support informed decision-making through live data.

---

# Who Can Access the Dashboard?

| Role | Access Level |
|-------|--------------|
| Super Admin | Full Platform Dashboard |
| Hotel Owner | Full Hotel Dashboard |
| General Manager | Full Operational Dashboard |
| Receptionist | Limited Operational Dashboard |
| Finance Officer | Financial Widgets Only |
| Housekeeping | Assigned Tasks Only |
| Event Manager | Event Statistics Only |

The information displayed varies according to the user's assigned role and permissions.

---

# Dashboard Layout

The Dashboard is divided into five primary sections:

```
---------------------------------------------------------
 Sidebar Navigation
---------------------------------------------------------

 Header
---------------------------------------------------------

 KPI Cards

---------------------------------------------------------

 Charts & Analytics

---------------------------------------------------------

 Recent Activities

---------------------------------------------------------

 Quick Actions
---------------------------------------------------------
```

---

# Header Section

The header provides quick access to frequently used functions.

### Components

- Current Hotel Name
- Current User
- Notifications
- Search
- Profile Menu
- Logout

---

# Key Performance Indicators (KPIs)

The KPI cards display live operational statistics.

Typical metrics include:

### Occupancy Rate

Displays the percentage of occupied rooms.

Purpose:

- Measure hotel utilization.
- Identify peak occupancy periods.

---

### Total Reservations

Displays the total number of active reservations.

Includes:

- Confirmed
- Pending
- Checked-in
- Checked-out

---

### Revenue

Displays:

- Daily Revenue
- Weekly Revenue
- Monthly Revenue

This information is automatically calculated from completed payments.

---

### Available Rooms

Shows the number of rooms currently available for booking.

Room statuses include:

- Available
- Occupied
- Reserved
- Maintenance

---

### Guests

Displays:

- Current Guests
- Today's Check-ins
- Today's Check-outs

---

# Analytics Section

The analytics section visualizes hotel performance using interactive charts.

Charts may include:

- Occupancy Trend
- Revenue Trend
- Reservation Growth
- Guest Distribution
- Payment Breakdown
- Monthly Performance

These charts assist management in identifying trends and making operational decisions.

---

# Recent Reservations

Displays the most recent reservations.

Typical information includes:

- Reservation Number
- Guest Name
- Room Number
- Check-in Date
- Check-out Date
- Reservation Status

Users can quickly navigate to the full reservation details.

---

# Recent Payments

Displays the latest payment activities.

Information shown includes:

- Guest Name
- Payment Amount
- Payment Method
- Payment Status
- Date

Statuses include:

- Pending
- Successful
- Refunded

---

# Housekeeping Summary

Displays housekeeping statistics.

Information includes:

- Rooms Cleaned
- Rooms Pending Cleaning
- Rooms Under Maintenance
- Assigned Tasks

This helps supervisors monitor daily housekeeping performance.

---

# Event Hall Summary

Displays event hall information.

Includes:

- Upcoming Events
- Today's Events
- Available Halls
- Booked Halls

---

# Notifications Panel

The notification panel displays important system events.

Examples:

- New Reservation
- Reservation Cancellation
- Payment Confirmation
- Failed Payment
- New Guest Registration
- Staff Assignment
- Housekeeping Completion
- System Alerts

Notifications help users respond promptly to operational events.

---

# Quick Actions

Quick Actions provide shortcuts to commonly used tasks.

Examples include:

- Create Reservation
- Register Guest
- Add Room
- Receive Payment
- Assign Housekeeping
- Add Staff
- Book Event Hall
- Open CRM
- Generate Report

These actions reduce navigation time and improve operational efficiency.

---

# Dashboard Search

The search bar enables users to quickly locate:

- Guests
- Reservations
- Rooms
- Staff Members
- Event Bookings

Search results are filtered according to the user's permissions.

---

# Role-Based Dashboard Views

## Hotel Owner

The Hotel Owner has access to the complete operational dashboard.

Visible information includes:

- Revenue
- Occupancy
- Analytics
- Staff Performance
- Reservations
- Payments
- Reports
- AI Concierge

---

## General Manager

The General Manager oversees daily operations.

Dashboard includes:

- Reservations
- Occupancy
- Staff Activity
- Housekeeping
- Events
- Payments
- Analytics

---

## Receptionist

The Receptionist focuses on front desk operations.

Dashboard includes:

- Today's Check-ins
- Today's Check-outs
- Active Reservations
- Room Availability
- Guest Search
- Quick Reservation

Financial reports and system settings are hidden.

---

## Finance Officer

The Finance dashboard emphasizes financial operations.

Visible information includes:

- Revenue
- Payments
- Refunds
- Outstanding Balances
- Financial Reports

Operational modules are limited.

---

## Housekeeping Staff

Housekeeping users see only information relevant to their assignments.

Dashboard includes:

- Assigned Rooms
- Pending Cleaning Tasks
- Completed Tasks
- Maintenance Requests

Other operational data is hidden.

---

## Event Manager

The Event Manager dashboard focuses on event operations.

Visible information includes:

- Upcoming Events
- Hall Availability
- Event Bookings
- Event Payments

Hotel operational data remains restricted.

---

# AI Dashboard Assistant

The dashboard includes access to the AI Concierge.

Users can ask questions such as:

- "How many rooms are available today?"
- "Show today's reservations."
- "Which rooms require housekeeping?"
- "Summarize today's revenue."
- "List upcoming events."

The AI Concierge responds using authorized hotel data while respecting user permissions.

---

# Dashboard Security

Dashboard data is protected through:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-Tenant Data Isolation
- Audit Logging
- Rate Limiting

Users can only view information they are authorized to access.

---

# Best Practices

To maximize the effectiveness of the dashboard:

- Review KPIs at the beginning of each shift.
- Monitor notifications regularly.
- Use Quick Actions for routine tasks.
- Verify occupancy before assigning rooms.
- Monitor revenue trends daily.
- Review housekeeping progress throughout the day.
- Export reports for management meetings.

---

# Summary

The Dashboard serves as the operational command center of CMR Hospitality Suite. It provides role-specific, real-time insights into hotel operations, enabling users to make informed decisions, respond quickly to changing conditions, and efficiently manage daily activities from a single interface.

The information presented is dynamic, secure, and tailored to each user's responsibilities, ensuring both operational efficiency and data protection.

# Chapter 5 — Rooms Management

## Overview

The **Rooms** module is the foundation of CMR Hospitality Suite. It enables hotel management to create, organize, monitor, and maintain every room within the property.

Every reservation, check-in, housekeeping task, payment, and occupancy report is linked to a room. As such, room information should always be kept accurate and up to date.

---

# Purpose

The Rooms module allows authorized users to:

- Create hotel rooms
- Edit room information
- Assign room types
- Set room prices
- Track room status
- Upload room photos
- Monitor occupancy
- Search and filter rooms

---

# Who Can Access

| Role | Access Level |
|-------|--------------|
| Super Admin | Full Access |
| Hotel Owner | Full Access |
| Manager | Full Access |
| Receptionist | View, Assign & Update Status |
| Housekeeping | View Assigned Rooms Only |
| Finance | View Only |
| Event Manager | No Access |

Permissions are controlled through the Role-Based Access Control (RBAC) system.

---

# Rooms Dashboard

The Rooms page displays all rooms belonging to the authenticated hotel.

Each room card or table row displays:

- Room Number
- Room Type
- Floor
- Capacity
- Price Per Night
- Current Status
- Room Image
- Availability
- Last Updated

---

# Room Statuses

Every room can only have one active status at a time.

### Available

The room is vacant and ready for booking.

Displayed as:

```
Available
```

---

### Occupied

The room currently has an active guest.

Displayed as:

```
Occupied
```

---

### Reserved

The room has been booked but the guest has not yet checked in.

Displayed as:

```
Reserved
```

---

### Housekeeping

The room is undergoing cleaning and cannot be assigned.

Displayed as:

```
Housekeeping
```

---

### Maintenance

The room has been taken out of service for repairs.

Displayed as:

```
Maintenance
```

Rooms under maintenance cannot be reserved.

---

# Creating a Room

To add a new room:

1. Navigate to **Dashboard → Rooms**
2. Click **Add Room**
3. Complete the room details form
4. Upload room image(s)
5. Save

---

# Room Information

Each room contains the following information.

## Basic Information

- Room Number
- Room Name (Optional)
- Room Type
- Floor
- Capacity

---

## Pricing

- Price Per Night
- Discount (Optional)
- Currency

---

## Room Details

- Number of Beds
- Bed Type
- Bathroom Type
- Room Size
- Maximum Occupancy

---

## Amenities

Examples include:

- Air Conditioning
- Wi-Fi
- Television
- Refrigerator
- Mini Bar
- Workspace
- Balcony
- Kitchenette
- Safe
- Coffee Machine

Amenities help guests understand what each room offers.

---

# Room Images

Each room may have one or more photographs.

Recommended image guidelines:

- High Resolution
- Landscape Orientation
- Good Lighting
- JPEG or PNG
- Optimized for web

Images are stored securely using Supabase Storage.

---

# Editing a Room

To edit an existing room:

1. Open the Rooms page.
2. Locate the room.
3. Click **Edit**.
4. Update the required information.
5. Save changes.

All changes are recorded in the Audit Log.

---

# Deleting a Room

Rooms should only be deleted when they have never been used.

If historical reservations exist, it is recommended to mark the room as **Inactive** instead of deleting it.

Deleting a room may affect historical reporting.

---

# Room Search

The search bar allows users to quickly locate rooms.

Supported search fields include:

- Room Number
- Room Name
- Room Type

---

# Filters

Users can filter rooms by:

- Status
- Room Type
- Floor
- Availability
- Price Range

Filters make it easier to locate specific rooms in large hotels.

---

# Room Actions

Available actions include:

- View Details
- Edit
- Change Status
- Upload Images
- View Reservation History

Actions displayed depend on the user's permissions.

---

# Reservation Integration

The Rooms module is tightly integrated with Reservations.

When:

- A reservation is confirmed → Room becomes **Reserved**
- Guest checks in → Room becomes **Occupied**
- Guest checks out → Room becomes **Housekeeping**
- Housekeeping completes cleaning → Room becomes **Available**

This workflow ensures room availability remains accurate in real time.

---

# Housekeeping Integration

Housekeeping staff can view assigned rooms directly from the Housekeeping module.

When a cleaning task is completed:

```
Housekeeping

↓

Mark Complete

↓

Room Status

↓

Available
```

The system updates room availability automatically.

---

# Analytics Integration

Room data contributes to several business metrics, including:

- Occupancy Rate
- Average Daily Rate (ADR)
- Revenue Per Available Room (RevPAR)
- Room Utilization
- Most Booked Room Types

These metrics are displayed on the Analytics Dashboard.

---

# Notifications

The system automatically generates notifications for events such as:

- Room assigned
- Room status changed
- Maintenance requested
- Room returned to service

Notifications help departments stay synchronized.

---

# Audit Logging

Every important action performed within the Rooms module is recorded.

Examples include:

- Room Created
- Room Updated
- Room Deleted
- Status Changed
- Image Uploaded

Audit logs include:

- User
- Date & Time
- Action
- Hotel
- IP Address

This ensures accountability and traceability.

---

# Best Practices

To maintain accurate hotel operations:

- Use unique room numbers.
- Assign the correct room type before publishing.
- Keep pricing current.
- Upload high-quality images.
- Update room status immediately after operational changes.
- Avoid deleting rooms with historical reservations.
- Review maintenance rooms regularly.

---

# Summary

The Rooms module serves as the operational foundation of CMR Hospitality Suite. Accurate room records ensure smooth reservations, housekeeping coordination, occupancy tracking, financial reporting, and guest satisfaction.

Proper management of room information directly impacts hotel efficiency, revenue generation, and the overall guest experience.

# Chapter 6 — Room Types

## Overview

Room Types define the categories of accommodation offered by the hotel. Instead of configuring every room individually, the hotel first creates standardized room types, and then assigns each physical room to one of those types.

This approach ensures consistency in pricing, capacity, amenities, and room classification across the property.

Examples of room types include:

- Standard Room
- Deluxe Room
- Executive Room
- Twin Room
- Family Room
- Suite
- Presidential Suite

Every room in the hotel must belong to a room type.

---

# Who Uses This Module?

| Role | Access |
|-------|---------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Receptionist | View Only |
| Housekeeping | No Access |
| Finance Officer | View Only |
| Event Manager | No Access |
| Super Admin | Full Access |

Permissions Required:

- rooms.view
- rooms.create
- rooms.update
- rooms.delete

---

# Why Room Types Matter

Room Types provide a standardized way to manage hotel inventory.

Instead of manually configuring every room, administrators define a room category once and assign multiple rooms to it.

Benefits include:

- Consistent pricing
- Easier reservation management
- Simplified reporting
- Better occupancy analysis
- Faster room creation
- Improved guest booking experience

---

# Dashboard Overview

Navigate to:

```
Dashboard
    ↓
Rooms
    ↓
Room Types
```

The Room Types page displays all configured room categories.

Each card or row typically includes:

- Room Type Name
- Description
- Base Price
- Capacity
- Number of Rooms
- Status
- Date Created

---

# Creating a New Room Type

### Step 1

Open:

```
Dashboard

↓

Rooms

↓

Room Types
```

---

### Step 2

Click

```
+ Add Room Type
```

---

### Step 3

Complete the form.

Example:

| Field | Example |
|--------|----------|
| Name | Deluxe Room |
| Description | Spacious room with king-size bed and balcony |
| Base Price | ₦75,000 |
| Capacity | 2 Guests |
| Number of Beds | 1 King Bed |
| Room Size | 35 m² |
| Status | Active |

---

### Step 4

Click

```
Save
```

The new room type becomes available for assigning to rooms.

---

# Editing a Room Type

To update a room category:

1. Open Room Types.
2. Locate the desired room type.
3. Click **Edit**.
4. Update the required information.
5. Save the changes.

Changes are reflected in all future reservations using that room type.

---

# Deleting a Room Type

A room type can only be deleted if no active rooms are assigned to it.

Steps:

1. Open Room Types.
2. Click **Delete**.
3. Confirm the deletion.

If rooms are still linked to the room type, the system prevents deletion and prompts the administrator to reassign those rooms first.

---

# Assigning Rooms to a Room Type

After creating a room type:

1. Navigate to **Rooms**.
2. Create a new room or edit an existing room.
3. Select the appropriate room type.
4. Save.

Example:

```
Room 101

↓

Room Type

↓

Deluxe Room
```

This room now inherits the characteristics of the selected room type.

---

# Room Type Information

Each room type may contain:

- Name
- Description
- Base Price
- Maximum Occupancy
- Bed Configuration
- Room Size
- Available Amenities
- Images (optional)
- Status (Active/Inactive)

This information is used throughout the reservation process and guest booking experience.

---

# Search and Filter

Users can search room types by:

- Name
- Status
- Price Range

Filters help administrators quickly locate specific room categories.

---

# Status Management

Room Types support status control.

### Active

The room type is available for assigning to rooms and accepting reservations.

### Inactive

The room type remains in the system but cannot be selected for new room assignments or bookings.

---

# Best Practices

- Create room types before creating individual rooms.
- Use descriptive names that guests easily understand.
- Keep pricing updated to reflect current rates.
- Avoid creating duplicate room types.
- Deactivate obsolete room types instead of deleting historical records.

---

# Common Use Cases

### Example 1

A boutique hotel creates:

- Standard Room
- Deluxe Room
- Executive Suite

All new rooms are assigned to one of these categories.

---

### Example 2

A resort introduces a new accommodation category.

The manager:

1. Creates a new room type.
2. Sets pricing and capacity.
3. Assigns newly built rooms.
4. Begins accepting reservations immediately.

---

# Audit Logging

The following activities are automatically recorded:

- Room Type Created
- Room Type Updated
- Room Type Deleted
- Status Changed

Each log entry records:

- User
- Date and Time
- Hotel
- Action Performed
- IP Address (where available)

---

# Troubleshooting

### Unable to Delete a Room Type

**Possible Cause:**
Rooms are still assigned to the room type.

**Solution:**
Reassign or remove all linked rooms before deletion.

---

### Room Type Not Appearing During Room Creation

**Possible Cause:**
The room type is inactive.

**Solution:**
Change its status to **Active**.

---

### Incorrect Pricing

**Possible Cause:**
The base price was updated after existing reservations were created.

**Solution:**
Review pricing settings and update future room rates where appropriate.

---

# Summary

The Room Types module forms the foundation of room management by defining standardized accommodation categories used throughout the platform. Proper configuration ensures consistent pricing, efficient reservation management, accurate reporting, and a seamless booking experience for both staff and guests.

# Chapter 7 — Reservations

## Overview

The **Reservations** module is the heart of CMR Hospitality Suite. It manages the complete guest booking lifecycle, from creating a reservation to check-in, payment tracking, and final check-out.

Every reservation is securely linked to a specific hotel through the platform's multi-tenant architecture, ensuring complete data isolation between different hotels.

---

# Purpose

The Reservations module allows hotel staff to:

- Accept new bookings
- Manage existing reservations
- Assign rooms
- Monitor reservation status
- Process guest check-in
- Process guest check-out
- Track reservation history
- Link payments to bookings
- View reservation details

---

# Who Uses This Module?

| Role | Access |
|-------|---------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Receptionist | Full Access |
| Finance Officer | View Payment Status |
| Housekeeping | View Assigned Rooms Only |
| Event Manager | No Access |
| Super Admin | Platform Administration Only |

Access is controlled through Role-Based Access Control (RBAC).

---

# Reservation Dashboard

The Reservations page provides an overview of all hotel bookings.

Users can:

- View all reservations
- Search reservations
- Filter reservations
- Create new reservations
- Edit reservations
- Cancel reservations
- Check guests in
- Check guests out
- View payment status

---

# Reservation Status

Each reservation belongs to one of the following statuses:

### Pending

Reservation has been created but payment or confirmation is still pending.

---

### Confirmed

The reservation has been confirmed and the room has been reserved.

---

### Checked In

The guest has arrived and occupied the assigned room.

---

### Checked Out

The guest has completed their stay and left the hotel.

---

### Cancelled

The reservation has been cancelled.

Cancelled reservations remain in the system for reporting and audit purposes.

---

# Reservation Information

Every reservation contains:

- Reservation Number
- Guest
- Room
- Room Type
- Check-in Date
- Check-out Date
- Number of Guests
- Reservation Status
- Payment Status
- Booking Source
- Special Requests
- Assigned Staff
- Date Created
- Last Updated

---

# Creating a Reservation

Only users with reservation creation permission can create bookings.

### Step 1

Open the Dashboard.

Navigate to:

```
Reservations
```

---

### Step 2

Click:

```
New Reservation
```

---

### Step 3

Select an existing guest or create a new guest profile.

Required information includes:

- Full Name
- Email Address
- Phone Number

Additional information may include:

- Nationality
- Identification Number
- Address

---

### Step 4

Select the room.

The system displays only rooms that are currently available for the selected dates.

Unavailable rooms cannot be booked.

---

### Step 5

Choose:

- Check-in Date
- Check-out Date

The system automatically calculates:

- Number of Nights
- Estimated Charges

---

### Step 6

Enter booking information.

Examples include:

- Number of Adults
- Number of Children
- Special Requests
- Arrival Time
- Booking Notes

---

### Step 7

Select payment option.

Supported methods include:

- Paystack
- Cash
- Bank Transfer
- POS

Payment may be completed immediately or later depending on hotel policy.

---

### Step 8

Click:

```
Create Reservation
```

The system will:

- Save the reservation
- Reserve the room
- Generate a reservation reference
- Record an audit log
- Send a confirmation email (if enabled)

---

# Editing a Reservation

Users with update permission can modify reservations.

Editable fields include:

- Check-in Date
- Check-out Date
- Assigned Room
- Guest Information
- Notes
- Booking Status

Every modification is recorded in the Audit Log.

---

# Searching Reservations

Reservations can be searched using:

- Reservation Number
- Guest Name
- Email
- Phone Number
- Room Number

Search results update instantly.

---

# Filtering Reservations

Available filters include:

- Date Range
- Reservation Status
- Payment Status
- Room Type
- Assigned Room
- Booking Source

Filters help staff locate bookings quickly.

---

# Check-In Process

When a guest arrives:

### Step 1

Locate the reservation.

---

### Step 2

Verify:

- Guest Identity
- Reservation Details
- Payment Status

---

### Step 3

Click:

```
Check In
```

The system automatically:

- Updates reservation status
- Marks room as occupied
- Records check-in time
- Creates an audit log

---

# Check-Out Process

When a guest departs:

### Step 1

Open the reservation.

---

### Step 2

Confirm:

- Outstanding Payments
- Room Condition
- Additional Charges

---

### Step 3

Click:

```
Check Out
```

The system automatically:

- Updates reservation status
- Releases the room
- Marks room available
- Records check-out time
- Updates occupancy statistics
- Creates an audit log

---

# Cancelling a Reservation

Reservations may be cancelled before check-in.

To cancel:

1. Open reservation.
2. Click **Cancel Reservation**.
3. Select cancellation reason.
4. Confirm action.

Cancelled reservations remain available for reporting purposes.

---

# Payment Integration

Reservations integrate directly with the Payments module.

Users can:

- View payment status
- Initialize Paystack payment
- Verify payment
- View invoices
- Process refunds (authorized users only)

Payment status updates automatically after successful verification.

---

# Reservation Notifications

Depending on system configuration, the platform may send:

- Booking Confirmation
- Payment Confirmation
- Check-in Reminder
- Check-out Reminder
- Reservation Cancellation Notice

Notifications can be delivered through:

- Email
- In-App Notifications

Future releases will support:

- WhatsApp
- SMS (Termii)

---

# Reservation Reports

Reservation data contributes to:

- Daily Occupancy Report
- Revenue Report
- Booking Trends
- Guest History
- Cancellation Report
- Check-in/Check-out Report

These reports are available in the Reports module.

---

# Security

The Reservations module implements enterprise-grade security.

Features include:

- JWT Authentication
- RBAC Authorization
- Multi-Tenant Isolation
- Audit Logging
- Input Validation
- Rate Limiting

Users cannot access reservations belonging to another hotel.

---

# Best Practices

To maintain accurate reservation records:

- Verify guest information before saving.
- Confirm payment before check-in where required.
- Assign rooms only after availability is confirmed.
- Record special guest requests.
- Avoid deleting reservations; cancel them instead.
- Review daily arrivals and departures each morning.

---

# Module Summary

The Reservations module enables hotels to manage the complete booking lifecycle securely and efficiently. By integrating guest management, room availability, payments, notifications, analytics, and audit logging, it serves as the operational core of CMR Hospitality Suite.

# Chapter 8 — Guest Management

## Overview

The **Guest Management** module serves as the central repository for all guest information within CMR Hospitality Suite. It enables hotel staff to create, maintain, and retrieve guest records efficiently while preserving a complete history of each guest's interactions with the hotel.

Every reservation is linked to a guest profile, ensuring accurate record-keeping, personalized service, and operational continuity.

---

# Purpose

The Guest Management module allows hotels to:

- Maintain a centralized guest database
- Record guest personal information
- Track previous and current stays
- Identify returning guests
- Flag VIP guests
- Store guest notes and preferences
- Improve customer service through historical data

---

# Primary Users

| Role | Access Level |
|-------|-------------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Receptionist | Create, View, Update |
| Finance Officer | View Only |
| Housekeeping | No Access |
| Event Manager | View (Optional) |
| Super Admin | Platform Support Only |

Access is controlled through Role-Based Access Control (RBAC).

---

# Dashboard Overview

The Guest Management page provides:

- Total Guests
- Returning Guests
- VIP Guests
- Recently Added Guests
- Search & Filter
- Guest Details Table

---

# Guest Information

Each guest profile contains essential information required for hotel operations.

## Personal Information

- Full Name
- Email Address
- Phone Number
- Nationality
- Gender
- Date of Birth (Optional)

---

## Identification

The hotel may optionally store:

- National ID
- Passport Number
- Driver's License Number

These fields depend on hotel policy and local regulations.

---

## Address Information

- Country
- State
- City
- Residential Address

---

## Stay Information

Each guest record includes:

- Total Reservations
- Active Reservation
- Previous Stays
- Total Nights Stayed
- Last Check-in
- Last Check-out

---

# Guest Status

Guests may have one of the following statuses:

| Status | Description |
|----------|-------------|
| Active | Guest currently has an account in the system |
| Checked In | Guest is currently staying at the hotel |
| Checked Out | Guest has completed their stay |
| Returning | Guest has stayed previously |
| VIP | High-value or preferred guest |
| Blacklisted | Restricted from future bookings |

---

# Creating a New Guest

## Step 1

Navigate to:

Dashboard → Guests

---

## Step 2

Click

**New Guest**

---

## Step 3

Complete the required information.

Required fields include:

- Full Name
- Email Address
- Phone Number

Optional fields include:

- Address
- Nationality
- Date of Birth
- Identification
- Notes

---

## Step 4

Click

**Save Guest**

The system validates the information and creates the guest profile.

---

# Viewing Guest Details

Selecting a guest opens their complete profile.

Information displayed includes:

- Personal Details
- Reservation History
- Payment History
- Notes
- Guest Status
- Contact Information

---

# Updating Guest Information

Guest information can be updated whenever necessary.

Editable fields include:

- Name
- Email
- Phone Number
- Address
- Nationality
- Notes
- VIP Status

Historical reservation data cannot be modified from this page.

---

# Guest Search

The search bar allows staff to locate guests quickly using:

- Name
- Email Address
- Phone Number
- Reservation Number

Search results update automatically.

---

# Filters

Guests can be filtered by:

- VIP Guests
- Returning Guests
- Currently Checked-In
- Checked-Out
- Recently Added

---

# Guest History

Every guest profile maintains a complete history including:

- Previous Reservations
- Room Numbers
- Payment History
- Check-in Dates
- Check-out Dates
- Booking Frequency

This helps staff provide personalized service.

---

# VIP Guests

VIP guests can be identified within the system.

Benefits include:

- Priority Service
- Personalized Experience
- Loyalty Recognition
- Faster Identification

VIP status is assigned manually by authorized staff.

---

# Guest Notes

Staff may record internal notes such as:

- Room Preferences
- Dietary Requirements
- Special Requests
- Anniversary Visits
- Complaints
- Positive Feedback

These notes assist future interactions and improve guest satisfaction.

---

# Reservation Integration

Every reservation is automatically linked to a guest profile.

This prevents duplicate guest records and maintains accurate stay histories.

If an existing guest makes another booking, the reservation is attached to their existing profile.

---

# Payment Integration

Guest profiles display associated payment records including:

- Payment Status
- Amount Paid
- Outstanding Balance
- Refund History

Payments remain read-only within this module.

---

# Security

Guest information is protected through:

- JWT Authentication
- Role-Based Access Control
- Hotel-Level Data Isolation
- Audit Logging

Users can only access guest records belonging to their assigned hotel.

---

# Best Practices

- Always search for an existing guest before creating a new profile.
- Verify guest contact information during check-in.
- Record important preferences and notes for future visits.
- Assign VIP status only when authorized.
- Keep guest information accurate and up to date.

---

# Common Workflow

```text
Guest Arrives
        │
        ▼
Search Existing Guest
        │
        ├──────────────┐
        │              │
Found             Not Found
        │              │
        ▼              ▼
Use Existing     Create New Guest
Profile           Profile
        │              │
        └──────┬───────┘
               ▼
Create Reservation
               ▼
Check-in Guest
               ▼
Update Stay History
               ▼
Check-out
```

---

# Permissions

| Permission | Description |
|------------|-------------|
| guests.view | View guest records |
| guests.create | Create new guest profiles |
| guests.update | Modify guest information |

---

# Related Modules

The Guest Management module integrates with:

- Reservations
- Payments
- CRM
- Analytics
- Reports
- AI Concierge
- Audit Logs

---

# Summary

The Guest Management module provides a secure and centralized system for maintaining guest records throughout the guest lifecycle. By consolidating guest information, reservation history, payment records, and operational notes, it enables hotels to deliver consistent, personalized service while maintaining accurate records and supporting data-driven decision-making.

# Chapter 9 — Payments

## Overview

The **Payments** module is responsible for managing all financial transactions within the hotel. It allows authorized users to record, verify, track, and refund payments while maintaining a complete financial history for reservations.

The module integrates with **Paystack** for secure online payment processing and supports manual payment recording where applicable.

---

# Purpose

The Payments module helps hotels:

- Process guest payments securely
- Verify completed transactions
- Track outstanding balances
- Generate payment records
- Maintain financial transparency
- Reduce payment disputes
- Support audit and reporting requirements

---

# Primary Users

| Role | Access Level |
|-------|--------------|
| Hotel Owner | Full Access |
| Finance Officer | Full Access |
| Receptionist | Limited Access |
| Manager | View & Monitor |
| Super Admin | Read-only (Platform Support) |

---

# Permissions Required

The following permissions control access to the Payments module:

- `payments.view`
- `payments.create`
- `payments.refund`

Only users with the appropriate permissions can perform payment-related actions.

---

# Dashboard Overview

The Payments page provides a centralized view of all financial transactions.

Users can:

- View all payments
- Search payments
- Filter by status
- Verify payment status
- Process refunds
- View payment details
- Access transaction history

---

# Payment Information

Each payment record includes:

- Transaction ID
- Reservation Reference
- Guest Name
- Room Number
- Payment Amount
- Payment Method
- Payment Status
- Payment Date
- Processed By
- Paystack Reference

---

# Payment Status

Each payment can have one of the following statuses:

| Status | Description |
|----------|-------------|
| Pending | Payment has been initiated but not completed |
| Successful | Payment has been verified successfully |
| Failed | Payment attempt failed |
| Refunded | Payment has been refunded |
| Cancelled | Payment was cancelled before completion |

---

# Supported Payment Methods

CMR Hospitality Suite supports:

- Paystack Online Payments
- Bank Transfer
- Cash
- POS/Card Payment

Additional payment gateways may be added in future releases.

---

# Creating a Payment

### Step 1

Navigate to:

```
Dashboard → Payments
```

---

### Step 2

Click:

```
New Payment
```

---

### Step 3

Select the reservation associated with the payment.

The system automatically retrieves:

- Guest information
- Room information
- Outstanding balance

---

### Step 4

Choose the payment method.

Example:

- Paystack
- Cash
- Bank Transfer
- POS

---

### Step 5

Enter the payment amount.

The system validates:

- Amount
- Reservation
- Outstanding balance

---

### Step 6

Submit the payment.

If using Paystack, the customer is redirected to complete payment securely.

---

# Paystack Payment Flow

```
Reservation

↓

Initialize Payment

↓

Redirect to Paystack

↓

Customer Completes Payment

↓

Paystack Verification

↓

Webhook Received

↓

Payment Verified

↓

Reservation Updated

↓

Confirmation Email Sent
```

---

# Payment Verification

Every online payment is verified by the backend before being marked as successful.

Verification includes:

- Transaction reference
- Amount
- Currency
- Payment status
- Paystack response

Payments are **never** confirmed solely from frontend responses.

---

# Refunding a Payment

Authorized users may issue refunds.

### Steps

1. Open the payment record
2. Click **Refund**
3. Confirm refund request
4. Backend verifies eligibility
5. Refund is processed
6. Audit log is created

Only users with the appropriate permission can issue refunds.

---

# Searching Payments

Users can search payments using:

- Guest Name
- Reservation Number
- Transaction Reference
- Payment Method

---

# Filtering Payments

Available filters include:

- Date Range
- Payment Status
- Payment Method
- Staff Member
- Reservation

---

# Payment Details

Selecting a payment displays:

- Guest Information
- Reservation Details
- Room Information
- Payment Timeline
- Transaction Reference
- Processing Staff
- Audit History

---

# Receipts

Successful payments generate a receipt containing:

- Hotel Name
- Guest Name
- Reservation Number
- Amount Paid
- Payment Method
- Transaction Reference
- Payment Date

Receipts can be viewed, downloaded, or emailed to guests.

---

# Security

The Payments module includes several security measures:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Paystack Verification
- Backend Validation
- Audit Logging
- Rate Limiting

Sensitive payment credentials are never exposed to the frontend.

---

# Audit Logging

Every payment action is recorded.

Examples include:

- Payment Created
- Payment Verified
- Payment Refunded
- Payment Updated

Each audit record contains:

- User
- Timestamp
- Action
- Hotel
- IP Address (if enabled)

---

# Best Practices

- Verify payments before checking in guests.
- Record manual payments immediately.
- Review failed transactions daily.
- Issue refunds only when authorized.
- Reconcile payment records regularly.
- Monitor payment reports for discrepancies.

---

# Troubleshooting

### Payment remains pending

Possible causes:

- Customer abandoned payment
- Webhook delay
- Network interruption

Verify the transaction using the Paystack reference before taking further action.

---

### Payment verification failed

Possible causes:

- Incorrect transaction reference
- Payment not completed
- Gateway communication error

Attempt verification again or contact support if the issue persists.

---

### Refund unavailable

Possible causes:

- Insufficient permissions
- Transaction already refunded
- Refund window expired

Contact the Hotel Owner or Finance Officer for assistance.

---

# Summary

The Payments module provides a secure and centralized system for managing hotel finances. Through integration with Paystack, robust backend verification, audit logging, and role-based permissions, it ensures that every transaction is accurately recorded, traceable, and protected against unauthorized access.

# Chapter 10 — Staff Management

## Overview

The **Staff Management** module enables hotel administrators to manage employees, assign system roles, organize departments, and control access to the platform through Role-Based Access Control (RBAC).

It serves as the central location for managing all hotel personnel, ensuring that each employee has the appropriate permissions to perform their responsibilities.

---

# Purpose

The Staff Management module helps hotels to:

- Maintain an organized employee directory
- Assign departments and job roles
- Control user access through RBAC
- Monitor staff status
- Improve operational accountability
- Support secure multi-user collaboration

---

# Who Can Access

| Role | Access Level |
|--------|-------------|
| Super Admin | Full Access |
| Hotel Owner | Full Access |
| Manager | Create, Update, View |
| Receptionist | No Access |
| Finance | View Only (Optional) |
| Housekeeping | No Access |
| Event Manager | No Access |

> Access depends on the permissions assigned by the Hotel Owner or Super Admin.

---

# Staff Dashboard

The Staff page provides an overview of all employees within the hotel.

Displayed information includes:

- Total Staff
- Active Staff
- Inactive Staff
- Department Distribution
- Assigned Roles
- Recently Added Employees

---

# Staff List

The main table displays all registered employees.

Each row contains:

- Profile Photo (optional)
- Full Name
- Staff ID
- Email Address
- Phone Number
- Department
- Position
- Assigned Role
- Employment Status
- Date Joined
- Available Actions

---

# Creating a New Staff Member

To register a new employee:

1. Navigate to **Dashboard → Staff**
2. Click **Add Staff**
3. Complete the required information
4. Assign a department
5. Assign a system role
6. Save the record

The employee is immediately added to the hotel's staff directory.

---

# Staff Information

Each employee profile may include:

## Personal Information

- Full Name
- Email Address
- Phone Number
- Gender
- Date of Birth
- Residential Address
- Emergency Contact

---

## Employment Information

- Staff ID
- Department
- Position
- Employment Type
- Date Joined
- Employment Status

---

## System Information

- User Account
- Assigned Role
- Permissions
- Last Login
- Account Status

---

# Departments

Staff can be assigned to departments such as:

- Front Desk
- Housekeeping
- Finance
- Administration
- Security
- Maintenance
- Restaurant
- Event Management
- Customer Service

Hotels may create additional departments if required.

---

# Roles

Every employee must have an assigned system role.

Example roles include:

- Hotel Owner
- General Manager
- Receptionist
- Finance Officer
- Housekeeping Staff
- Event Manager

The assigned role determines which modules the employee can access.

---

# Employment Status

Each staff member has one of the following statuses:

- Active
- On Leave
- Suspended
- Resigned
- Terminated

Inactive employees cannot access the system.

---

# Editing Staff Information

Authorized users may update:

- Contact information
- Department
- Position
- Role
- Status
- Profile Photo

All changes are automatically recorded in the Audit Log.

---

# Assigning Roles

To assign or change a role:

1. Open the employee profile.
2. Select **Edit Role**.
3. Choose the appropriate role.
4. Save the changes.

The employee's permissions are updated immediately.

---

# Activating or Deactivating Staff

Administrators may activate or deactivate staff accounts.

### Active

The employee can access the system.

### Inactive

The employee cannot log in until reactivated.

---

# Searching Staff

The search function allows administrators to locate employees by:

- Name
- Staff ID
- Department
- Position
- Role
- Email Address

---

# Filtering Staff

Available filters include:

- Department
- Role
- Status
- Employment Type
- Date Joined

---

# Staff Actions

Depending on permissions, available actions include:

- View Profile
- Edit Staff
- Assign Role
- Reset Password
- Activate Account
- Deactivate Account
- Delete Staff Record

Deletion is restricted to authorized administrators.

---

# Audit Logging

Every staff-related action is automatically recorded.

Examples include:

- Staff created
- Staff updated
- Role changed
- Account activated
- Account deactivated
- Staff deleted

Audit logs include:

- User performing the action
- Timestamp
- Hotel ID
- IP Address
- Action performed

---

# Best Practices

To maintain a secure environment:

- Assign the minimum permissions required for each employee.
- Remove inactive staff promptly.
- Review staff roles regularly.
- Avoid sharing user accounts.
- Use strong passwords.
- Enable email verification for all staff accounts.

---

# Troubleshooting

## Staff cannot log in

Possible causes:

- Incorrect email or password
- Email not verified
- Account deactivated
- Assigned role removed

---

## Staff cannot access a page

Possible causes:

- Missing permission
- Incorrect role assignment
- Session expired

Contact the Hotel Owner or Super Admin to review the assigned permissions.

---

# Summary

The Staff Management module centralizes employee administration, ensuring that every member of the hotel team has the appropriate access level and responsibilities.

Combined with Role-Based Access Control (RBAC) and Audit Logs, it provides a secure foundation for managing hotel personnel while maintaining accountability across the platform.

# Chapter 11 — Housekeeping

## Overview

The **Housekeeping** module is responsible for managing the cleaning, preparation, inspection, and maintenance status of guest rooms.

It enables housekeeping staff and supervisors to efficiently assign tasks, monitor progress, and ensure rooms are ready for occupancy. By digitizing housekeeping operations, the hotel reduces communication delays between departments and improves room turnaround time.

---

# Purpose

The Housekeeping module helps hotels to:

- Assign cleaning tasks to staff.
- Track room cleaning progress.
- Monitor room availability.
- Report maintenance issues.
- Improve communication between Reception and Housekeeping.
- Prepare rooms quickly for incoming guests.

---

# Who Uses This Module?

| Role | Access Level |
|-------|-------------|
| Super Admin | View (Platform Monitoring) |
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Housekeeping Supervisor | Full Access |
| Housekeeping Staff | Assigned Tasks Only |
| Receptionist | View Room Status Only |
| Finance Officer | No Access |
| Event Manager | No Access |

Access is controlled through the **Role-Based Access Control (RBAC)** system.

---

# Dashboard Overview

The Housekeeping dashboard provides a real-time overview of all housekeeping operations.

### Summary Cards

The dashboard displays key operational metrics such as:

- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Rooms Awaiting Inspection
- Rooms Under Maintenance

These statistics help supervisors monitor productivity and prioritize work.

---

# Task Status

Each housekeeping task progresses through one of the following statuses:

| Status | Description |
|---------|-------------|
| Pending | Task has been created but not started. |
| In Progress | Staff member is currently cleaning the room. |
| Completed | Cleaning has been completed. |
| Inspected | Supervisor has inspected and approved the room. |
| Maintenance Required | Cleaning completed but maintenance issue reported. |

---

# Creating a Housekeeping Task

Managers or supervisors can assign a cleaning task whenever:

- A guest checks out.
- A room requires routine cleaning.
- A room needs deep cleaning.
- A guest requests housekeeping.
- Maintenance work has been completed.

### Steps

1. Open **Housekeeping**.
2. Click **Assign Task**.
3. Select the room.
4. Choose the assigned staff member.
5. Set the task priority.
6. Add optional notes.
7. Click **Create Task**.

The assigned staff member immediately sees the new task.

---

# Task Priorities

Tasks can be prioritized according to operational urgency.

| Priority | Typical Use |
|----------|-------------|
| Low | Routine cleaning |
| Medium | Daily housekeeping |
| High | Incoming guest waiting |
| Critical | VIP room or emergency cleaning |

Priority helps supervisors organize workloads efficiently.

---

# Completing a Task

After cleaning a room:

1. Open the assigned task.
2. Confirm the room has been cleaned.
3. Add any notes if necessary.
4. Report maintenance issues if discovered.
5. Click **Mark as Completed**.

The room status is updated accordingly.

---

# Reporting Maintenance Issues

Housekeeping staff can report maintenance problems directly from a task.

Examples include:

- Broken air conditioner
- Plumbing leak
- Electrical fault
- Damaged furniture
- Broken television
- Faulty door lock
- Water heater malfunction

Once reported, the issue is logged for management review and maintenance scheduling.

---

# Room Status

The module synchronizes room availability across the platform.

Possible room statuses include:

- Available
- Occupied
- Dirty
- Cleaning in Progress
- Clean
- Under Inspection
- Maintenance
- Out of Service

Receptionists can immediately see whether a room is ready for the next guest.

---

# Task Assignment

Housekeeping supervisors can assign tasks based on:

- Staff availability
- Workload
- Floor assignment
- Building wing
- Shift schedule
- Room priority

Balanced task assignment improves operational efficiency.

---

# Filters

Users can filter housekeeping tasks by:

- Status
- Assigned Staff
- Room Number
- Priority
- Date
- Floor
- Building Wing

These filters help supervisors locate tasks quickly.

---

# Search

The search functionality allows users to locate tasks using:

- Room Number
- Staff Name
- Task ID

---

# Activity Timeline

Each housekeeping task records a complete activity history.

Example:

```
09:05 AM
Task Created

09:10 AM
Assigned to Sarah

09:20 AM
Cleaning Started

09:45 AM
Cleaning Completed

09:50 AM
Room Approved

09:52 AM
Room Available
```

The activity timeline improves accountability and operational transparency.

---

# Notifications

The system automatically sends notifications when:

- A task is assigned.
- A task is completed.
- A room becomes available.
- Maintenance is reported.
- A high-priority task is created.

Notifications appear within the application and may also be delivered via email or future WhatsApp/SMS integrations.

---

# Audit Logging

Every significant housekeeping action is recorded.

Examples include:

- Task Created
- Task Assigned
- Task Updated
- Task Completed
- Maintenance Reported
- Inspection Approved

Audit logs support operational accountability and security.

---

# Best Practices

To maximize efficiency:

- Assign tasks immediately after guest checkout.
- Prioritize rooms with incoming reservations.
- Ensure maintenance issues are reported promptly.
- Review pending tasks regularly.
- Inspect completed rooms before releasing them for occupancy.
- Keep task notes clear and concise.

---

# Permissions

| Action | Housekeeping Staff | Supervisor | Manager | Owner |
|---------|-------------------|------------|---------|-------|
| View Assigned Tasks | ✅ | ✅ | ✅ | ✅ |
| Update Task Status | ✅ | ✅ | ✅ | ✅ |
| Create Tasks | ❌ | ✅ | ✅ | ✅ |
| Assign Tasks | ❌ | ✅ | ✅ | ✅ |
| Approve Completed Tasks | ❌ | ✅ | ✅ | ✅ |
| Delete Tasks | ❌ | ❌ | ✅ | ✅ |
| View Reports | ❌ | ✅ | ✅ | ✅ |

---

# Summary

The Housekeeping module streamlines room cleaning operations by enabling task assignment, real-time progress tracking, maintenance reporting, and room status synchronization. Integrated with Reservations, Rooms, and Audit Logs, it ensures efficient collaboration between departments while helping maintain high standards of cleanliness and guest satisfaction.

# Chapter 12 — Event Halls

## Overview

The **Event Halls** module enables hotels to manage conference halls, banquet halls, meeting rooms, wedding venues, and other rentable event spaces from a centralized dashboard.

This module allows staff to create event halls, define capacities and pricing, monitor availability, and manage customer bookings without scheduling conflicts.

---

# Who Uses This Module?

| Role | Access |
|-------|--------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Event Manager | Full Access |
| Receptionist | Create & Manage Bookings |
| Finance Officer | View Payment Information |
| Housekeeping | View Upcoming Events (Optional) |

---

# Main Objectives

The Event Halls module helps your hotel to:

- Organize all available event halls
- Prevent double bookings
- Track upcoming events
- Manage customer bookings
- Monitor hall availability
- Record event payments
- Improve event scheduling efficiency

---

# Dashboard Overview

The Event Halls page is divided into two primary sections:

## 1. Event Halls

Displays all halls registered in the hotel.

Each hall includes:

- Hall Name
- Capacity
- Daily Rental Price
- Status
- Availability
- Description

---

## 2. Bookings

Displays all event bookings.

Each booking contains:

- Customer Name
- Event Name
- Hall
- Event Date
- Start Time
- End Time
- Payment Status
- Booking Status

---

# Creating an Event Hall

Only users with appropriate permissions can create event halls.

### Steps

1. Navigate to **Dashboard → Event Halls**
2. Select the **Event Halls** tab.
3. Click **Add Event Hall**.
4. Complete the required information.
5. Save the hall.

---

## Required Information

Typical information includes:

- Hall Name
- Hall Type
- Maximum Capacity
- Rental Price
- Description
- Available Facilities
- Status

---

## Example

| Field | Value |
|--------|-------|
| Hall Name | Royal Ballroom |
| Capacity | 300 Guests |
| Price | ₦450,000 |
| Status | Available |

---

# Editing an Event Hall

To update hall information:

1. Locate the hall.
2. Click **Edit**.
3. Modify the required details.
4. Save changes.

Changes take effect immediately.

---

# Hall Status

Each hall can have one of the following statuses.

| Status | Description |
|----------|-------------|
| Available | Ready for booking |
| Booked | Reserved for an event |
| Maintenance | Temporarily unavailable |
| Closed | Not available for use |

---

# Creating an Event Booking

Bookings are managed under the **Bookings** tab.

### Steps

1. Open **Dashboard → Event Halls**
2. Select **Bookings**
3. Click **New Booking**
4. Complete customer information
5. Select the hall
6. Choose the event date
7. Select start and end times
8. Save the booking

The system automatically checks hall availability before confirming the booking.

---

# Booking Information

Each booking stores:

- Customer Name
- Contact Information
- Event Title
- Event Type
- Hall
- Event Date
- Start Time
- End Time
- Number of Guests
- Booking Status
- Payment Status
- Notes

---

# Booking Status

Bookings progress through several stages.

| Status | Meaning |
|----------|----------|
| Pending | Awaiting confirmation |
| Confirmed | Successfully booked |
| Completed | Event concluded |
| Cancelled | Booking cancelled |

---

# Payment Status

Payments are tracked independently.

| Status | Meaning |
|----------|----------|
| Unpaid | Payment not received |
| Partially Paid | Deposit received |
| Paid | Fully settled |
| Refunded | Payment refunded |

---

# Preventing Double Bookings

The system prevents scheduling conflicts by checking:

- Hall availability
- Event date
- Start time
- End time

If a conflict exists, the booking cannot be saved until the issue is resolved.

---

# Searching Bookings

Users can quickly locate bookings using filters.

Available filters include:

- Customer Name
- Event Date
- Hall
- Booking Status
- Payment Status

---

# Viewing Booking Details

Selecting a booking displays:

- Customer profile
- Event information
- Assigned hall
- Payment history
- Booking timeline
- Internal notes

---

# Editing a Booking

Authorized users may update:

- Event date
- Hall assignment
- Guest count
- Event details
- Booking notes
- Payment information

Changes are automatically recorded in the Audit Log.

---

# Cancelling a Booking

To cancel:

1. Open the booking.
2. Click **Cancel Booking**.
3. Confirm the cancellation.

The hall immediately becomes available for future bookings.

Cancellation actions are recorded in the audit logs.

---

# Event Hall Analytics

Managers can monitor:

- Most booked halls
- Monthly bookings
- Revenue generated
- Hall utilization rate
- Upcoming events
- Peak booking periods

These insights help optimize pricing, scheduling, and resource allocation.

---

# Permissions

| Role | Permissions |
|-------|-------------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Event Manager | Full Access |
| Receptionist | Create & Update Bookings |
| Finance Officer | View Payment Details |
| Housekeeping | View Assigned Events (Optional) |

---

# Best Practices

- Keep hall details accurate and up to date.
- Confirm payments before marking bookings as confirmed.
- Review hall availability before creating bookings.
- Avoid manual scheduling outside the system.
- Record cancellations immediately.
- Regularly review upcoming events to prepare staff and facilities.

---

# Troubleshooting

## Booking cannot be created

Possible causes:

- Hall already booked.
- Required information is missing.
- User lacks permission.
- Selected date or time is invalid.

---

## Hall not appearing

Possible causes:

- Hall is inactive.
- Hall is under maintenance.
- Hall has been removed.

---

## Payment not updating

Verify:

- Payment was successfully processed.
- Paystack verification completed.
- Booking record exists.
- Payment webhook executed successfully.

---

# Summary

The Event Halls module enables hotels to efficiently manage rentable event spaces, schedule bookings, monitor availability, prevent conflicts, and track payments from a centralized interface. Combined with audit logging, payment integration, and role-based access control, it provides a secure and reliable workflow for managing conferences, weddings, meetings, and other events.

# Chapter 13 — Customer Relationship Management (CRM)

## Overview

The **Customer Relationship Management (CRM)** module enables hotels to build long-term relationships with guests by maintaining a centralized customer database, tracking interactions, identifying VIP guests, and supporting personalized guest experiences.

Rather than treating every stay as a separate transaction, the CRM module helps the hotel understand guest preferences, improve service quality, and encourage repeat business.

---

# Purpose

The CRM module is designed to:

- Maintain a complete guest relationship history
- Improve customer retention
- Identify high-value guests
- Record interactions with guests
- Support personalized hospitality
- Assist marketing and guest engagement initiatives

---

# Who Uses This Module?

| Role | Access Level |
|-------|--------------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Marketing Team | Full Access |
| Receptionist | View & Update Customer Records |
| Finance Officer | Read Only |
| Housekeeping | No Access |
| Event Manager | Limited Access |
| Super Admin | Full Access |

Access is controlled through **Role-Based Access Control (RBAC)**.

---

# CRM Dashboard

The CRM dashboard provides a high-level overview of guest relationships.

Displayed information includes:

- Total Guests
- Returning Guests
- VIP Guests
- New Guests This Month
- Guest Satisfaction Metrics *(Future)*
- Recent Customer Interactions
- Guest Segments
- Upcoming Birthdays *(Future)*
- Loyalty Overview *(Future)*

---

# Customer Directory

The Customer Directory stores all registered guests.

Each customer profile contains:

- Full Name
- Email Address
- Phone Number
- Gender
- Nationality
- Residential Address
- Identification Type
- Identification Number
- Guest Status
- Registration Date
- Last Visit
- Total Stays

The directory can be searched using:

- Name
- Email
- Phone Number
- Guest ID

---

# Guest Profile

Each guest has a dedicated profile containing their complete relationship history with the hotel.

The profile includes:

## Personal Information

- Full Name
- Contact Details
- Nationality
- Address
- Identification

---

## Reservation History

Displays all previous and upcoming reservations.

Information includes:

- Reservation Number
- Check-in Date
- Check-out Date
- Room Number
- Booking Status
- Payment Status

---

## Payment History

Displays:

- Amount Paid
- Outstanding Balance
- Payment Method
- Refund History

---

## Stay History

Records:

- Number of Visits
- Total Nights Stayed
- Average Stay Duration
- Preferred Room Type

---

## Preferences

The hotel may record guest preferences, such as:

- Preferred Room
- Smoking / Non-Smoking
- Floor Preference
- Bed Type
- Dietary Requirements
- Accessibility Requirements
- Special Requests

These preferences help staff provide personalized service during future visits.

---

# Customer Segmentation

Guests can be organized into different customer groups.

Example segments include:

- VIP Guests
- Returning Guests
- Corporate Clients
- Walk-in Guests
- Online Booking Guests
- Long-Term Guests
- High-Value Guests

Segmentation allows hotels to better understand their customer base and prepare targeted engagement strategies.

---

# VIP Guests

High-value customers can be marked as **VIP**.

VIP guests may receive:

- Priority Check-in
- Preferred Rooms
- Complimentary Services
- Personalized Assistance
- Exclusive Offers

The VIP badge is visible throughout the platform to help staff recognize important guests.

---

# Interaction History

Every meaningful interaction with a guest can be recorded.

Examples include:

- Phone Calls
- Emails
- Complaints
- Compliments
- Service Requests
- Follow-ups
- General Notes

Each interaction includes:

- Date
- Staff Member
- Interaction Type
- Description

This provides context for future engagements and helps ensure consistent service.

---

# Guest Notes

Authorized staff may attach internal notes to a guest profile.

Examples:

- Prefers quiet rooms
- Frequent business traveler
- Allergic to seafood
- Requested late checkout
- Celebrating anniversary

Guest notes are intended for internal operational use only.

---

# Search and Filters

The CRM supports filtering guests by:

- Guest Name
- Email
- Phone Number
- Guest Status
- VIP Status
- Registration Date
- Last Visit
- Number of Stays

This helps staff quickly locate relevant customer records.

---

# Customer Insights

The CRM provides operational insights such as:

- Total Registered Guests
- Returning Guest Percentage
- Average Stay Duration
- Most Frequent Guests
- Highest Spending Guests
- Most Popular Room Type
- Guest Acquisition Trends

These insights support business decision-making and service improvements.

---

# Notifications

CRM-related notifications may include:

- New Guest Registration
- VIP Guest Arrival
- Returning Guest Arrival
- Customer Profile Updated

---

# Security

Guest information is protected using:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-Tenant Data Isolation
- Audit Logging
- Secure Database Storage

Only authorized users may access customer information.

---

# Best Practices

Hotels should:

- Keep guest records accurate and up to date.
- Record meaningful interactions after guest engagements.
- Respect guest privacy and confidentiality.
- Use guest preferences to personalize future stays.
- Regularly review customer segments for operational insights.

---

# Future Enhancements

Planned CRM improvements include:

- Loyalty Program
- Reward Points
- Automated Email Campaigns
- Birthday Greetings
- Anniversary Notifications
- Guest Satisfaction Surveys
- Marketing Automation
- WhatsApp Campaigns
- SMS Promotions
- AI-Powered Customer Insights

---

# Summary

The CRM module serves as the hotel's central repository for guest relationship management.

By maintaining detailed customer profiles, tracking interactions, recording preferences, and providing actionable insights, the CRM helps hotels deliver personalized experiences, improve guest satisfaction, and encourage repeat business while supporting long-term customer retention.

# Chapter 14 — Analytics

## Overview

The **Analytics** module provides a centralized view of your hotel's operational and financial performance. It transforms real-time data into actionable insights, enabling management to monitor occupancy, revenue, reservations, guest trends, and overall business health.

This module is intended to support strategic decision-making by presenting key performance indicators (KPIs), charts, and historical trends.

---

# Who Can Access

| Role | Access Level |
|--------|-------------|
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Finance Officer | Financial Analytics |
| Receptionist | No Access |
| Housekeeping | No Access |
| Event Manager | Limited (Event-related metrics only) |
| Super Admin | Platform-wide Analytics |

Access is controlled through the Role-Based Access Control (RBAC) system.

---

# Analytics Dashboard

Upon opening the Analytics module, users are presented with a comprehensive dashboard containing live metrics and visual reports.

The dashboard is divided into multiple sections:

- Occupancy Overview
- Revenue Performance
- Reservation Statistics
- Guest Insights
- Payment Summary
- Housekeeping Performance
- Event Hall Utilization
- Operational Trends

---

# Occupancy Analytics

This section displays the current occupancy status of the hotel.

### Available Metrics

- Occupancy Rate
- Available Rooms
- Occupied Rooms
- Reserved Rooms
- Rooms Under Maintenance
- Vacant Rooms

### Example

```
Total Rooms:          80

Occupied Rooms:       62

Available Rooms:      15

Maintenance:           3

Occupancy Rate:      77.5%
```

These metrics help management understand room utilization and forecast future availability.

---

# Revenue Analytics

The Revenue section summarizes the hotel's financial performance.

### Available Metrics

- Today's Revenue
- Weekly Revenue
- Monthly Revenue
- Annual Revenue
- Outstanding Payments
- Refunded Payments

Revenue is calculated from successfully completed payment transactions.

---

# Reservation Analytics

Reservation analytics provide insight into booking activity.

### Available Metrics

- Total Reservations
- Active Reservations
- Upcoming Check-ins
- Upcoming Check-outs
- Cancelled Reservations
- Average Booking Value

Management can monitor booking trends and identify peak business periods.

---

# Guest Analytics

The Guest Analytics section provides insights into customer activity.

### Available Metrics

- Total Guests
- Returning Guests
- VIP Guests
- New Guests
- Average Length of Stay
- Most Frequent Guests

These metrics help improve customer retention and service quality.

---

# Payment Analytics

Payment analytics summarize all completed and pending financial transactions.

### Available Metrics

- Successful Payments
- Pending Payments
- Failed Payments
- Refunded Transactions
- Payment Methods
- Average Transaction Value

Supported payment methods include:

- Paystack
- Cash
- Bank Transfer

Additional payment providers may be added in future releases.

---

# Housekeeping Analytics

Managers can monitor housekeeping efficiency through operational statistics.

### Available Metrics

- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Average Cleaning Time
- Staff Performance

This helps supervisors allocate workload more efficiently.

---

# Event Hall Analytics

Hotels offering conference or event facilities can monitor event performance.

### Available Metrics

- Total Bookings
- Upcoming Events
- Revenue from Events
- Hall Utilization Rate
- Most Booked Hall

These metrics assist management in optimizing event scheduling and pricing.

---

# Revenue Charts

Interactive charts provide a visual representation of financial performance.

Available visualizations include:

- Daily Revenue
- Weekly Revenue
- Monthly Revenue
- Annual Revenue

These charts help identify seasonal patterns and growth opportunities.

---

# Reservation Trends

Reservation trends display booking activity over time.

Examples include:

- Daily Bookings
- Weekly Bookings
- Monthly Bookings
- Seasonal Occupancy Trends

This information assists management with forecasting demand and staffing requirements.

---

# Guest Trends

Guest trend reports provide valuable insights into customer behavior.

Available information includes:

- Returning Guest Rate
- Guest Growth
- Average Stay Duration
- Booking Frequency

These reports support customer retention initiatives and marketing strategies.

---

# Top Performing Metrics

The system automatically highlights important business indicators, including:

- Highest Revenue Day
- Most Occupied Period
- Best Performing Room Type
- Most Valuable Guest
- Highest Revenue Event Hall

These insights assist management in identifying successful operational strategies.

---

# Date Filtering

All analytics can be filtered by date.

Available filters include:

- Today
- Yesterday
- Last 7 Days
- Last 30 Days
- Current Month
- Previous Month
- Current Year
- Custom Date Range

Filtering allows management to compare performance across different periods.

---

# Exporting Reports

Users with appropriate permissions can export analytics reports.

Supported export formats include:

- PDF
- Excel (XLSX)
- CSV

Exports preserve the currently selected filters.

---

# Real-Time Data

Analytics are generated using live operational data from:

- Reservations
- Payments
- Guests
- Rooms
- Housekeeping
- Event Bookings

Dashboard statistics automatically update as new information is recorded.

---

# Security

Analytics data is protected through the platform's security architecture.

The system enforces:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-Tenant Data Isolation
- Audit Logging

Users can only access analytics belonging to their assigned hotel.

---

# Best Practices

To obtain the most accurate reports:

- Record all reservations immediately.
- Confirm payments promptly.
- Complete guest check-in and check-out procedures.
- Update room statuses regularly.
- Complete housekeeping tasks on time.
- Review analytics periodically to identify trends and opportunities.

---

# Summary

The Analytics module serves as the business intelligence center of CMR Hospitality Suite. By consolidating operational and financial data into clear, real-time dashboards, it enables hotel management to monitor performance, improve efficiency, identify revenue opportunities, and make informed business decisions.

# Chapter 15 — AI Concierge

## Overview

The **AI Concierge** is an intelligent virtual assistant integrated into CMR Hospitality Suite to help hotel staff perform daily operational tasks more efficiently. Powered by **Anthropic Claude** through a secure backend proxy, it provides contextual assistance without exposing sensitive API credentials.

Unlike traditional chatbots, the AI Concierge understands hotel operations and can assist with reservations, guest management, reporting, operational procedures, and general platform navigation.

---

# Purpose

The AI Concierge is designed to:

- Increase staff productivity
- Reduce training time for new employees
- Provide instant operational assistance
- Answer questions about the system
- Help users locate information quickly
- Generate summaries and reports
- Improve decision-making using available business data

---

# Who Can Use It

Access to the AI Concierge depends on the user's assigned role and subscription plan.

| Role | Access |
|-------|:------:|
| Super Admin | ✅ |
| Hotel Owner | ✅ |
| Manager | ✅ |
| Receptionist | ✅ |
| Finance Officer | ✅ *(Operational Queries)* |
| Housekeeping | ✅ *(Limited)* |
| Event Manager | ✅ |

> **Note:** AI Concierge access may be restricted based on the hotel's subscription plan or feature limits.

---

# Location

Dashboard Navigation:

```
Dashboard
    └── AI Concierge
```

---

# Interface Overview

The AI Concierge interface consists of:

- Chat Window
- Message History
- Prompt Input
- Send Button
- Suggested Questions
- Loading Indicator

---

# What the AI Can Do

The AI Concierge assists users with operational and administrative tasks, including:

## Reservation Assistance

Examples:

- Explain reservation procedures
- Guide staff through check-in/check-out
- Answer booking-related questions
- Explain reservation statuses

---

## Guest Assistance

Examples:

- Explain guest profile information
- Recommend how to update guest records
- Answer questions about guest history
- Assist with VIP guest management

---

## Payment Assistance

Examples:

- Explain payment workflows
- Guide refund procedures
- Explain payment statuses
- Help verify successful transactions

---

## Staff Assistance

Examples:

- Explain staff roles
- Describe permission levels
- Assist with navigation
- Explain operational procedures

---

## Analytics Assistance

Examples:

- Explain occupancy metrics
- Interpret revenue reports
- Describe dashboard statistics
- Explain performance trends

---

## CRM Assistance

Examples:

- Explain customer segmentation
- Recommend follow-up actions
- Describe guest engagement strategies

---

## System Navigation

Examples:

Users may ask:

> "Where do I create a reservation?"

> "How do I add a new room?"

> "Where can I update hotel information?"

> "How do I refund a payment?"

The AI provides guidance based on the current version of the platform.

---

# Example Questions

### Reservations

- How do I create a reservation?
- How do I check in a guest?
- How do I cancel a booking?
- Why can't I assign this room?

---

### Guests

- How do I register a new guest?
- How do I update guest information?
- How do I mark a guest as VIP?

---

### Payments

- How do I verify a Paystack payment?
- Why is this payment still pending?
- How do I process a refund?

---

### Rooms

- How do I add a room?
- How do I upload room photos?
- How do I mark a room as under maintenance?

---

### Housekeeping

- How do I complete a cleaning task?
- How do I report a maintenance issue?

---

### Reports

- How do I export reports?
- What does the occupancy rate mean?
- How is revenue calculated?

---

# AI Workflow

```
User

↓

AI Concierge Page

↓

Secure Backend API

↓

Anthropic Claude

↓

Generated Response

↓

Displayed to User
```

All requests are routed through the backend before reaching the AI provider.

---

# Security

The AI Concierge follows strict security practices.

## API Key Protection

The Anthropic API key is stored securely on the backend.

It is **never exposed** to the frontend or end users.

---

## Authentication

Only authenticated users can access the AI Concierge.

Unauthenticated requests are rejected.

---

## Authorization

Access is controlled through Role-Based Access Control (RBAC).

Users only receive information relevant to their assigned permissions.

---

## Data Privacy

The AI Concierge is designed to:

- Protect hotel information
- Prevent unauthorized data exposure
- Respect tenant isolation
- Operate within the authenticated hotel context

Users cannot retrieve information belonging to another hotel.

---

# Subscription Requirements

The AI Concierge is available on supported subscription plans.

Availability may depend on:

- Active subscription
- AI feature limits
- Monthly usage quotas

---

# Best Practices

To obtain the best responses:

- Ask clear and specific questions.
- Include relevant context where necessary.
- Ask one question at a time.
- Review AI-generated suggestions before acting on them.

---

# Limitations

The AI Concierge is an assistant and should not replace human judgment.

It cannot:

- Override system permissions.
- Perform actions without user confirmation.
- Access another hotel's information.
- Modify data without authorized requests.
- Make business decisions on behalf of hotel management.

---

# Troubleshooting

## AI Not Responding

Possible causes:

- Internet connection unavailable
- AI service temporarily unavailable
- Server maintenance
- Backend communication issue

---

## Permission Denied

Possible causes:

- User role does not include AI access
- Subscription plan does not support AI Concierge
- Account restrictions

---

## Slow Responses

Possible causes:

- High server load
- External AI service latency
- Large or complex requests

---

# Future Enhancements

Planned improvements include:

- Voice interaction
- Multilingual support
- Hotel-specific knowledge base
- Reservation recommendations
- Revenue forecasting
- Guest sentiment analysis
- Intelligent housekeeping scheduling
- Predictive occupancy insights
- Automated operational summaries

---

# Summary

The AI Concierge is an intelligent assistant that enhances hotel operations by providing secure, contextual, and role-aware guidance across the CMR Hospitality Suite platform. It helps users complete tasks more efficiently while maintaining strict security, privacy, and access control standards.

# Chapter 16 — Notifications

## Overview

The **Notifications** module serves as the communication center of CMR Hospitality Suite. It keeps users informed about important activities, operational updates, payment events, reservations, housekeeping assignments, and system alerts.

Notifications help ensure that no important event is missed, enabling hotel staff to respond quickly and maintain efficient operations.

---

# Purpose

The Notifications module is designed to:

- Improve operational awareness
- Reduce missed reservations and payments
- Keep staff informed of assigned tasks
- Alert management to important business events
- Provide real-time system updates

---

# Who Uses This Module

| Role | Access Level |
|-------|--------------|
| Super Admin | Full Access |
| Hotel Owner | Full Access |
| General Manager | Full Access |
| Receptionist | Operational Notifications |
| Finance Officer | Payment Notifications |
| Housekeeping Staff | Assigned Task Notifications |
| Event Manager | Event Booking Notifications |

---

# Notification Categories

## Reservation Notifications

Generated when:

- A reservation is created
- A reservation is updated
- A reservation is cancelled
- Guest checks in
- Guest checks out

Example:

> New reservation received for Room 205.

---

## Payment Notifications

Generated when:

- Payment is initiated
- Payment succeeds
- Payment fails
- Refund is processed
- Invoice is generated

Example:

> Payment of ₦85,000 received successfully.

---

## Guest Notifications

Generated when:

- New guest is registered
- VIP guest checks in
- Guest profile is updated

Example:

> VIP Guest has arrived.

---

## Housekeeping Notifications

Generated when:

- New cleaning task is assigned
- Task is completed
- Room marked as clean
- Maintenance issue reported

Example:

> Room 104 has been marked as cleaned.

---

## Staff Notifications

Generated when:

- New staff member is added
- Role is updated
- Staff account is activated or suspended

Example:

> Receptionist account created successfully.

---

## Event Hall Notifications

Generated when:

- Event hall is booked
- Booking is modified
- Booking is cancelled

Example:

> Conference Hall A booked for Saturday.

---

## System Notifications

Generated when:

- Password changed
- Email verified
- Login from new device
- Subscription nearing expiration
- System maintenance scheduled

Example:

> Your password has been updated successfully.

---

# Notification Delivery Channels

CMR Hospitality Suite supports multiple notification channels.

## In-App Notifications

Displayed directly within the dashboard.

Examples:

- New reservation
- Payment received
- Assigned housekeeping task

---

## Email Notifications

Delivered through **Resend**.

Examples:

- Email verification
- Password reset
- Reservation confirmation
- Payment receipt
- Booking confirmation

---

## WhatsApp Notifications *(Planned)*

Future integration with WhatsApp Business.

Examples:

- Reservation confirmation
- Check-in reminders
- Payment confirmation
- Promotional messages

---

## SMS Notifications *(Planned)*

Future integration using **Termii**.

Examples:

- Verification codes
- Reservation reminders
- Emergency announcements

---

# Notification Priority Levels

Notifications are grouped by importance.

## Information

General updates requiring no immediate action.

Examples:

- Guest profile updated
- Staff profile updated

---

## Success

Confirms that an operation completed successfully.

Examples:

- Reservation created
- Payment completed
- Report exported

---

## Warning

Indicates a situation that may require attention.

Examples:

- Subscription expires in 7 days
- Low storage space
- Room unavailable

---

## Critical

Requires immediate action.

Examples:

- Payment verification failed
- Unauthorized login attempt
- Database connectivity issue

---

# Notification Center

The Notification Center displays:

- Unread notifications
- Read notifications
- Notification history
- Notification timestamps
- Notification category
- Notification priority

Users can mark notifications as read or clear them after review.

---

# Notification Workflow

```
Business Event
        │
        ▼
Backend Detects Event
        │
        ▼
Notification Created
        │
        ▼
Stored in Database
        │
        ▼
Delivered to User
        │
        ├── In-App
        ├── Email
        ├── WhatsApp (Future)
        └── SMS (Future)
```

---

# Notification Permissions

Notifications are delivered according to user roles and permissions.

Examples:

- Receptionists receive reservation notifications.
- Finance Officers receive payment notifications.
- Housekeeping Staff receive cleaning assignments.
- Managers receive operational summaries.
- Hotel Owners receive business-critical notifications.
- Super Admins receive platform-wide alerts.

Users will never receive notifications for resources outside their assigned hotel.

---

# Notification Settings

Users can configure notification preferences within the **Settings** module.

Available options include:

- Enable or disable email notifications
- Enable or disable in-app notifications
- Enable or disable marketing emails
- Configure future WhatsApp notifications
- Configure future SMS notifications

---

# Best Practices

To ensure effective communication:

- Review notifications regularly.
- Keep email addresses up to date.
- Resolve critical notifications promptly.
- Clear completed notifications to maintain an organized notification center.
- Enable important operational alerts.

---

# Future Enhancements

Planned improvements include:

- Push notifications
- Mobile app notifications
- Scheduled reminders
- Recurring notifications
- AI-generated operational alerts
- Notification templates
- Department-specific broadcasts
- Notification search and filtering

---

# Summary

The Notifications module ensures that every important operational event is communicated to the appropriate user at the appropriate time. By supporting multiple delivery channels, role-based delivery, and prioritized alerts, it helps hotels respond quickly, improve coordination, and maintain efficient daily operations.

# Chapter 17 — Reports

## Overview

The **Reports** module provides comprehensive operational and financial reporting for hotel management. It transforms raw operational data into meaningful insights, enabling managers and owners to monitor performance, identify trends, and make informed business decisions.

Reports can be viewed within the dashboard and exported for meetings, audits, accounting, or executive review.

---

# Primary Users

| Role | Access |
|------|--------|
| Hotel Owner | ✅ Full Access |
| General Manager | ✅ Full Access |
| Finance Officer | ✅ Financial Reports |
| Receptionist | ❌ No Access |
| Housekeeping | ❌ No Access |
| Event Manager | Limited (Event Reports) |
| Super Admin | Platform-Level Access |

---

# Report Categories

The Reports module is organized into several categories.

- Occupancy Reports
- Reservation Reports
- Revenue Reports
- Payment Reports
- Guest Reports
- Staff Reports
- Housekeeping Reports
- Event Hall Reports
- CRM Reports
- Audit Reports

---

# Dashboard Summary

When the Reports page opens, users can view a high-level summary including:

- Total Revenue
- Total Reservations
- Occupancy Rate
- Active Guests
- Completed Payments
- Outstanding Payments
- Staff Performance
- Event Hall Utilization

---

# Occupancy Report

## Purpose

Provides insight into room occupancy performance over a selected period.

### Includes

- Occupancy Percentage
- Available Rooms
- Occupied Rooms
- Vacant Rooms
- Rooms Under Maintenance
- Daily Occupancy Trend
- Monthly Occupancy Trend

### Business Use

Helps management understand hotel utilization and forecast demand.

---

# Reservation Report

## Purpose

Summarizes reservation activities.

### Includes

- Total Reservations
- Confirmed Reservations
- Pending Reservations
- Cancelled Reservations
- Check-ins
- Check-outs
- Reservation Sources
- Booking Trends

### Business Use

Measures booking performance and customer demand.

---

# Revenue Report

## Purpose

Provides a complete overview of hotel income.

### Includes

- Total Revenue
- Daily Revenue
- Weekly Revenue
- Monthly Revenue
- Annual Revenue
- Revenue by Room Type
- Revenue by Event Hall
- Average Daily Revenue

### Business Use

Supports financial planning and executive decision-making.

---

# Payment Report

## Purpose

Tracks all financial transactions processed through the platform.

### Includes

- Successful Payments
- Pending Payments
- Failed Payments
- Refunded Payments
- Payment Methods
- Transaction History
- Outstanding Balances

### Business Use

Enables reconciliation and financial auditing.

---

# Guest Report

## Purpose

Provides insights into guest activity.

### Includes

- Total Guests
- New Guests
- Returning Guests
- VIP Guests
- Average Stay Duration
- Nationality Distribution
- Guest Visit Frequency

### Business Use

Supports customer relationship management and marketing.

---

# Staff Report

## Purpose

Measures staff activities and operational efficiency.

### Includes

- Total Staff
- Active Staff
- Department Distribution
- Shift Assignments
- Attendance Summary *(Future)*
- Performance Metrics *(Future)*

### Business Use

Supports workforce planning and management.

---

# Housekeeping Report

## Purpose

Tracks housekeeping performance.

### Includes

- Assigned Tasks
- Completed Tasks
- Pending Tasks
- Average Cleaning Time
- Maintenance Requests

### Business Use

Improves operational efficiency and room turnaround time.

---

# Event Hall Report

## Purpose

Provides insights into event hall utilization.

### Includes

- Total Bookings
- Revenue Generated
- Upcoming Events
- Completed Events
- Hall Occupancy
- Booking Trends

### Business Use

Helps maximize event facility utilization and revenue.

---

# CRM Report

## Purpose

Provides customer relationship insights.

### Includes

- Customer Segments
- Repeat Guests
- Guest Retention
- Customer Interactions
- Loyalty Metrics *(Future)*

### Business Use

Supports marketing campaigns and guest retention strategies.

---

# Audit Report

## Purpose

Summarizes important activities performed within the system.

### Includes

- User Activities
- Reservation Changes
- Payment Actions
- Settings Updates
- Staff Actions
- Login History

### Business Use

Supports compliance, accountability, and security investigations.

---

# Filtering Reports

Users can filter reports using:

- Date Range
- Department
- Room Type
- Staff Member
- Payment Status
- Reservation Status
- Event Hall
- Guest Category

Filters allow users to generate highly targeted reports.

---

# Exporting Reports

Reports can be exported in multiple formats.

Supported formats include:

- PDF
- Excel (.xlsx)
- CSV

Export permissions are controlled through Role-Based Access Control (RBAC).

---

# Printing Reports

Reports may also be printed directly from the browser for:

- Management Meetings
- Financial Reviews
- Audit Sessions
- Regulatory Compliance

---

# Security

Only authorized users may access reports.

The system enforces:

- Role-Based Access Control (RBAC)
- Multi-Tenant Isolation
- Audit Logging

Every exported report is associated with the user who generated it.

---

# Future Enhancements

Planned improvements include:

- Scheduled Reports
- Automated Email Reports
- AI-Generated Executive Summaries
- Predictive Revenue Forecasting
- Interactive Charts
- Custom Report Builder
- Business Intelligence Dashboard
- Multi-property Consolidated Reports

---

# Best Practices

- Review occupancy reports daily.
- Monitor revenue reports weekly.
- Reconcile payment reports regularly.
- Export monthly reports for financial records.
- Restrict report access to authorized personnel.
- Use analytics to guide operational decisions.

---

# Summary

The **Reports** module provides hotel management with accurate, real-time operational and financial insights. It supports informed decision-making, improves transparency, enhances accountability, and enables data-driven management across all departments.

# Chapter 18 — Settings

## Overview

The **Settings** module allows authorized users to configure hotel information, account preferences, security settings, notifications, and other operational preferences for the hotel.

Only users with the appropriate permissions can access or modify settings.

---

# Who Can Access

| Role | Access |
|-------|--------|
| Super Admin | ✅ Full Access |
| Hotel Owner | ✅ Full Access |
| Manager | ✅ Limited Access (if permitted) |
| Receptionist | ❌ No Access |
| Finance | ❌ No Access |
| Housekeeping | ❌ No Access |
| Event Manager | ❌ No Access |

Permission Required:

```
settings.manage
```

---

# Settings Dashboard

The Settings page is divided into several sections for easier management.

- Hotel Profile
- Account Settings
- Security
- Notification Preferences
- Branding
- Subscription
- Integrations
- System Preferences

---

# Hotel Profile

## Purpose

Stores the hotel's official information displayed throughout the platform.

### Information Managed

- Hotel Name
- Hotel Logo
- Hotel Description
- Business Registration Number
- Email Address
- Phone Number
- Website
- Physical Address
- City
- State
- Country

### Actions

- Update Hotel Information
- Upload Hotel Logo
- Change Contact Details

Changes are applied immediately after saving.

---

# Branding

## Purpose

Customize the hotel's appearance within the platform.

### Options

- Upload Hotel Logo
- Replace Existing Logo
- Remove Logo

Supported Formats

- PNG
- JPG
- JPEG
- WEBP

Maximum Upload Size

- Configurable by system administrator

---

# Account Settings

## Purpose

Manage the logged-in user's account.

### Information

- Full Name
- Email Address
- Phone Number
- Job Position
- Profile Picture (Future)

### Actions

- Update Personal Information
- Change Password
- View Assigned Role

Email addresses can only be changed after successful verification.

---

# Security

## Purpose

Protect user accounts and hotel information.

### Available Features

- Change Password
- Password Reset
- Email Verification Status
- Active Sessions *(Future)*
- Two-Factor Authentication *(Future)*
- Phone Verification *(Future)*

---

# Changing Password

To change your password:

1. Open **Settings**
2. Select **Security**
3. Enter your current password
4. Enter a new password
5. Confirm the new password
6. Click **Save Changes**

Password requirements:

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (recommended)

---

# Notification Preferences

## Purpose

Control which notifications users receive.

Available options include:

- Reservation Notifications
- Payment Notifications
- Housekeeping Notifications
- Staff Notifications
- System Alerts
- Marketing Emails *(Optional)*

Future integrations:

- WhatsApp Notifications
- SMS Notifications

---

# Subscription

## Purpose

Display the hotel's current subscription details.

Information displayed:

- Current Plan
- Billing Cycle
- Trial Status
- Renewal Date
- Usage Limits
- Storage Usage
- Room Usage
- Staff Usage

Available Actions

- Upgrade Plan
- Downgrade Plan
- Renew Subscription
- View Billing History

---

# Integrations

## Purpose

Manage third-party services connected to the hotel.

Current Integrations

- Paystack
- Resend Email
- Anthropic AI Concierge

Future Integrations

- WhatsApp Business API
- Termii SMS
- Google Maps
- Google Calendar
- Booking Platforms

---

# System Preferences

## Purpose

Configure operational settings used throughout the hotel.

### Available Settings

- Currency
- Time Zone
- Date Format
- Time Format
- Default Check-in Time
- Default Check-out Time
- Tax/VAT Percentage
- Language *(Future)*

These settings affect reservations, invoices, reports, and analytics.

---

# Saving Changes

After making changes:

1. Click **Save Changes**
2. The system validates all inputs
3. Updated information is saved securely
4. A confirmation notification is displayed
5. Changes become effective immediately unless otherwise specified

---

# Security Considerations

To maintain platform security:

- Only authorized users can modify settings.
- All sensitive changes are protected by Role-Based Access Control (RBAC).
- Passwords are securely hashed before storage.
- Critical configuration changes are recorded in the Audit Log.
- Email changes require verification before becoming active.

---

# Audit Logging

The following actions are automatically recorded:

- Hotel profile updated
- Logo uploaded or changed
- Password changed
- Notification preferences modified
- Subscription updated
- Integration configured
- Security settings modified

Audit records include:

- User
- Action
- Date and Time
- IP Address
- Hotel
- Status

---

# Best Practices

- Keep hotel contact information up to date.
- Use a strong password and change it periodically.
- Limit Settings access to trusted administrators.
- Review notification preferences regularly.
- Verify all email addresses before use.
- Upload a high-quality hotel logo for consistent branding.

---

# Summary

The **Settings** module centralizes configuration for both the hotel and individual user accounts. It provides secure management of branding, security, notifications, subscriptions, and operational preferences while ensuring that all critical changes are protected through Role-Based Access Control and recorded in the system's Audit Log.

# Chapter 19 — Audit Logs

## Overview

The **Audit Logs** module provides a comprehensive record of important activities performed within CMR Hospitality Suite. It enhances accountability, transparency, and security by tracking who performed an action, what action was taken, when it occurred, and where it originated.

Unlike regular activity feeds, audit logs are permanent records intended for monitoring, compliance, troubleshooting, and security investigations.

---

# Purpose

The Audit Logs module helps hotel management:

- Monitor user activities
- Investigate suspicious behaviour
- Track operational changes
- Maintain accountability
- Support internal audits
- Improve system security
- Meet compliance requirements

Every critical action performed within the system is automatically recorded.

---

# Who Can Access Audit Logs

| Role | Access |
|------|--------|
| Super Admin | Full Access |
| Hotel Owner | Full Access (Own Hotel Only) |
| Manager | View Only (Optional) |
| Receptionist | No Access |
| Housekeeping | No Access |
| Finance | No Access |
| Event Manager | No Access |

Access is controlled through the Role-Based Access Control (RBAC) system.

---

# What Is Logged

The system records important business and security events, including but not limited to:

## Authentication

- User Registration
- User Login
- User Logout
- Failed Login Attempts
- Password Reset
- Email Verification
- Password Change

---

## Room Management

- Room Created
- Room Updated
- Room Deleted
- Room Status Changed
- Room Photo Uploaded

---

## Reservation Management

- Reservation Created
- Reservation Updated
- Reservation Cancelled
- Guest Checked In
- Guest Checked Out

---

## Guest Management

- Guest Created
- Guest Updated
- Guest Deleted

---

## Payment Activities

- Payment Initialized
- Payment Verified
- Payment Confirmed
- Refund Processed

---

## Staff Management

- Staff Added
- Staff Updated
- Staff Removed
- Role Assigned

---

## Housekeeping

- Task Assigned
- Task Completed
- Maintenance Report Submitted

---

## Event Hall Management

- Event Hall Created
- Event Booking Created
- Event Booking Updated
- Event Booking Cancelled

---

## Settings

- Hotel Profile Updated
- Hotel Logo Changed
- Password Changed
- Notification Settings Updated

---

## Administration

- Hotel Created
- Subscription Updated
- User Suspended
- Role Updated
- Permissions Modified

---

# Information Stored

Each audit log entry contains the following information:

| Field | Description |
|--------|-------------|
| Timestamp | Date and time the action occurred |
| User | User who performed the action |
| Email | User email address |
| Role | User role |
| Hotel | Associated hotel |
| Module | System module affected |
| Action | Operation performed |
| Resource | Object affected (Room, Reservation, Guest, etc.) |
| Resource ID | Unique identifier of the affected record |
| IP Address | Originating IP address |
| Status | Success or Failure |

---

# Example Audit Log

| Time | User | Module | Action | Status |
|------|------|--------|--------|--------|
| 2026-07-15 09:12 | John Smith | Reservations | Created Reservation #458 | Success |
| 2026-07-15 09:20 | Mary Johnson | Payments | Confirmed Payment | Success |
| 2026-07-15 10:05 | Ahmed Musa | Housekeeping | Completed Room Cleaning | Success |
| 2026-07-15 10:42 | Admin | Settings | Updated Hotel Profile | Success |

---

# Filtering Audit Logs

Users with permission can filter audit logs using:

- Date Range
- User
- Department
- Role
- Module
- Action Type
- Status
- Resource Type

This allows administrators to quickly locate specific events.

---

# Searching Audit Logs

The search feature supports searching by:

- User Name
- Email Address
- Reservation Number
- Guest Name
- Room Number
- Payment Reference
- Event Booking
- Audit Action

---

# Viewing Audit Details

Selecting an audit record displays additional information such as:

- Full activity description
- Previous values (where applicable)
- New values
- User details
- Timestamp
- Source IP address
- Related resource

---

# Security

Audit logs are designed to be tamper-resistant.

Standard users cannot:

- Edit audit records
- Delete audit records
- Modify timestamps
- Change recorded actions

Only authorized system administrators may configure retention policies.

---

# Data Retention

Audit logs are retained to support operational reviews and security investigations.

Retention periods may vary depending on the organization's policies and regulatory requirements.

Recommended retention:

- Operational Logs: 12 Months
- Security Logs: 24 Months
- Financial Audit Logs: 7 Years

---

# Best Practices

To maximize the value of audit logs:

- Review logs regularly.
- Investigate repeated failed login attempts.
- Monitor permission and role changes.
- Verify payment-related activities.
- Audit sensitive administrative actions.
- Export logs before major system upgrades.
- Include audit log reviews in routine security assessments.

---

# Notes

- Audit logging is enabled by default.
- Logging operates automatically in the background.
- No manual action is required from users.
- Audit logs do not affect normal application performance.
- All audit data remains isolated to each hotel's tenant unless viewed by a Super Admin.

---

## Summary

The Audit Logs module provides a complete and secure history of significant system activities. It strengthens accountability, improves operational transparency, supports compliance requirements, and enables administrators to monitor and investigate actions performed across the platform while maintaining strict multi-tenant isolation and role-based access control.

# Chapter 20 — Admin Panel

## Overview

The **Admin Panel** is the central management interface for the **CMR Hospitality Suite SaaS platform**. Unlike the hotel dashboard, which is used to manage the daily operations of a single hotel, the Admin Panel is used to manage the entire platform, including all hotels, subscriptions, users, and system-wide settings.

This module is strictly reserved for **CMR Group** or authorized platform administrators.

---

## Who Can Access

| Role | Access |
|------|--------|
| Super Admin | ✅ Full Access |
| Hotel Owner | ❌ No Access |
| Manager | ❌ No Access |
| Receptionist | ❌ No Access |
| Finance Officer | ❌ No Access |
| Housekeeping | ❌ No Access |
| Event Manager | ❌ No Access |

---

## Purpose

The Admin Panel allows platform administrators to:

- Manage hotels
- Manage platform users
- Monitor subscriptions
- View platform statistics
- Review audit logs
- Monitor system health
- Respond to customer issues
- Suspend or reactivate hotels
- Configure platform-wide settings

---

# Dashboard Overview

The Admin Dashboard provides a high-level overview of the entire platform.

Typical statistics include:

- Total Hotels
- Active Hotels
- Trial Hotels
- Suspended Hotels
- Total Users
- Active Subscriptions
- Monthly Revenue
- Pending Payments
- API Health
- AI Usage
- Storage Usage
- Recent Activity

---

# Hotel Management

## Purpose

Manage every hotel registered on the platform.

### Features

- View all hotels
- Search hotels
- Filter by subscription
- View hotel details
- Suspend hotel
- Reactivate hotel
- Delete hotel (restricted)
- Upgrade subscription
- View usage statistics

### Information Displayed

- Hotel Name
- Owner
- Email
- Subscription Plan
- Trial Status
- Number of Rooms
- Number of Staff
- Registration Date
- Last Login
- Account Status

---

# User Management

## Purpose

Manage users across all hotels.

### Features

- View all users
- Search users
- Filter by hotel
- Reset passwords
- Disable user accounts
- Reactivate users
- Assign platform roles
- View login history

### Information Displayed

- Name
- Email
- Hotel
- Role
- Status
- Last Login
- Date Created

---

# Subscription Management

## Purpose

Manage customer subscriptions.

### Features

- View active subscriptions
- View expired subscriptions
- Start trial
- Extend trial
- Upgrade plan
- Downgrade plan
- Cancel subscription
- Renew subscription

### Supported Plans

- Starter
- Professional
- Professional Elite
- Enterprise

---

# Billing & Revenue

## Purpose

Monitor financial performance.

### Features

- Monthly revenue
- Annual revenue
- Failed payments
- Successful payments
- Outstanding invoices
- Subscription renewals

### Metrics

- Monthly Recurring Revenue (MRR)
- Annual Recurring Revenue (ARR)
- Customer Lifetime Value (Future)
- Churn Rate (Future)

---

# Platform Analytics

## Purpose

View overall platform performance.

### Metrics

- Total Hotels
- Total Rooms
- Total Reservations
- Total Guests
- Total Users
- Total Payments
- Total Revenue
- AI Requests
- Email Usage
- Storage Consumption

---

# Audit Logs

## Purpose

Track administrative activities across the platform.

Every sensitive action performed by administrators is recorded.

### Logged Events

- Hotel Created
- Hotel Suspended
- User Disabled
- Subscription Updated
- Refund Approved
- Settings Modified
- Admin Login
- API Key Generated

### Log Information

- Timestamp
- Administrator
- Action
- Resource
- IP Address
- Device
- Status

Audit logs cannot be modified or deleted.

---

# Support Center

## Purpose

Assist customers using the platform.

### Features

- View support requests
- Assign tickets
- Respond to customers
- Track issue resolution
- Escalate tickets

Future versions may include:

- Live Chat
- AI Support Assistant
- Knowledge Base

---

# Feature Management

## Purpose

Control platform features globally.

Examples:

- Enable AI Concierge
- Enable Guest Portal
- Enable SMS
- Enable WhatsApp
- Enable Beta Features
- Maintenance Mode

This allows CMR Group to release features gradually.

---

# Platform Configuration

## Purpose

Configure global platform settings.

Examples include:

- Default Currency
- Trial Duration
- Maximum File Upload Size
- Email Templates
- Payment Gateway Settings
- API Limits
- Password Policy
- Session Timeout

---

# Monitoring & System Health

The Admin Panel includes a real-time system monitoring dashboard.

### Services Monitored

- Frontend Status
- Backend API
- PostgreSQL Database
- Supabase Storage
- Paystack
- Resend
- Anthropic AI
- Background Jobs

Each service displays:

- Operational Status
- Response Time
- Error Count
- Uptime
- Last Health Check

---

# Security Management

Platform administrators can monitor security-related activities.

### Features

- Failed Login Attempts
- Locked Accounts
- Suspicious Activity
- Rate Limit Violations
- Active Sessions
- Password Reset Requests

Future Enhancements:

- Two-Factor Authentication
- IP Whitelisting
- Device Management
- Login Alerts

---

# Notifications

The Admin Panel provides platform-wide notifications.

Examples:

- Trial Expiring
- Subscription Renewed
- Payment Failed
- New Hotel Registered
- New Support Ticket
- High API Usage
- Service Outage

---

# Backup & Recovery

Administrators can monitor backup status.

### Information Displayed

- Last Database Backup
- Backup Size
- Storage Usage
- Restore Status

Future functionality may include one-click backup restoration.

---

# Access Control

The Admin Panel is protected by multiple layers of security.

### Security Measures

- JWT Authentication
- Super Admin Role Verification
- RBAC Authorization
- Audit Logging
- Rate Limiting
- Secure Password Hashing
- HTTPS Encryption

Only authorized platform administrators can access administrative resources.

---

# Best Practices

Platform administrators should:

- Review audit logs regularly.
- Monitor subscription renewals.
- Respond to customer support requests promptly.
- Verify payment issues before taking action.
- Keep platform settings up to date.
- Monitor system health daily.
- Avoid deleting customer data unless absolutely necessary.
- Ensure platform security policies are enforced.

---

# Summary

The Admin Panel is the operational control center for the CMR Hospitality Suite platform. It enables CMR Group administrators to oversee hotels, users, subscriptions, revenue, platform health, security, and customer support from a single interface while maintaining strict access control and comprehensive audit logging.
