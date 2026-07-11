"use client";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <Link href="/login" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>Sign In</Link>
      </nav>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Privacy Policy</h1>
        <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 48px" }}>Last updated: July 2026</p>

        {[
          {
            title: "1. Introduction",
            content: "CMR Group ('we', 'us', or 'our') operates CMR Hospitality Suite. This Privacy Policy explains how we collect, use, store, and protect information about you and your hotel guests when you use our Service."
          },
          {
            title: "2. Information We Collect",
            content: "We collect: Account information (name, email, phone, hotel details) when you register. Hotel operational data (reservations, guests, payments, staff) that you input into the Service. Usage data (pages visited, features used, login times) to improve the Service. Technical data (IP addresses, browser type, device information) for security purposes."
          },
          {
            title: "3. How We Use Your Information",
            content: "We use your information to: Provide and operate the Service. Process payments through Paystack. Send transactional emails (booking confirmations, password resets). Provide customer support. Improve and develop the Service. Comply with legal obligations. Detect and prevent fraud or abuse."
          },
          {
            title: "4. Guest Data",
            content: "You may input personal information about your hotel guests into the Service. You are the data controller for this guest data. CMR Group acts as a data processor on your behalf. You are responsible for obtaining appropriate consent from your guests and complying with applicable data protection laws when collecting and using guest information."
          },
          {
            title: "5. Data Storage",
            content: "Your data is stored on Supabase (PostgreSQL) servers. Hotel logos and room photos are stored on Supabase Storage. All data is encrypted at rest and in transit. We implement access controls to ensure your data is isolated from other customers' data."
          },
          {
            title: "6. Third-Party Services",
            content: "We use the following third-party services: Paystack (payment processing), Resend (email delivery), Anthropic Claude (AI Concierge), Sentry (error monitoring), Vercel (frontend hosting), Render (backend hosting). Each of these services has their own privacy policies. We only share data with these services as necessary to provide the Service."
          },
          {
            title: "7. Data Retention",
            content: "We retain your account data for as long as your account is active. After account termination, we retain data for 90 days before deletion, during which you may request an export. Audit logs are retained for 12 months. Payment records are retained for 7 years as required by Nigerian tax law."
          },
          {
            title: "8. Your Rights",
            content: "You have the right to: Access your personal data. Correct inaccurate data. Request deletion of your data. Export your data in a portable format. Withdraw consent where processing is based on consent. Lodge a complaint with relevant data protection authorities."
          },
          {
            title: "9. Security",
            content: "We implement security measures including: TLS encryption for all data in transit. Encryption at rest for stored data. Role-based access control. Regular security monitoring via Sentry. Rate limiting to prevent abuse. JWT-based authentication with expiring tokens."
          },
          {
            title: "10. Cookies",
            content: "CMR Hospitality Suite does not use tracking cookies. We use JWT tokens stored in localStorage for authentication. We do not use advertising or analytics cookies."
          },
          {
            title: "11. Children's Privacy",
            content: "The Service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from minors. If we become aware that a minor has provided personal information, we will delete it."
          },
          {
            title: "12. Changes to This Policy",
            content: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the updated policy."
          },
          {
            title: "13. Contact",
            content: "For privacy-related questions or to exercise your rights, contact CMR Group at privacy@cmrgroup.ng or through the support channel in your dashboard."
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>{section.title}</h2>
            <p style={{ color: "#374151", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{section.content}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "32px", display: "flex", gap: "24px" }}>
          <Link href="/legal/terms" style={{ color: "#B8952A", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>Terms of Service</Link>
          <Link href="/" style={{ color: "#6B7280", fontSize: "14px", textDecoration: "none" }}>Back to Home</Link>
        </div>
      </div>
    </main>
  );
}