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

export default function Dashboard() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await api.get("/api/v1/analytics/summary");
      setSummary(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const kpis = summary ? [
    { label: "Occupancy Rate", value: summary.rooms.occupancy_rate, sub: `${summary.rooms.occupied} of ${summary.rooms.total} rooms` },
    { label: "Active Reservations", value: summary.reservations.confirmed, sub: `${summary.reservations.checked_in} checked in` },
    { label: "Total Guests", value: summary.guests.total, sub: "Registered guests" },
    { label: "Total Revenue", value: `₦${summary.revenue.total.toLocaleString()}`, sub: "Successful payments" },
  ] : [
    { label: "Occupancy Rate", value: "—", sub: "Loading..." },
    { label: "Active Reservations", value: "—", sub: "Loading..." },
    { label: "Total Guests", value: "—", sub: "Loading..." },
    { label: "Total Revenue", value: "—", sub: "Loading..." },
  ];

  const roomStats = summary ? [
    { label: "Available", count: summary.rooms.available, color: "#15803d" },
    { label: "Occupied", count: summary.rooms.occupied, color: "#1B2D5B" },
    { label: "Total", count: summary.rooms.total, color: "#B8952A" },
    { label: "HK Pending", count: summary.housekeeping.pending_tasks, color: "#dc2626" },
  ] : [];

  const quickActions = [
    { label: "New Reservation", href: "/dashboard/reservations/new" },
    { label: "Add Guest", href: "/dashboard/guests/new" },
    { label: "Add Room", href: "/dashboard/rooms/new" },
    { label: "Book Event Hall", href: "/dashboard/events/new" },
    { label: "Record Payment", href: "/dashboard/payments/new" },
    { label: "Generate Report", href: "/dashboard/reports" },
  ];

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
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>{user?.full_name || "Hotel Manager"}</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>{user?.email || ""}</p>
          <button onClick={handleSignOut} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Dashboard</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Live hotel operations overview</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/dashboard/reservations/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ New Reservation</Link>
            <div style={{ width: "34px", height: "34px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: 700 }}>
              {user?.full_name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "HM"}
            </div>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {loading ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
              <p style={{ color: "#9CA3AF", fontSize: "14px" }}>Loading live data...</p>
            </div>
          ) : (
            <>
              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
                {kpis.map((k) => (
                  <div key={k.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                    <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{k.value}</p>
                    <p style={{ fontSize: "11px", margin: 0, color: "#9CA3AF" }}>{k.sub}</p>
                  </div>
                ))}
              </div>

              {/* Room Status + Quick Actions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>

                {/* Room Status */}
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Room Status</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {roomStats.map((r) => (
                      <div key={r.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: r.color }} />
                          <span style={{ fontSize: "13px", color: "#374151" }}>{r.label}</span>
                        </div>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: r.color, fontFamily: "'Playfair Display', serif" }}>{r.count}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: "16px", borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                    <Link href="/dashboard/rooms" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Manage rooms →</Link>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
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

              {/* Summary Stats */}
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Operations Summary</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                  {[
                    { label: "Total Rooms", value: summary?.rooms.total || 0 },
                    { label: "Total Reservations", value: summary?.reservations.total || 0 },
                    { label: "Checked In", value: summary?.reservations.checked_in || 0 },
                    { label: "HK Tasks Pending", value: summary?.housekeeping.pending_tasks || 0 },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center", padding: "16px", backgroundColor: "#F9FAFB", border: "1px solid #F3F4F6" }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{s.value}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}
        </div>
      </main>
    </div>
  );
}