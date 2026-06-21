"use client";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) { setError("Please enter your email address"); return; }
    setLoading(true);
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";
      await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <Link href="/login" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>Back to Sign In</Link>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "440px" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "48px", height: "48px", backgroundColor: "#FFFBEB", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "24px" }}>📧</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>Check your email</h1>
              <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 24px", lineHeight: 1.6 }}>
                If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox and spam folder.
              </p>
              <Link href="/login" style={{ color: "#B8952A", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Back to Sign In</Link>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "32px" }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Forgot Password</h1>
                <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>Enter your email and we'll send you a reset link.</p>
              </div>
              {error && <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "12px 16px", marginBottom: "20px" }}><p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p></div>}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} placeholder="you@hotel.com" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", backgroundColor: loading ? "#6B7280" : "#1B2D5B", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <div style={{ textAlign: "center" }}>
                  <Link href="/login" style={{ color: "#B8952A", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Back to Sign In</Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}