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

export default function Reports() {
  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

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

  const handleGenerate = (reportName: string) => {
    setGenerating(reportName);
    setTimeout(() => setGenerating(null), 2000);
  };

  const reports = [
    { name: "Occupancy Report", desc: "Daily, weekly and monthly occupancy rates and trends.", icon: "🏨", category: "Operations" },
    { name: "Revenue Report", desc: "Total revenue, payment methods, and financial breakdown.", icon: "💰", category: "Finance" },
    { name: "Guest Report", desc: "Guest demographics, VIP analysis, and stay history.", icon: "👥", category: "Guests" },
    { name: "Reservation Report", desc: "Booking trends, check-ins, check-outs, and cancellations.", icon: "📅", category: "Operations" },
    { name: "Housekeeping Report", desc: "Task completion rates, pending tasks, and staff performance.", icon: "🧹", category: "Operations" },
    { name: "Staff Report", desc: "Staff attendance, shifts, department breakdown.", icon: "👤", category: "HR" },
    { name: "Event Hall Report", desc: "Event bookings, revenue from events, hall utilization.", icon: "🎉", category: "Events" },
    { name: "Payment Report", desc: "All transactions, payment methods, refunds, and pending payments.", icon: "💳", category: "Finance" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Reports" ? "white" : "#94a3b8", backgroundColor: item === "Reports" ? "#243d75" : "transparent", fontWeight: item === "Reports" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Reports</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Generate and export hotel reports</p>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Live Summary */}
          {!loading && summary && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
              {[
                { label: "Occupancy", value: summary.rooms.occupancy_rate },
                { label: "Total Revenue", value: `₦${(summary.revenue.total / 1000000).toFixed(2)}M` },
                { label: "Total Guests", value: summary.guests.total },
                { label: "Reservations", value: summary.reservations.total },
              ].map((s) => (
                <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                  <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>{s.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Report Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {reports.map((report) => (
              <div key={report.name} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "24px" }}>{report.icon}</span>
                  <span style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 8px", fontWeight: 500 }}>{report.category}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>{report.name}</h3>
                <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 16px", lineHeight: 1.6 }}>{report.desc}</p>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => handleGenerate(report.name)} disabled={generating === report.name} style={{ flex: 1, backgroundColor: generating === report.name ? "#6B7280" : "#1B2D5B", color: "white", padding: "8px", fontSize: "12px", fontWeight: 600, border: "none", cursor: generating === report.name ? "not-allowed" : "pointer" }}>
                    {generating === report.name ? "Generating..." : "Generate"}
                  </button>
                  <button style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>Export</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}