"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Summary = {
  rooms: { total: number; available: number; occupied: number; occupancy_rate: string };
  guests: { total: number };
  reservations: { total: number; confirmed: number; checked_in: number };
  revenue: { total: number };
  housekeeping: { pending_tasks: number };
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Analytics() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.get("/api/v1/analytics/summary");
      setSummary(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Analytics" ? "white" : "#94a3b8", backgroundColor: item === "Analytics" ? "#243d75" : "transparent", fontWeight: item === "Analytics" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Analytics</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Live performance overview</p>
          </div>
          <button onClick={fetchData} style={{ padding: "8px 16px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>Refresh</button>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading analytics...</p></div>
          ) : summary ? (
            <>
              {/* KPIs */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {[
                  { label: "Occupancy Rate", value: summary.rooms.occupancy_rate, sub: `${summary.rooms.occupied} of ${summary.rooms.total} rooms`, color: "#1B2D5B" },
                  { label: "Total Revenue", value: `₦${(summary.revenue.total / 1000000).toFixed(2)}M`, sub: "Successful payments", color: "#15803d" },
                  { label: "Total Guests", value: summary.guests.total, sub: "Registered guests", color: "#1B2D5B" },
                  { label: "Active Reservations", value: summary.reservations.confirmed, sub: `${summary.reservations.checked_in} checked in`, color: "#B8952A" },
                ].map((k) => (
                  <div key={k.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                    <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: k.color, margin: "0 0 4px" }}>{k.value}</p>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* Room Breakdown */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Room Status Breakdown</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { label: "Available", value: summary.rooms.available, color: "#15803d", total: summary.rooms.total },
                      { label: "Occupied", value: summary.rooms.occupied, color: "#1B2D5B", total: summary.rooms.total },
                      { label: "Other", value: summary.rooms.total - summary.rooms.available - summary.rooms.occupied, color: "#6B7280", total: summary.rooms.total },
                    ].map((r) => (
                      <div key={r.label}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "12px", color: "#374151" }}>{r.label}</span>
                          <span style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{r.value}</span>
                        </div>
                        <div style={{ height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                          <div style={{ width: `${r.total > 0 ? (r.value / r.total) * 100 : 0}%`, height: "100%", backgroundColor: r.color, borderRadius: "3px" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Reservation Status</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                      { label: "Total Reservations", value: summary.reservations.total, color: "#1B2D5B" },
                      { label: "Confirmed", value: summary.reservations.confirmed, color: "#B8952A" },
                      { label: "Checked In", value: summary.reservations.checked_in, color: "#15803d" },
                    ].map((r) => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F3F4F6" }}>
                        <span style={{ fontSize: "13px", color: "#374151" }}>{r.label}</span>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: r.color }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[
                  { label: "Total Rooms", value: summary.rooms.total, sub: "In inventory" },
                  { label: "Available Rooms", value: summary.rooms.available, sub: "Ready for booking" },
                  { label: "HK Tasks Pending", value: summary.housekeeping.pending_tasks, sub: "Need attention" },
                  { label: "Revenue (₦)", value: summary.revenue.total.toLocaleString(), sub: "Total collected" },
                ].map((m) => (
                  <div key={m.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                    <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{m.value}</p>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{m.sub}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ color: "#9CA3AF" }}>No data available yet. Start by adding rooms, guests and reservations.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}