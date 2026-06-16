"use client";
import Link from "next/link";
import { useState } from "react";

const guests = [
  { id: "GST-001", name: "Adebayo Okonkwo", email: "adebayo@email.com", phone: "+234 801 234 5678", nationality: "Nigerian", idType: "National ID", stays: 4, totalSpend: 480000, lastStay: "Jun 16, 2025", status: "Active", vip: true, preferredRoom: "Suite", notes: "Prefers high floor, quiet room" },
  { id: "GST-002", name: "Amina Bello", email: "amina@email.com", phone: "+234 802 345 6789", nationality: "Nigerian", idType: "Passport", stays: 2, totalSpend: 140000, lastStay: "Jun 16, 2025", status: "Active", vip: false, preferredRoom: "Deluxe", notes: "" },
  { id: "GST-003", name: "Emeka Nwosu", email: "emeka@email.com", phone: "+234 803 456 7890", nationality: "Nigerian", idType: "Driver's License", stays: 1, totalSpend: 60000, lastStay: "Jun 17, 2025", status: "Active", vip: false, preferredRoom: "Standard", notes: "" },
  { id: "GST-004", name: "Ngozi Adeyemi", email: "ngozi@email.com", phone: "+234 804 567 8901", nationality: "Nigerian", idType: "National ID", stays: 6, totalSpend: 920000, lastStay: "Jun 18, 2025", status: "Active", vip: true, preferredRoom: "Suite", notes: "VIP corporate client — Adeyemi Holdings" },
  { id: "GST-005", name: "Tunde Bakare", email: "tunde@email.com", phone: "+234 805 678 9012", nationality: "Nigerian", idType: "Passport", stays: 3, totalSpend: 195000, lastStay: "Jun 16, 2025", status: "Checked Out", vip: false, preferredRoom: "Deluxe", notes: "" },
  { id: "GST-006", name: "Chioma Obi", email: "chioma@email.com", phone: "+234 806 789 0123", nationality: "Nigerian", idType: "National ID", stays: 2, totalSpend: 425000, lastStay: "Jun 20, 2025", status: "Upcoming", vip: true, preferredRoom: "Suite", notes: "Honeymoon guest — arrange welcome package" },
  { id: "GST-007", name: "Bashir Musa", email: "bashir@email.com", phone: "+234 807 890 1234", nationality: "Nigerian", idType: "Driver's License", stays: 1, totalSpend: 40000, lastStay: "Jun 14, 2025", status: "Checked Out", vip: false, preferredRoom: "Standard", notes: "" },
  { id: "GST-008", name: "Folake Adetoye", email: "folake@email.com", phone: "+234 808 901 2345", nationality: "Nigerian", idType: "Passport", stays: 1, totalSpend: 0, lastStay: "Jun 16, 2025", status: "Cancelled", vip: false, preferredRoom: "Deluxe", notes: "Cancelled reservation — refund processed" },
];

const statusColor: Record<string, string> = {
  "Active": "#15803d", "Checked Out": "#6B7280", "Upcoming": "#1B2D5B", "Cancelled": "#dc2626",
};
const statusBg: Record<string, string> = {
  "Active": "#F0FDF4", "Checked Out": "#F3F4F6", "Upcoming": "#EEF2FF", "Cancelled": "#FEF2F2",
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const filters = ["All", "Active", "Upcoming", "Checked Out", "VIP", "Cancelled"];

export default function Guests() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = guests.filter((g) => {
    const matchFilter =
      activeFilter === "All" ||
      (activeFilter === "VIP" && g.vip) ||
      g.status === activeFilter;
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.email.toLowerCase().includes(search.toLowerCase()) ||
      g.phone.includes(search) ||
      g.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: guests.length,
    active: guests.filter(g => g.status === "Active").length,
    vip: guests.filter(g => g.vip).length,
    checkedOut: guests.filter(g => g.status === "Checked Out").length,
    upcoming: guests.filter(g => g.status === "Upcoming").length,
    totalRevenue: guests.reduce((sum, g) => sum + g.totalSpend, 0),
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
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Guests" ? "white" : "#94a3b8", backgroundColor: item === "Guests" ? "#243d75" : "transparent", fontWeight: item === "Guests" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Guests</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Guest Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email, phone..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/guests/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Guest</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total Guests", value: summary.total, color: "#1B2D5B" },
              { label: "Active", value: summary.active, color: "#15803d" },
              { label: "VIP Guests", value: summary.vip, color: "#B8952A" },
              { label: "Upcoming", value: summary.upcoming, color: "#1B2D5B" },
              { label: "Checked Out", value: summary.checkedOut, color: "#6B7280" },
              { label: "Total Revenue", value: `₦${(summary.totalRevenue / 1000).toFixed(0)}K`, color: "#B8952A" },
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
                  {["Guest", "Contact", "ID Type", "Stays", "Total Spend", "Last Stay", "Preferred Room", "Status", ""].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((g, i) => (
                  <tr key={g.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", backgroundColor: g.vip ? "#B8952A" : "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                          {g.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{g.name}</p>
                            {g.vip && <span style={{ fontSize: "9px", backgroundColor: "#FFFBEB", color: "#B8952A", padding: "1px 6px", fontWeight: 700 }}>VIP</span>}
                          </div>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>{g.id}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{g.email}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{g.phone}</p>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.idType}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500, textAlign: "center" }}>{g.stays}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{g.totalSpend.toLocaleString()}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.lastStay}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.preferredRoom}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: statusBg[g.status], color: statusColor[g.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{g.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Link href={`/dashboard/guests/${g.id}`} style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none" }}>View</Link>
                        <Link href={`/dashboard/guests/${g.id}/edit`} style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No guests found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}