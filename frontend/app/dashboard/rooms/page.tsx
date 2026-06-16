"use client";
import Link from "next/link";
import { useState } from "react";

const rooms = [
  { id: "101", type: "Suite", floor: 1, capacity: 2, price: 60000, status: "Occupied", amenities: ["AC", "WiFi", "TV", "Minibar", "Jacuzzi"], notes: "VIP room" },
  { id: "102", type: "Deluxe", floor: 1, capacity: 2, price: 35000, status: "Available", amenities: ["AC", "WiFi", "TV"], notes: "" },
  { id: "103", type: "Standard", floor: 1, capacity: 2, price: 20000, status: "Cleaning", amenities: ["AC", "WiFi"], notes: "" },
  { id: "104", type: "Suite", floor: 1, capacity: 4, price: 80000, status: "Reserved", amenities: ["AC", "WiFi", "TV", "Minibar", "Jacuzzi", "Kitchen"], notes: "Corporate booking" },
  { id: "201", type: "Deluxe", floor: 2, capacity: 2, price: 35000, status: "Available", amenities: ["AC", "WiFi", "TV"], notes: "" },
  { id: "202", type: "Standard", floor: 2, capacity: 1, price: 18000, status: "Maintenance", amenities: ["AC", "WiFi"], notes: "AC unit repair" },
  { id: "203", type: "Deluxe", floor: 2, capacity: 2, price: 38000, status: "Occupied", amenities: ["AC", "WiFi", "TV", "Balcony"], notes: "" },
  { id: "204", type: "Suite", floor: 2, capacity: 3, price: 65000, status: "Available", amenities: ["AC", "WiFi", "TV", "Minibar"], notes: "" },
  { id: "301", type: "Standard", floor: 3, capacity: 2, price: 20000, status: "Available", amenities: ["AC", "WiFi"], notes: "" },
  { id: "302", type: "Standard", floor: 3, capacity: 2, price: 20000, status: "Out of Service", amenities: ["AC", "WiFi"], notes: "Renovation in progress" },
  { id: "303", type: "Deluxe", floor: 3, capacity: 2, price: 36000, status: "Occupied", amenities: ["AC", "WiFi", "TV"], notes: "" },
  { id: "304", type: "Suite", floor: 3, capacity: 4, price: 85000, status: "Reserved", amenities: ["AC", "WiFi", "TV", "Minibar", "Jacuzzi", "Kitchen", "Balcony"], notes: "Honeymoon suite" },
];

const statusColor: Record<string, string> = {
  "Available": "#15803d", "Occupied": "#1B2D5B", "Reserved": "#B8952A",
  "Cleaning": "#6B7280", "Maintenance": "#dc2626", "Out of Service": "#991b1b",
};
const statusBg: Record<string, string> = {
  "Available": "#F0FDF4", "Occupied": "#EEF2FF", "Reserved": "#FFFBEB",
  "Cleaning": "#F3F4F6", "Maintenance": "#FEF2F2", "Out of Service": "#FEF2F2",
};

const statuses = ["All", "Available", "Occupied", "Reserved", "Cleaning", "Maintenance", "Out of Service"];
const types = ["All", "Suite", "Deluxe", "Standard"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Rooms() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = rooms.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchType = typeFilter === "All" || r.type === typeFilter;
    const matchSearch = r.id.includes(search) || r.type.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchType && matchSearch;
  });

  const summary = {
    total: rooms.length,
    available: rooms.filter(r => r.status === "Available").length,
    occupied: rooms.filter(r => r.status === "Occupied").length,
    reserved: rooms.filter(r => r.status === "Reserved").length,
    cleaning: rooms.filter(r => r.status === "Cleaning").length,
    maintenance: rooms.filter(r => r.status === "Maintenance" || r.status === "Out of Service").length,
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
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Rooms" ? "white" : "#94a3b8", backgroundColor: item === "Rooms" ? "#243d75" : "transparent", fontWeight: item === "Rooms" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Rooms</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Room Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search rooms..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "200px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setView("grid")} style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: view === "grid" ? "#1B2D5B" : "white", color: view === "grid" ? "white" : "#6B7280", fontSize: "12px", cursor: "pointer" }}>Grid</button>
            <button onClick={() => setView("list")} style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: view === "list" ? "#1B2D5B" : "white", color: view === "list" ? "white" : "#6B7280", fontSize: "12px", cursor: "pointer" }}>List</button>
            <Link href="/dashboard/rooms/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Room</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total Rooms", value: summary.total, color: "#1B2D5B" },
              { label: "Available", value: summary.available, color: "#15803d" },
              { label: "Occupied", value: summary.occupied, color: "#1B2D5B" },
              { label: "Reserved", value: summary.reserved, color: "#B8952A" },
              { label: "Cleaning", value: summary.cleaning, color: "#6B7280" },
              { label: "Maintenance", value: summary.maintenance, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "22px", fontWeight: 700, color: s.color, margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {statuses.map((s) => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 12px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: statusFilter === s ? "#1B2D5B" : "white", color: statusFilter === s ? "white" : "#6B7280", cursor: "pointer" }}>{s}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginLeft: "16px" }}>
              {types.map((t) => (
                <button key={t} onClick={() => setTypeFilter(t)} style={{ padding: "6px 12px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: typeFilter === t ? "#B8952A" : "white", color: typeFilter === t ? "white" : "#6B7280", cursor: "pointer" }}>{t}</button>
              ))}
            </div>
          </div>

          {/* Grid View */}
          {view === "grid" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
              {filtered.map((room) => (
                <div key={room.id} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Room {room.id}</p>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0" }}>{room.type} · Floor {room.floor}</p>
                    </div>
                    <span style={{ backgroundColor: statusBg[room.status], color: statusColor[room.status], padding: "4px 8px", fontSize: "10px", fontWeight: 600 }}>{room.status}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                    <div>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Capacity</p>
                      <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{room.capacity} guests</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Rate / Night</p>
                      <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>₦{room.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "12px" }}>
                    {room.amenities.map((a) => (
                      <span key={a} style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 8px" }}>{a}</span>
                    ))}
                  </div>
                  {room.notes && <p style={{ fontSize: "11px", color: "#B8952A", margin: "0 0 12px", fontStyle: "italic" }}>{room.notes}</p>}
                  <div style={{ display: "flex", gap: "8px", borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                    <Link href={`/dashboard/rooms/${room.id}`} style={{ fontSize: "12px", color: "#1B2D5B", textDecoration: "none", fontWeight: 500 }}>View</Link>
                    <Link href={`/dashboard/rooms/${room.id}/edit`} style={{ fontSize: "12px", color: "#6B7280", textDecoration: "none" }}>Edit</Link>
                    {room.status === "Available" && <Link href="/dashboard/reservations/new" style={{ fontSize: "12px", color: "#B8952A", textDecoration: "none", marginLeft: "auto" }}>Reserve →</Link>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {view === "list" && (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Room", "Type", "Floor", "Capacity", "Rate/Night", "Amenities", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((room, i) => (
                    <tr key={room.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>Room {room.id}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#374151" }}>{room.type}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6B7280" }}>Floor {room.floor}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6B7280" }}>{room.capacity} guests</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{room.price.toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {room.amenities.slice(0, 3).map((a) => (
                            <span key={a} style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 6px" }}>{a}</span>
                          ))}
                          {room.amenities.length > 3 && <span style={{ fontSize: "10px", color: "#9CA3AF" }}>+{room.amenities.length - 3}</span>}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ backgroundColor: statusBg[room.status], color: statusColor[room.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{room.status}</span>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <Link href={`/dashboard/rooms/${room.id}`} style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none", marginRight: "8px" }}>View</Link>
                        <Link href={`/dashboard/rooms/${room.id}/edit`} style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
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