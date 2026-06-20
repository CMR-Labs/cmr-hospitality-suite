"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

type Notification = {
  id: number;
  title: string;
  message: string;
  type: string;
  read: boolean;
  time: string;
};

const mockNotifications: Notification[] = [
  { id: 1, title: "New Reservation", message: "A new reservation has been created for Room 101", type: "reservation", read: false, time: "2 min ago" },
  { id: 2, title: "Payment Received", message: "Payment of ₦180,000 received for RES-001", type: "payment", read: false, time: "15 min ago" },
  { id: 3, title: "Guest Checked In", message: "Adebayo Okonkwo has checked into Room 101", type: "checkin", read: false, time: "1 hr ago" },
  { id: 4, title: "Housekeeping Task", message: "Room 202 cleaning task is overdue", type: "housekeeping", read: true, time: "2 hr ago" },
  { id: 5, title: "Event Booking", message: "Grand Ballroom booked for June 20 — Adeyemi Holdings Gala", type: "event", read: true, time: "3 hr ago" },
  { id: 6, title: "Low Occupancy Alert", message: "Occupancy dropped below 60% for Floor 3", type: "alert", read: true, time: "5 hr ago" },
  { id: 7, title: "Guest Checked Out", message: "Tunde Bakare has checked out of Room 208", type: "checkout", read: true, time: "6 hr ago" },
  { id: 8, title: "Payment Pending", message: "Payment for RES-006 is still pending — ₦425,000", type: "payment", read: true, time: "8 hr ago" },
];

const typeColor: Record<string, string> = {
  "reservation": "#1B2D5B", "payment": "#15803d", "checkin": "#15803d",
  "checkout": "#6B7280", "housekeeping": "#B8952A", "event": "#1B2D5B", "alert": "#dc2626",
};
const typeBg: Record<string, string> = {
  "reservation": "#EEF2FF", "payment": "#F0FDF4", "checkin": "#F0FDF4",
  "checkout": "#F3F4F6", "housekeeping": "#FFFBEB", "event": "#EEF2FF", "alert": "#FEF2F2",
};

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filtered = notifications.filter(n => {
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Notifications" ? "white" : "#94a3b8", backgroundColor: item === "Notifications" ? "#243d75" : "transparent", fontWeight: item === "Notifications" ? 600 : 400, borderRadius: "4px" }}>
              {item}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "16px", borderTop: "1px solid #243d75" }}>
          <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Notifications</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>{unreadCount} unread notifications</p>
          </div>
          <button onClick={markAllRead} style={{ padding: "8px 16px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>Mark all as read</button>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
            {["All", "Unread", "Read"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: filter === f ? "#1B2D5B" : "white", color: filter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filtered.map((n) => (
              <div key={n.id} onClick={() => markRead(n.id)} style={{ backgroundColor: n.read ? "white" : "#F8F9FF", border: `1px solid ${n.read ? "#E5E7EB" : "#C7D2FE"}`, padding: "16px 20px", cursor: "pointer", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: n.read ? "#E5E7EB" : "#1B2D5B", marginTop: "5px", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: n.read ? 400 : 600, margin: 0 }}>{n.title}</p>
                      <span style={{ backgroundColor: typeBg[n.type], color: typeColor[n.type], padding: "2px 8px", fontSize: "10px", fontWeight: 600, textTransform: "capitalize" }}>{n.type}</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0, whiteSpace: "nowrap" }}>{n.time}</p>
                  </div>
                  <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}