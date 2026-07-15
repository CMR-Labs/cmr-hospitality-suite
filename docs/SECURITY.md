# Security Policy

Thank you for helping keep **CMR Hospitality Suite** secure.

The security of our users, customers, and their data is our highest priority. We appreciate responsible disclosure of vulnerabilities and will investigate all legitimate reports promptly.

---

# Supported Versions

| Version | Supported |
|---------|-----------|
| v1.x | ✅ Yes |
| v0.x | ❌ No |

Only the latest stable release receives security updates.

---

# Reporting a Vulnerability

**Please do not disclose security vulnerabilities publicly.**

Instead, report them privately.

**Email:** security@cmrgroup.com *(Replace with your actual email address)*

Include the following information:

- Description of the vulnerability
- Steps to reproduce
- Affected endpoint(s)
- Screenshots (if applicable)
- Proof of Concept (PoC)
- Potential impact
- Suggested mitigation (optional)

---

# Response Timeline

| Action | Target Time |
|---------|-------------|
| Initial Response | Within 48 hours |
| Confirmation | Within 5 business days |
| Progress Updates | As required |
| Resolution | Depends on severity |

---

# Security Features

CMR Hospitality Suite implements multiple layers of security.

## Authentication

- JWT Authentication
- Secure password hashing using bcrypt
- Email verification
- Password reset via secure email tokens
- Token expiration
- Protected API routes

---

## Authorization

Role-Based Access Control (RBAC)

Supported Roles:

- Super Admin
- Hotel Owner
- Manager
- Receptionist
- Housekeeping
- Finance
- Event Manager

Permissions are enforced on both the frontend and backend.

---

## Multi-Tenant Isolation

Every authenticated user belongs to a specific hotel.

Each API request validates:

- Authenticated user
- Assigned hotel
- Required permissions

Users cannot access data belonging to another hotel.

---

## Password Security

Passwords are:

- Never stored in plain text
- Hashed using bcrypt
- Verified securely
- Reset using time-limited tokens

---

## Email Verification

New accounts must verify their email address before gaining full access.

Verification links:

- Are cryptographically signed
- Expire automatically
- Can only be used once

---

## API Security

The API includes:

- JWT Authentication
- Permission checks
- Rate limiting
- Request validation
- Input sanitization
- Secure error responses

---

## Rate Limiting

Critical endpoints are protected against abuse.

Examples include:

- Login
- Registration
- Password Reset
- AI Concierge
- Payment Endpoints

---

## Audit Logging

Important actions are recorded, including:

- User login
- Reservation creation
- Payment confirmation
- Refunds
- Room updates
- Staff changes
- Administrative actions

Audit logs include:

- User
- Action
- Timestamp
- Hotel
- IP Address (where available)

---

## Payment Security

Payments are processed through **Paystack**.

CMR Hospitality Suite:

- Never stores card information
- Verifies transactions using Paystack APIs
- Uses webhooks for payment confirmation
- Stores only transaction metadata

---

## AI Security

The AI Concierge operates through a secure backend proxy.

API keys are never exposed to clients.

Features include:

- Server-side request validation
- Authentication checks
- Rate limiting
- Secure API communication

---

## File Upload Security

Uploaded files are validated before storage.

Validation includes:

- Allowed file types
- File size limits
- Secure file naming
- Storage isolation

Executable files are rejected.

---

## Environment Variables

Sensitive credentials are stored using environment variables.

Examples include:

- JWT Secret
- Database URL
- Paystack Secret Key
- Resend API Key
- Anthropic API Key
- Supabase Credentials

Secrets are never committed to source control.

---

## HTTPS

All production deployments should use HTTPS.

Sensitive information must never be transmitted over unsecured HTTP.

---

## Database Security

The application uses PostgreSQL with:

- Parameterized queries
- SQLAlchemy ORM
- Input validation
- Foreign key constraints
- Multi-tenant isolation

---

## Security Headers

Recommended production headers include:

- Content-Security-Policy
- Strict-Transport-Security
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

---

## Dependency Management

Dependencies should be updated regularly.

We recommend:

- GitHub Dependabot
- Automated security scanning
- Regular vulnerability reviews

---

# Responsible Disclosure

Please allow reasonable time for vulnerabilities to be investigated and resolved before public disclosure.

We appreciate researchers who follow responsible disclosure practices.

---

# Out of Scope

The following are generally considered out of scope:

- Social engineering
- Physical attacks
- Denial-of-Service (DoS) attacks
- Spam
- Reports from outdated versions
- Vulnerabilities requiring physical device access

---

# Best Practices for Self-Hosted Deployments

Administrators should:

- Enable HTTPS
- Use strong passwords
- Enable email verification
- Rotate API keys regularly
- Keep dependencies updated
- Restrict database access
- Configure regular backups
- Monitor audit logs
- Enable application monitoring
- Protect environment variables

---

# Compliance Goals

CMR Hospitality Suite is designed with security best practices aligned with:

- OWASP Top 10
- Principle of Least Privilege
- Defense in Depth
- Secure by Default
- Zero Trust Principles

---

# Acknowledgements

We sincerely thank security researchers and community members who responsibly report vulnerabilities and help improve the security of CMR Hospitality Suite.

---

**CMR Hospitality Suite**  
Security Team  
CMR Group
