"use client";
import Link from "next/link";

export default function CheckEmail() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "480px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#FFFBEB", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "32px" }}>📧</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>Check Your Email</h1>
          <p style={{ color: "#6B7280", fontSize: "15px", margin: "0 0 8px", lineHeight: 1.6 }}>
            We've sent a verification link to your email address.
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 32px", lineHeight: 1.6 }}>
            Please check your inbox and click the link to verify your account before signing in. Check your spam folder if you don't see it.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Link href="/login" style={{ backgroundColor: "#1B2D5B", color: "white", padding: "12px 24px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "block" }}>Go to Sign In</Link>
            <Link href="/" style={{ color: "#B8952A", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Back to Home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}