"use client";
import Link from "next/link";
import { useState } from "react";

const halls = [
  { id: "EH-001", name: "Grand Ballroom", capacity: 500, size: "800 sqm", floor: 1, pricePerDay: 500000, status: "Available", amenities: ["AC", "Stage", "Sound System", "Projector", "WiFi", "Catering Kitchen"], description: "Our flagship event space perfect for weddings, galas, and large corporate events." },
  { id: "EH-002", name: "Executive Suite", capacity: 50, size: "120 sqm", floor: 2, pricePerDay: 150000, status: "Booked", amenities: ["AC", "Projector", "WiFi", "Whiteboard", "Video Conferencing"], description: "Ideal for board meetings, executive conferences, and private dining." },
  { id: "EH-003", name: "Garden Terrace", capacity: 200, size: "400 sqm", floor: 0, pricePerDay: 250000, status: "Available", amenities: ["Open Air", "Lighting", "Sound System", "Bar Setup"], description: "Beautiful outdoor venue for cocktail parties, outdoor weddings, and social events." },
  { id: "EH-004", name: "Conference Room A", capacity: 30, size: "60 sqm", floor: 2, pricePerDay: 80000, status: "Booked", amenities: ["AC", "Projector", "WiFi", "Whiteboard"], description: "Compact conference room for team meetings and training sessions." },
  { id: "EH-005", name: "Conference Room B", capacity: 30, size: "60 sqm", floor: 2, pricePerDay: 80000, status: "Available", amenities: ["AC", "Projector", "WiFi", "Whiteboard"], description: "Compact conference room for team meetings and training sessions." },
  { id: "EH-006", name: "Rooftop Lounge", capacity: 100, size: "200 sqm", floor: 4, pricePerDay: 180000, status: "Maintenance", amenities: ["Open Air", "Bar Setup", "Lighting", "Sound System"], description: "Stunning rooftop venue with panoramic city views for intimate gatherings." },
];

const bookings = [
  { id: "EB-001", hall: "Grand Ballroom", client: "Adeyemi Holdings", event: "Annual Gala Dinner", date: "Jun 20, 2025", guests: 350, amount: 500000, status: "Confirmed" },
  { id: "EB-002", hall: "Executive Suite", client: "First Bank Nigeria", event: "Board Meeting", date: "Jun 17, 2025", guests: 20, amount: 150000, status: "Confirmed" },
  { id: "EB-003", hall: "Conference Room A", client: "CMR Group", event: "Strategy Workshop", date: "Jun 18, 2025", guests: 25, amount: 80000, status: "Confirmed" },
  { id: "EB-004", hall: "Garden Terrace", client: "Obi-Nwosu Family", event: "Wedding Reception", date: "Jun 22, 2025", guests: 180, amount: 250000, status: "Pending" },
];

const statusColor: Record<string, string> = {
  "Available": "#15803d", "Booked": "#1B2D5B", "Maintenance": "#dc2626",
  "Confirmed": "#15803d", "Pending": "#B8952A", "Cancelled": "#dc2626",
};
const statusBg: Record<string, string> = {
  "Available": "#F0FDF4", "Booked": "#EEF2FF", "Maintenance": "#FEF2F2",
  "Confirmed": "#F0FDF4", "Pending": "#FFFBEB", "Cancelled": "#FEF2F2",
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const filters = ["All", "Available", "Booked", "Maintenance"];

export default function EventHalls() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("halls");

  const filtered = halls.filter((h) => {
    const matchFilter = activeFilter === "All" || h.status === activeFilter;
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: halls.length,
    available: halls.filter(h => h.status === "Available").length,
    booked: halls.filter(h => h.status === "Booked").length,
    maintenance: halls.filter(h => h.status === "Maintenance").length,
    revenue: bookings.filter(b => b.status === "Confirmed").reduce((sum, b) => sum + b.amount, 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>

      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Event Halls" ? "white" : "#94a3b8", backgroundColor: item === "Event Halls" ? "#243d75" : "transparent", fontWeight: item === "Event Halls" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Event Halls</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Event Hall Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search halls..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "200px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/event-halls/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Book Hall</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Halls", value: summary.total, color: "#1B2D5B" },
              { label: "Available", value: summary.available, color: "#15803d" },
              { label: "Booked", value: summary.booked, color: "#1B2D5B" },
              { label: "Maintenance", value: summary.maintenance, color: "#dc2626" },
              { label: "Event Revenue", value: `₦${(summary.revenue / 1000).toFixed(0)}K`, color: "#B8952A" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #E5E7EB", paddingBottom: "0" }}>
            {["halls", "bookings"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: "13px", border: "none", borderBottom: activeTab === tab ? "2px solid #1B2D5B" : "2px solid transparent", backgroundColor: "transparent", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>{tab}</button>
            ))}
          </div>

          {/* Halls Grid */}
          {activeTab === "halls" && (
            <>
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {filters.map((f) => (
                  <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {filtered.map((hall) => (
                  <div key={hall.id} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{hall.name}</h3>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{hall.id} · {hall.size} · Floor {hall.floor === 0 ? "Ground" : hall.floor}</p>
                      </div>
                      <span style={{ backgroundColor: statusBg[hall.status], color: statusColor[hall.status], padding: "4px 8px", fontSize: "10px", fontWeight: 600 }}>{hall.status}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 16px", lineHeight: 1.6 }}>{hall.description}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                      <div>
                        <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Capacity</p>
                        <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>{hall.capacity} guests</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Rate / Day</p>
                        <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>₦{hall.pricePerDay.toLocaleString()}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "16px" }}>
                      {hall.amenities.map((a) => (
                        <span key={a} style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 8px" }}>{a}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                      <Link href="#" style={{ fontSize: "12px", color: "#1B2D5B", textDecoration: "none", fontWeight: 500 }}>View</Link>
                      <Link href="#" style={{ fontSize: "12px", color: "#6B7280", textDecoration: "none" }}>Edit</Link>
                      {hall.status === "Available" && <Link href="/dashboard/event-halls/new" style={{ fontSize: "12px", color: "#B8952A", textDecoration: "none", marginLeft: "auto", fontWeight: 500 }}>Book →</Link>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Bookings Table */}
          {activeTab === "bookings" && (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Booking ID", "Hall", "Client", "Event", "Date", "Guests", "Amount", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{b.id}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{b.hall}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{b.client}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.event}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.date}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.guests}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>₦{b.amount.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ backgroundColor: statusBg[b.status], color: statusColor[b.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{b.status}</span>
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
          )}

        </div>
      </main>
    </div>
  );
}