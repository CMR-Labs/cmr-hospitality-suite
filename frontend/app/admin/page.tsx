"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "cmr-admin-2025";

type Hotel = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  status: string;
  created_at: string;
};

type User = {
  id: string;
  full_name: string;
  email: string;
  status: string;
  email_verified: boolean;
  hotel_id: string;
  created_at: string;
};

export default function AdminPanel() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("hotels");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchData();
    } else {
      setPasswordError("Invalid admin password");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";
      const [hotelsRes, usersRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/admin/hotels`, {
          headers: { "x-admin-key": "cmr-admin-2025" },
        }),
        fetch(`${API_URL}/api/v1/admin/users`, {
          headers: { "x-admin-key": "cmr-admin-2025" },
        }),
      ]);
      if (hotelsRes.ok) setHotels(await hotelsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#0A1628", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ backgroundColor: "white", padding: "48px", width: "100%", maxWidth: "400px" }}>
          <div style={{ marginBottom: "32px", textAlign: "center" }}>
            <p style={{ fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 8px" }}>CMR Group</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Admin Panel</h1>
          </div>
          {passwordError && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{passwordError}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Admin Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} placeholder="••••••••" style={{ width: "100%", padding: "12px 16px", border: "1px solid #E5E7EB", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
            </div>
            <button onClick={handleLogin} style={{ backgroundColor: "#1B2D5B", color: "white", padding: "12px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>Access Admin Panel</button>
          </div>
        </div>
      </main>
    );
  }

  const summary = {
    totalHotels: hotels.length,
    activeHotels: hotels.filter(h => h.status === "Active").length,
    totalUsers: users.length,
    verifiedUsers: users.filter(u => u.email_verified).length,
  };

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F4F5F7" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#0A1628", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <p style={{ color: "white", fontSize: "16px", fontWeight: 700, margin: 0 }}>CMR Group</p>
          <span style={{ color: "#4B5563", fontSize: "14px" }}>|</span>
          <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Admin Panel</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={fetchData} style={{ color: "#94a3b8", fontSize: "12px", background: "none", border: "1px solid #243d75", cursor: "pointer", padding: "6px 12px" }}>Refresh</button>
          <button onClick={() => setAuthenticated(false)} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign Out</button>
        </div>
      </header>

      <div style={{ padding: "32px" }}>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {[
            { label: "Total Hotels", value: summary.totalHotels, color: "#1B2D5B" },
            { label: "Active Hotels", value: summary.activeHotels, color: "#15803d" },
            { label: "Total Users", value: summary.totalUsers, color: "#1B2D5B" },
            { label: "Verified Users", value: summary.verifiedUsers, color: "#B8952A" },
          ].map((s) => (
            <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #E5E7EB" }}>
          {["hotels", "users"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: "13px", border: "none", borderBottom: activeTab === tab ? "2px solid #1B2D5B" : "2px solid transparent", backgroundColor: "transparent", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>{tab}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading data...</p></div>
        ) : activeTab === "hotels" ? (
          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  {["Hotel Name", "Email", "Phone", "City", "Status", "Registered"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hotels.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No hotels registered yet.</td></tr>
                ) : hotels.map((h, i) => (
                  <tr key={h.id} style={{ borderBottom: i < hotels.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{h.name}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{h.email}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{h.phone || "—"}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{h.city || "—"}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: h.status === "Active" ? "#F0FDF4" : "#FEF2F2", color: h.status === "Active" ? "#15803d" : "#dc2626", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{h.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{h.created_at ? new Date(h.created_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  {["Full Name", "Email", "Status", "Email Verified", "Registered"].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No users registered yet.</td></tr>
                ) : users.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: i < users.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{u.full_name}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{u.email}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: u.status === "Active" ? "#F0FDF4" : "#FEF2F2", color: u.status === "Active" ? "#15803d" : "#dc2626", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{u.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: u.email_verified ? "#F0FDF4" : "#FFFBEB", color: u.email_verified ? "#15803d" : "#B8952A", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{u.email_verified ? "Verified" : "Pending"}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}