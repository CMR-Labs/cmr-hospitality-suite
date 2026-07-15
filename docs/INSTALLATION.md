# Installation Guide

This guide explains how to set up **CMR Hospitality Suite** for local development.

---

# System Requirements

Before installing, ensure your machine has the following:

- Node.js 20+
- Python 3.11+
- PostgreSQL (or Supabase)
- Git
- npm (or pnpm)
- Virtual Environment (venv)

Recommended:

- VS Code
- Postman
- Docker (optional)

---

# Clone the Repository

```bash
git clone https://github.com/CMR-Labs/cmr-hospitality-suite.git
cd cmr-hospitality-suite
```

---

# Project Structure

```
cmr-hospitality-suite/
│
├── frontend/
├── backend/
├── docs/
├── scripts/
├── README.md
└── LICENSE
```

---

# Frontend Installation

Navigate to the frontend directory.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Create the environment file.

```bash
cp .env.example .env.local
```

Configure the environment variables.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_APP_NAME=CMR Hospitality Suite
```

Run the development server.

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:3000
```

---

# Backend Installation

Navigate to the backend directory.

```bash
cd backend
```

Create a virtual environment.

Windows

```bash
python -m venv .venv
.venv\Scripts\activate
```

macOS/Linux

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create the environment file.

```bash
cp .env.example .env
```

Example configuration:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
SUPABASE_URL=...
SUPABASE_KEY=...
PAYSTACK_SECRET_KEY=...
RESEND_API_KEY=...
ANTHROPIC_API_KEY=...
```

Run database migrations.

```bash
alembic upgrade head
```

Start the backend server.

```bash
uvicorn app.main:app --reload
```

Backend will be available at:

```
http://localhost:8000
```

Interactive API documentation:

```
http://localhost:8000/docs
```

---

# Seed the Database

Populate the database with demo data.

```bash
python scripts/seed.py
```

This creates:

- Demo Hotel
- Staff Accounts
- Room Types
- Rooms
- Guests
- Reservations
- Payments
- Analytics Data

---

# Running Both Applications

Terminal 1

```bash
cd frontend
npm run dev
```

Terminal 2

```bash
cd backend
uvicorn app.main:app --reload
```

---

# Production Build

Frontend

```bash
npm run build
npm start
```

Backend

```bash
gunicorn app.main:app
```

---

# Environment Variables

The application requires several environment variables.

Refer to:

- `CONFIGURATION.md`

for a complete list.

---

# Running Tests

Frontend

```bash
npm test
```

Backend

```bash
pytest
```

Run coverage.

```bash
pytest --cov
```

---

# Deployment

The recommended production stack is:

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | DigitalOcean App Platform |
| Database | Supabase PostgreSQL |
| Storage | Supabase Storage |
| Monitoring | Sentry |
| Payments | Paystack |
| Email | Resend |

For deployment instructions, see:

- `DEPLOYMENT.md`

---

# Troubleshooting

## Port Already in Use

Frontend

```bash
npm run dev -- --port 3001
```

Backend

```bash
uvicorn app.main:app --reload --port 8001
```

---

## Database Connection Failed

Check:

- DATABASE_URL
- PostgreSQL server
- Supabase credentials
- Firewall rules

---

## Environment Variables Not Loading

Ensure:

- `.env.local` exists in the frontend
- `.env` exists in the backend
- Restart the development server after making changes

---

## API Requests Failing

Verify:

- Backend server is running
- API URL is correct
- JWT token is valid
- CORS is configured correctly

---

# Additional Documentation

For more information, see:

- README.md
- ARCHITECTURE.md
- DATABASE.md
- API.md
- CONFIGURATION.md
- RBAC.md
- DEPLOYMENT.md
- SECURITY.md

---

# Support

If you encounter issues during installation, please open an issue in the GitHub repository or contact the CMR Labs team.
