"use client";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const weeklyOccupancy = [62, 70, 75, 68, 80, 78, 82];
const weeklyRevenue = [1.2, 1.8, 1.5, 2.1, 1.9, 2.4, 2.45];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const monthlyRevenue = [12.4, 15.2, 18.6, 14.8, 19.2, 22.4, 20.1, 24.6, 21.3, 26.8, 23.4, 28.2];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const roomTypeRevenue = [
  { type: "Suite", revenue: 1250000, percentage: 48 },
  { type: "Deluxe", revenue: 820000, percentage: 32 },
  { type: "Standard", revenue: 510000, percentage: 20 },
];

const paymentMethods = [
  { method: "Bank Transfer", count: 42, percentage: 38 },
  { method: "Card", count: 31, percentage: 28 },
  { method: "Paystack", count: 22, percentage: 20 },
  { method: "Flutterwave", count: 10, percentage: 9 },
  { method: "Cash", count: 6, percentage: 5 },
];

const topGuests = [
  { name: "Ngozi Adeyemi", stays: 6, spend: 920000 },
  { name: "Adebayo Okonkwo", stays: 4, spend: 480000 },
  { name: "Chioma Obi", stays: 2, spend: 425000 },
  { name: "Tunde Bakare", stays: 3, spend: 195000 },
  { name: "Amina Bello", stays: 2, spend: 140000 },
];

export default function Analytics() {
  const [revenueTab, setRevenueTab] = useState("weekly");

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
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>Parkview Hotel Abuja</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>Admin</p>
          <Link href="/login" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Analytics</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Performance Overview</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button style={{ padding: "8px 16px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>Export Report</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* KPIs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Occupancy Rate", value: "82%", sub: "↑ +5% vs last week", color: "#1B2D5B" },
              { label: "Total Revenue", value: "₦2.58M", sub: "↑ +12% vs last week", color: "#15803d" },
              { label: "Avg Daily Rate", value: "₦38,500", sub: "Per occupied room", color: "#1B2D5B" },
              { label: "RevPAR", value: "₦31,570", sub: "Revenue per available room", color: "#B8952A" },
            ].map((k) => (
              <div key={k.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{k.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: k.color, margin: "0 0 4px" }}>{k.value}</p>
                <p style={{ fontSize: "11px", color: "#15803d", margin: 0 }}>{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>

            {/* Occupancy Chart */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 2px" }}>Occupancy Trend</h2>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>Last 7 days</p>
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>82%</p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "140px" }}>
                {weeklyOccupancy.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                    <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{val}%</span>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                      <div style={{ width: "100%", backgroundColor: i === 6 ? "#1B2D5B" : "#E8EDF5", height: `${val}%`, transition: "height 0.3s" }} />
                    </div>
                    <span style={{ fontSize: "10px", color: "#9CA3AF" }}>{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 2px" }}>Revenue Trend</h2>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>₦M = millions</p>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {["weekly", "monthly"].map((t) => (
                    <button key={t} onClick={() => setRevenueTab(t)} style={{ padding: "4px 10px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: revenueTab === t ? "#B8952A" : "white", color: revenueTab === t ? "white" : "#6B7280", cursor: "pointer" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "140px" }}>
                {(revenueTab === "weekly" ? weeklyRevenue : monthlyRevenue).map((val, i) => {
                  const data = revenueTab === "weekly" ? weeklyRevenue : monthlyRevenue;
                  const max = Math.max(...data);
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                        <div style={{ width: "100%", backgroundColor: i === data.length - 1 ? "#B8952A" : "#F5EDD6", height: `${(val / max) * 100}%` }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#9CA3AF" }}>{revenueTab === "weekly" ? days[i] : months[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Charts Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>

            {/* Room Type Revenue */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 20px" }}>Revenue by Room Type</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {roomTypeRevenue.map((r) => (
                  <div key={r.type}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>{r.type}</span>
                      <span style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>₦{(r.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                      <div style={{ width: `${r.percentage}%`, height: "100%", backgroundColor: r.type === "Suite" ? "#1B2D5B" : r.type === "Deluxe" ? "#B8952A" : "#6B7280", borderRadius: "3px" }} />
                    </div>
                    <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "4px 0 0" }}>{r.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 20px" }}>Payment Methods</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {paymentMethods.map((p) => (
                  <div key={p.method}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#374151", fontWeight: 500 }}>{p.method}</span>
                      <span style={{ fontSize: "12px", color: "#6B7280" }}>{p.count} txns</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                      <div style={{ width: `${p.percentage}%`, height: "100%", backgroundColor: "#1B2D5B", borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Guests */}
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 20px" }}>Top Guests by Spend</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {topGuests.map((g, i) => (
                  <div key={g.name} style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "12px", borderBottom: i < topGuests.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <div style={{ width: "28px", height: "28px", backgroundColor: i === 0 ? "#B8952A" : "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{g.name}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>{g.stays} stays</p>
                    </div>
                    <p style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>₦{(g.spend / 1000).toFixed(0)}K</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Additional Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { label: "Check-ins Today", value: "8", sub: "3 pending arrival" },
              { label: "Check-outs Today", value: "5", sub: "2 late check-out" },
              { label: "Cancellation Rate", value: "4.2%", sub: "↓ -1.1% vs last month" },
              { label: "Avg Stay Length", value: "2.8 nights", sub: "Per reservation" },
            ].map((m) => (
              <div key={m.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{m.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{m.value}</p>
                <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{m.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}