"use client";
import Link from "next/link";
import { useState } from "react";

const reservations = [
  { id: "RES-001", guest: "Adebayo Okonkwo", room: "Suite 101", type: "Suite", checkIn: "Jun 16, 2025", checkOut: "Jun 19, 2025", nights: 3, amount: 180000, status: "Confirmed", payment: "Paid", phone: "+234 801 234 5678" },
  { id: "RES-002", guest: "Amina Bello", room: "Deluxe 204", type: "Deluxe", checkIn: "Jun 16, 2025", checkOut: "Jun 18, 2025", nights: 2, amount: 70000, status: "Checked In", payment: "Paid", phone: "+234 802 345 6789" },
  { id: "RES-003", guest: "Emeka Nwosu", room: "Standard 312", type: "Standard", checkIn: "Jun 17, 2025", checkOut: "Jun 20, 2025", nights: 3, amount: 60000, status: "Confirmed", payment: "Pending", phone: "+234 803 456 7890" },
  { id: "RES-004", guest: "Ngozi Adeyemi", room: "Suite 105", type: "Suite", checkIn: "Jun 18, 2025", checkOut: "Jun 22, 2025", nights: 4, amount: 320000, status: "Confirmed", payment: "Partial", phone: "+234 804 567 8901" },
  { id: "RES-005", guest: "Tunde Bakare", room: "Deluxe 208", type: "Deluxe", checkIn: "Jun 15, 2025", checkOut: "Jun 16, 2025", nights: 1, amount: 35000, status: "Checked Out", payment: "Paid", phone: "+234 805 678 9012" },
  { id: "RES-006", guest: "Chioma Obi", room: "Suite 304", type: "Suite", checkIn: "Jun 20, 2025", checkOut: "Jun 25, 2025", nights: 5, amount: 425000, status: "Confirmed", payment: "Pending", phone: "+234 806 789 0123" },
  { id: "RES-007", guest: "Bashir Musa", room: "Standard 201", type: "Standard", checkIn: "Jun 14, 2025", checkOut: "Jun 16, 2025", nights: 2, amount: 40000, status: "Checked Out", payment: "Paid", phone: "+234 807 890 1234" },
  { id: "RES-008", guest: "Folake Adetoye", room: "Deluxe 103", type: "Deluxe", checkIn: "Jun 16, 2025", checkOut: "Jun 19, 2025", nights: 3, amount: 108000, status: "Cancelled", payment: "Refunded", phone: "+234 808 901 2345" },
];

const statusColor: Record<string, string> = {
  "Confirmed": "#1B2D5B", "Checked In": "#15803d", "Checked Out": "#6B7280",
  "Cancelled": "#dc2626", "Pending": "#B8952A",
};
const statusBg: Record<string, string> = {
  "Confirmed": "#EEF2FF", "Checked In": "#F0FDF4", "Checked Out": "#F3F4F6",
  "Cancelled": "#FEF2F2", "Pending": "#FFFBEB",
};
const paymentColor: Record<string, string> = {
  "Paid": "#15803d", "Pending": "#B8952A", "Partial": "#1B2D5B", "Refunded": "#6B7280",
};

const filters = ["All", "Today", "Upcoming", "Checked In", "Checked Out", "Cancelled", "Pending Payment"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Reservations() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = reservations.filter((r) => {
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "Checked In" && r.status === "Checked In") ||
      (activeFilter === "Checked Out" && r.status === "Checked Out") ||
      (activeFilter === "Cancelled" && r.status === "Cancelled") ||
      (activeFilter === "Pending Payment" && r.payment === "Pending") ||
      (activeFilter === "Today" && (r.checkIn.includes("Jun 16") || r.checkOut.includes("Jun 16"))) ||
      (activeFilter === "Upcoming" && r.status === "Confirmed");
    const matchSearch =
      r.guest.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.room.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === "Confirmed").length,
    checkedIn: reservations.filter(r => r.status === "Checked In").length,
    checkedOut: reservations.filter(r => r.status === "Checked Out").length,
    cancelled: reservations.filter(r => r.status === "Cancelled").length,
    revenue: reservations.filter(r => r.payment === "Paid").reduce((sum, r) => sum + r.amount, 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>

      {/* Sidebar */}
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Reservations" ? "white" : "#94a3b8", backgroundColor: item === "Reservations" ? "#243d75" : "transparent", fontWeight: item === "Reservations" ? 600 : 400, borderRadius: "4px" }}>
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

      {/* Main */}
      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Header */}
        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Reservations</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Reservation Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guest, room, ID..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/reservations/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ New Reservation</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: summary.total, color: "#1B2D5B" },
              { label: "Confirmed", value: summary.confirmed, color: "#1B2D5B" },
              { label: "Checked In", value: summary.checkedIn, color: "#15803d" },
              { label: "Checked Out", value: summary.checkedOut, color: "#6B7280" },
              { label: "Cancelled", value: summary.cancelled, color: "#dc2626" },
              { label: "Revenue", value: `₦${(summary.revenue / 1000).toFixed(0)}K`, color: "#B8952A" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: 700, color: s.color, margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
            ))}
          </div>

          {/* Table */}
          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  {["ID", "Guest", "Room", "Check In", "Check Out", "Nights", "Amount", "Payment", "Status", ""].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{r.id}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{r.guest}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{r.phone}</p>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{r.room}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{r.type}</p>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.checkIn}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.checkOut}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.nights}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{r.amount.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: paymentColor[r.payment] }}>{r.payment}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: statusBg[r.status], color: statusColor[r.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{r.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href="#" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none" }}>View</Link>
                        <Link href="#" style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                        {r.status === "Confirmed" && <Link href="#" style={{ color: "#15803d", fontSize: "11px", textDecoration: "none" }}>Check In</Link>}
                        {r.status === "Checked In" && <Link href="#" style={{ color: "#1B2D5B", fontSize: "11px", textDecoration: "none" }}>Check Out</Link>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No reservations found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}