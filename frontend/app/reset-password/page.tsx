"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) { setError("Invalid reset link."); return; }
    setToken(t);
  }, [searchParams]);

  const handleReset = async () => {
    if (!password || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    setError("");
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";
      const response = await fetch(`${API_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Reset failed");
      }
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "440px" }}>
      {success ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#F0FDF4", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#15803d", fontSize: "24px" }}>✓</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>Password Reset!</h1>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 8px" }}>Your password has been updated successfully.</p>
          <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>Redirecting to login...</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Reset Password</h1>
            <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>Enter your new password below.</p>
          </div>
          {error && <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "12px 16px", marginBottom: "20px" }}><p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p></div>}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleReset()} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <button onClick={handleReset} disabled={loading} style={{ width: "100%", backgroundColor: loading ? "#6B7280" : "#1B2D5B", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            <div style={{ textAlign: "center" }}>
              <Link href="/login" style={{ color: "#B8952A", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>Back to Sign In</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function ResetPassword() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <Suspense fallback={<div style={{ color: "#9CA3AF" }}>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}