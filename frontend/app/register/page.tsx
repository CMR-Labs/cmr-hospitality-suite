"use client";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ hotelName: "", fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", borderBottom: "1px solid #243d75", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Already have an account? <Link href="/login" style={{ color: "#B8952A", textDecoration: "none", fontWeight: 600 }}>Sign in</Link></p>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "520px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Create your account</h1>
            <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>Get started with CMR Hospitality Suite — free to try</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Hotel / Business Name</label>
              <input type="text" name="hotelName" value={form.hotelName} onChange={handle} placeholder="e.g. Parkview Hotel Abuja" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handle} placeholder="Your full name" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@hotel.com" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder="+234 000 000 0000" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Password</label>
                <input type="password" name="password" value={form.password} onChange={handle} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handle} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #e5e0d8", fontSize: "14px", color: "#1B2D5B", outline: "none", boxSizing: "border-box", backgroundColor: "#FAFAF9" }} />
              </div>
            </div>
            <button style={{ width: "100%", backgroundColor: "#B8952A", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", marginTop: "8px" }}>Create Account</button>
            <p style={{ color: "#6B7280", fontSize: "12px", textAlign: "center", margin: 0, lineHeight: 1.6 }}>
              By creating an account you agree to our <Link href="/terms" style={{ color: "#B8952A", textDecoration: "none" }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: "#B8952A", textDecoration: "none" }}>Privacy Policy</Link>.
            </p>
            <div style={{ borderTop: "1px solid #e5e0d8", paddingTop: "20px", textAlign: "center" }}>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: 0 }}>Already have an account? <Link href="/login" style={{ color: "#B8952A", textDecoration: "none", fontWeight: 600 }}>Sign in</Link></p>
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
