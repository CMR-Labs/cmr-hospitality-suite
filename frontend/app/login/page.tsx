"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await api.post("/api/v1/auth/login", { email, password });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", borderBottom: "1px solid #243d75", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Don't have an account? <Link href="/register" style={{ color: "#B8952A", textDecoration: "none", fontWeight: 600 }}>Sign up</Link></p>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "440px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Welcome back</h1>
            <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>Sign in to your CMR Hospitality Suite account</p>
          </div>
          {error && (
            <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "12px 16px", marginBottom: "20px" }}>
              <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hotel.com" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <label style={{ fontSize: "13px", fontWeight: 500, color: "#1B2D5B" }}>Password</label>
                <Link href="/forgot-password" style={{ fontSize: "12px", color: "#B8952A", textDecoration: "none" }}>Forgot password?</Link>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <button onClick={handleLogin} disabled={loading} style={{ width: "100%", backgroundColor: loading ? "#6B7280" : "#1B2D5B", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "8px" }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <div style={{ borderTop: "1px solid #e5e0d8", paddingTop: "20px", textAlign: "center" }}>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: 0 }}>Don't have an account? <Link href="/register" style={{ color: "#B8952A", textDecoration: "none", fontWeight: 600 }}>Create one free</Link></p>
            </div>
          </div>
        </div>
      </div>
      <footer style={{ backgroundColor: "#0F1E3D", borderTop: "1px solid #243d75", padding: "20px 48px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ color: "#4B5563", fontSize: "12px", margin: 0 }}>© 2021 CMR Group · All rights reserved</p>
        <a href="https://personal-website-tau-ten-68.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
          <img src="/cmr-group-logo.jpeg" alt="CMR Group" style={{ height: "28px", width: "auto" }} />
          <span style={{ color: "#94a3b8", fontSize: "12px" }}>A product of CMR Group</span>
        </a>
      </footer>
    </main>
  );
}