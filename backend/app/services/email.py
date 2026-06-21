import resend
from app.core.config import settings

def get_resend_client():
    resend.api_key = settings.RESEND_API_KEY
    return resend

def send_verification_email(email: str, full_name: str, token: str):
    if not settings.RESEND_API_KEY:
        print(f"[DEV] Verification link: {settings.FRONTEND_URL}/verify-email?token={token}")
        return

    client = get_resend_client()
    verification_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    client.Emails.send({
        "from": f"CMR Hospitality Suite <{settings.FROM_EMAIL}>",
        "to": [email],
        "subject": "Verify your email — CMR Hospitality Suite",
        "html": f"""
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #1B2D5B; padding: 24px; text-align: center; margin-bottom: 32px;">
                <h1 style="color: white; font-size: 20px; margin: 0;">CMR Hospitality Suite</h1>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">AI-Powered Hotel Operations Platform</p>
            </div>
            <h2 style="color: #1B2D5B; font-size: 22px; margin: 0 0 16px;">Welcome, {full_name}!</h2>
            <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                Thank you for registering with CMR Hospitality Suite. Please verify your email address to activate your account.
            </p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="{verification_url}" style="background: #B8952A; color: white; padding: 14px 32px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
                    Verify Email Address
                </a>
            </div>
            <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
                This link expires in 24 hours. If you did not create an account, please ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
            <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
                CMR Hospitality Suite · A product of CMR Group · Nigeria
            </p>
        </div>
        """,
    })

def send_password_reset_email(email: str, full_name: str, token: str):
    if not settings.RESEND_API_KEY:
        print(f"[DEV] Reset link: {settings.FRONTEND_URL}/reset-password?token={token}")
        return

    client = get_resend_client()
    reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"

    client.Emails.send({
        "from": f"CMR Hospitality Suite <{settings.FROM_EMAIL}>",
        "to": [email],
        "subject": "Reset your password — CMR Hospitality Suite",
        "html": f"""
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #1B2D5B; padding: 24px; text-align: center; margin-bottom: 32px;">
                <h1 style="color: white; font-size: 20px; margin: 0;">CMR Hospitality Suite</h1>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">AI-Powered Hotel Operations Platform</p>
            </div>
            <h2 style="color: #1B2D5B; font-size: 22px; margin: 0 0 16px;">Password Reset Request</h2>
            <p style="color: #6B7280; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                Hi {full_name}, we received a request to reset your password. Click the button below to set a new password.
            </p>
            <div style="text-align: center; margin: 32px 0;">
                <a href="{reset_url}" style="background: #1B2D5B; color: white; padding: 14px 32px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">
                    Reset Password
                </a>
            </div>
            <p style="color: #9CA3AF; font-size: 13px; line-height: 1.6;">
                This link expires in 1 hour. If you did not request a password reset, please ignore this email and your password will remain unchanged.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
            <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
                CMR Hospitality Suite · A product of CMR Group · Nigeria
            </p>
        </div>
        """,
    })

def send_booking_confirmation_email(email: str, guest_name: str, reservation_number: str, check_in: str, check_out: str, room: str, amount: int, hotel_name: str):
    if not settings.RESEND_API_KEY:
        print(f"[DEV] Booking confirmation for {guest_name} — {reservation_number}")
        return

    client = get_resend_client()

    client.Emails.send({
        "from": f"{hotel_name} via CMR <{settings.FROM_EMAIL}>",
        "to": [email],
        "subject": f"Booking Confirmed — {reservation_number}",
        "html": f"""
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #1B2D5B; padding: 24px; text-align: center; margin-bottom: 32px;">
                <h1 style="color: white; font-size: 20px; margin: 0;">{hotel_name}</h1>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">Powered by CMR Hospitality Suite</p>
            </div>
            <h2 style="color: #1B2D5B; font-size: 22px; margin: 0 0 8px;">Booking Confirmed!</h2>
            <p style="color: #6B7280; font-size: 15px; margin: 0 0 32px;">Dear {guest_name}, your reservation has been confirmed.</p>
            <div style="background: #F9F7F4; border: 1px solid #e5e0d8; padding: 24px; margin-bottom: 32px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 13px;">Reservation ID</td><td style="padding: 8px 0; color: #1B2D5B; font-weight: 600; text-align: right;">{reservation_number}</td></tr>
                    <tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 13px;">Room</td><td style="padding: 8px 0; color: #1B2D5B; font-weight: 600; text-align: right;">{room}</td></tr>
                    <tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 13px;">Check In</td><td style="padding: 8px 0; color: #1B2D5B; font-weight: 600; text-align: right;">{check_in}</td></tr>
                    <tr><td style="padding: 8px 0; color: #9CA3AF; font-size: 13px;">Check Out</td><td style="padding: 8px 0; color: #1B2D5B; font-weight: 600; text-align: right;">{check_out}</td></tr>
                    <tr style="border-top: 1px solid #e5e0d8;"><td style="padding: 12px 0; color: #1B2D5B; font-weight: 600;">Total Amount</td><td style="padding: 12px 0; color: #B8952A; font-weight: 700; font-size: 16px; text-align: right;">₦{amount:,}</td></tr>
                </table>
            </div>
            <p style="color: #6B7280; font-size: 13px; line-height: 1.6;">
                We look forward to welcoming you. If you have any questions, please contact the hotel directly.
            </p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
            <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
                {hotel_name} · Powered by CMR Hospitality Suite · CMR Group
            </p>
        </div>
        """,
    })

def send_payment_confirmation_email(email: str, guest_name: str, amount: int, reference: str, hotel_name: str):
    if not settings.RESEND_API_KEY:
        print(f"[DEV] Payment confirmation for {guest_name} — ₦{amount:,}")
        return

    client = get_resend_client()

    client.Emails.send({
        "from": f"{hotel_name} via CMR <{settings.FROM_EMAIL}>",
        "to": [email],
        "subject": f"Payment Confirmed — ₦{amount:,}",
        "html": f"""
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="background: #1B2D5B; padding: 24px; text-align: center; margin-bottom: 32px;">
                <h1 style="color: white; font-size: 20px; margin: 0;">{hotel_name}</h1>
                <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">Powered by CMR Hospitality Suite</p>
            </div>
            <h2 style="color: #1B2D5B; font-size: 22px; margin: 0 0 8px;">Payment Received</h2>
            <p style="color: #6B7280; font-size: 15px; margin: 0 0 32px;">Dear {guest_name}, we have received your payment.</p>
            <div style="background: #F0FDF4; border: 1px solid #bbf7d0; padding: 24px; margin-bottom: 32px; text-align: center;">
                <p style="color: #15803d; font-size: 13px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Amount Paid</p>
                <p style="color: #15803d; font-size: 32px; font-weight: 700; margin: 0 0 8px;">₦{amount:,}</p>
                <p style="color: #6B7280; font-size: 12px; margin: 0;">Reference: {reference}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
            <p style="color: #9CA3AF; font-size: 12px; text-align: center;">
                {hotel_name} · Powered by CMR Hospitality Suite · CMR Group
            </p>
        </div>
        """,
    })