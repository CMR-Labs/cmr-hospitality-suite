"use client";
import Link from "next/link";
import { useState } from "react";

const kpis = [
  { label: "Occupancy Rate", value: "82%", sub: "+5% from yesterday", positive: true },
  { label: "Today's Reservations", value: "34", sub: "+3 from yesterday", positive: true },
  { label: "Revenue Today", value: "₦2.45M", sub: "+12% vs last week", positive: true },
  { label: "Active Guests", value: "127", sub: "+8 checked in today", positive: true },
];

const reservations = [
  { guest: "Adebayo Okonkwo", room: "Suite 101", checkIn: "Today", checkOut: "Jun 19", status: "Confirmed" },
  { guest: "Amina Bello", room: "Deluxe 204", checkIn: "Today", checkOut: "Jun 18", status: "Checked In" },
  { guest: "Emeka Nwosu", room: "Standard 312", checkIn: "Today", checkOut: "Jun 20", status: "Confirmed" },
  { guest: "Ngozi Adeyemi", room: "Suite 105", checkIn: "Today", checkOut: "Jun 22", status: "Pending" },
  { guest: "Tunde Bakare", room: "Deluxe 208", checkIn: "Jun 15", checkOut: "Today", status: "Checked Out" },
];

const statusColor: Record<string, string> = { "Confirmed": "#1B2D5B", "Checked In": "#15803d", "Checked Out": "#6B7280", "Pending": "#B8952A" };
const statusBg: Record<string, string> = { "Confirmed": "#EEF2FF", "Checked In": "#F0FDF4", "Checked Out": "#F3F4F6", "Pending": "#FFFBEB" };

const rooms = [
  { label: "Available", count: 42, color: "#15803d" },
  { label: "Occupied", count: 38, color: "#1B2D5B" },
  { label: "Reserved", count: 12, color: "#B8952A" },
  { label: "Cleaning", count: 6, color: "#6B7280" },
  { label: "Maintenance", count: 2, color: "#dc2626" },
];

const activity = [
  { text: "Reservation created — Suite 101, Adebayo Okonkwo", time: "2 min ago" },
  { text: "Guest checked in — Deluxe 204, Amina Bello", time: "14 min ago" },
  { text: "Payment received — ₦180,000, RES-001", time: "32 min ago" },
  { text: "Room marked clean — Standard 308", time: "1 hr ago" },
  { text: "Event hall reserved — Hall A, June 20", time: "2 hr ago" },
  { text: "Booking cancelled — RES-089, John Mensah", time: "3 hr ago" },
];

const quickActions = [
  { label: "New Reservation", href: "/dashboard/reservations/new" },
  { label: "Add Guest", href: "/dashboard/guests/new" },
  { label: "Add Room", href: "/dashboard/rooms/new" },
  { label: "Book Event Hall", href: "/dashboard/events/new" },
  { label: "Record Payment", href: "/dashboard/payments/new" },
  { label: "Generate Report", href: "/dashboard/reports" },
];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const occupancyData = [62, 70, 75, 68, 80, 78, 82];
const revenueData = [1.2, 1.8, 1.5, 2.1, 1.9, 2.4, 2.45];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("7d");
  const [revenueTab, setRevenueTab] = useState("daily");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>

      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Dashboard" ? "white" : "#94a3b8", backgroundColor: item === "Dashboard" ? "#243d75" : "transparent", fontWeight: item === "Dashboard" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Dashboard</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Monday, June 16, 2025</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input placeholder="Search guests, rooms, reservations..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "260px", backgroundColor: "#F9FAFB" }} />
            <button style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>🔔</button>
            <button style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>💬</button>
            <Link href="/dashboard/reservations/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ New Reservation</Link>
            <div style={{ width: "34px", height: "34px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700 }}>PH</div>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {kpis.map((k) => (
              <div key={k.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{k.value}</p>
                <p style={{ fontSize: "11px", margin: 0, color: k.positive ? "#15803d" : "#dc2626" }}>↑ {k.sub}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Occupancy Trend</h2>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["7d", "30d", "12m"].map((t) => (
                    <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "4px 10px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: activeTab === t ? "#1B2D5B" : "white", color: activeTab === t ? "white" : "#6B7280", cursor: "pointer" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
                {occupancyData.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                      <div style={{ width: "100%", backgroundColor: i === 6 ? "#1B2D5B" : "#E8EDF5", height: `${val}%` }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Revenue Trend</h2>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["daily", "weekly", "monthly"].map((t) => (
                    <button key={t} onClick={() => setRevenueTab(t)} style={{ padding: "4px 10px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: revenueTab === t ? "#B8952A" : "white", color: revenueTab === t ? "white" : "#6B7280", cursor: "pointer" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" }}>
                {revenueData.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                      <div style={{ width: "100%", backgroundColor: i === 6 ? "#B8952A" : "#F5EDD6", height: `${(val / 2.45) * 100}%` }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "16px", marginBottom: "24px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Recent Reservations</h2>
                <Link href="/dashboard/reservations" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>View all →</Link>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Guest", "Room", "Check In", "Check Out", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r, i) => (
                    <tr key={i} style={{ borderBottom: i < reservations.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{r.guest}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.room}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.checkIn}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.checkOut}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ backgroundColor: statusBg[r.status], color: statusColor[r.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{r.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Link href="#" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none", marginRight: "8px" }}>View</Link>
                        <Link href="#" style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Quick Actions</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {quickActions.map((a) => (
                  <Link key={a.label} href={a.href} style={{ display: "block", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", textDecoration: "none", fontWeight: 500 }}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Room Status</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {rooms.map((r) => (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: r.color }} />
                      <span style={{ fontSize: "13px", color: "#374151" }}>{r.label}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "120px", height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                        <div style={{ width: `${(r.count / 42) * 100}%`, height: "100%", backgroundColor: r.color, borderRadius: "3px" }} />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#1B2D5B", minWidth: "24px", textAlign: "right" }}>{r.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Recent Activity</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {activity.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", paddingBottom: "12px", borderBottom: i < activity.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8952A", marginTop: "5px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: "12px", color: "#374151", margin: "0 0 2px", lineHeight: 1.5 }}>{a.text}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}