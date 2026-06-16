"use client";
import Link from "next/link";
import { useState } from "react";

const payments = [
  { id: "PAY-001", guest: "Adebayo Okonkwo", reservation: "RES-001", room: "Suite 101", amount: 180000, method: "Bank Transfer", status: "Successful", date: "Jun 16, 2025", time: "09:14 AM", type: "Reservation" },
  { id: "PAY-002", guest: "Amina Bello", reservation: "RES-002", room: "Deluxe 204", amount: 70000, method: "Card", status: "Successful", date: "Jun 16, 2025", time: "10:32 AM", type: "Reservation" },
  { id: "PAY-003", guest: "Emeka Nwosu", reservation: "RES-003", room: "Standard 312", amount: 60000, method: "Paystack", status: "Pending", date: "Jun 16, 2025", time: "11:05 AM", type: "Reservation" },
  { id: "PAY-004", guest: "Ngozi Adeyemi", reservation: "RES-004", room: "Suite 105", amount: 160000, method: "Bank Transfer", status: "Successful", date: "Jun 16, 2025", time: "11:48 AM", type: "Partial Payment" },
  { id: "PAY-005", guest: "Tunde Bakare", reservation: "RES-005", room: "Deluxe 208", amount: 35000, method: "Cash", status: "Successful", date: "Jun 15, 2025", time: "03:22 PM", type: "Reservation" },
  { id: "PAY-006", guest: "Chioma Obi", reservation: "RES-006", room: "Suite 304", amount: 425000, method: "Flutterwave", status: "Pending", date: "Jun 16, 2025", time: "02:10 PM", type: "Reservation" },
  { id: "PAY-007", guest: "Folake Adetoye", reservation: "RES-008", room: "Deluxe 103", amount: 108000, method: "Card", status: "Refunded", date: "Jun 16, 2025", time: "04:55 PM", type: "Refund" },
  { id: "PAY-008", guest: "Bashir Musa", reservation: "RES-007", room: "Standard 201", amount: 40000, method: "Cash", status: "Successful", date: "Jun 14, 2025", time: "01:30 PM", type: "Reservation" },
];

const statusColor: Record<string, string> = {
  "Successful": "#15803d", "Pending": "#B8952A", "Refunded": "#6B7280", "Failed": "#dc2626",
};
const statusBg: Record<string, string> = {
  "Successful": "#F0FDF4", "Pending": "#FFFBEB", "Refunded": "#F3F4F6", "Failed": "#FEF2F2",
};
const methodColor: Record<string, string> = {
  "Bank Transfer": "#1B2D5B", "Card": "#1B2D5B", "Paystack": "#1B2D5B", "Flutterwave": "#1B2D5B", "Cash": "#6B7280",
};

const filters = ["All", "Successful", "Pending", "Refunded", "Failed"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Payments() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = payments.filter((p) => {
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    const matchSearch =
      p.guest.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.reservation.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: payments.reduce((sum, p) => sum + (p.status === "Successful" ? p.amount : 0), 0),
    pending: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
    refunded: payments.filter(p => p.status === "Refunded").reduce((sum, p) => sum + p.amount, 0),
    count: payments.filter(p => p.status === "Successful").length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>

      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Payments" ? "white" : "#94a3b8", backgroundColor: item === "Payments" ? "#243d75" : "transparent", fontWeight: item === "Payments" ? 600 : 400, borderRadius: "4px" }}>
              {item}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "16px", borderTop: "1px solid #243d75" }}>
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>Parkview Hotel Abuja</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>Admin</p>
          <Link href="/login" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Payments</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Payment Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guest, ID, reservation..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/payments/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Record Payment</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Revenue", value: `₦${(summary.total / 1000000).toFixed(2)}M`, sub: "Successful payments", color: "#15803d" },
              { label: "Pending", value: `₦${(summary.pending / 1000).toFixed(0)}K`, sub: `${payments.filter(p => p.status === "Pending").length} transactions`, color: "#B8952A" },
              { label: "Refunded", value: `₦${(summary.refunded / 1000).toFixed(0)}K`, sub: `${payments.filter(p => p.status === "Refunded").length} transactions`, color: "#6B7280" },
              { label: "Transactions", value: summary.count, sub: "Successful today", color: "#1B2D5B" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
            ))}
          </div>

          {/* Table */}
          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  {["Payment ID", "Guest", "Reservation", "Type", "Amount", "Method", "Date", "Status", ""].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{p.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{p.guest}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{p.reservation}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{p.room}</p>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{p.type}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>₦{p.amount.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "11px", color: methodColor[p.method], backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 500 }}>{p.method}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{p.date}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{p.time}</p>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: statusBg[p.status], color: statusColor[p.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{p.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Link href="#" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none", marginRight: "8px" }}>View</Link>
                      {p.status === "Pending" && <Link href="#" style={{ color: "#15803d", fontSize: "11px", textDecoration: "none" }}>Confirm</Link>}
                      {p.status === "Successful" && <Link href="#" style={{ color: "#dc2626", fontSize: "11px", textDecoration: "none" }}>Refund</Link>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No payments found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}