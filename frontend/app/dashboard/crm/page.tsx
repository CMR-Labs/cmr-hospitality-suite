"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Guest = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  vip: boolean;
  preferred_room_type: string;
  notes: string;
  total_stays: number;
  total_spend: number;
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const segments = ["All", "VIP", "High Value", "Regular", "Inactive"];

export default function CRM() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeSegment, setActiveSegment] = useState("All");
  const [activeTab, setActiveTab] = useState("contacts");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await api.get("/api/v1/guests/");
      setGuests(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const getSegment = (g: Guest) => {
    if (g.vip) return "VIP";
    if (g.total_spend >= 200000) return "High Value";
    if (g.total_stays >= 2) return "Regular";
    return "Inactive";
  };

  const filtered = guests.filter((g) => {
    const matchSegment = activeSegment === "All" || getSegment(g) === activeSegment;
    const matchSearch =
      g.full_name.toLowerCase().includes(search.toLowerCase()) ||
      g.email?.toLowerCase().includes(search.toLowerCase()) ||
      g.phone?.includes(search);
    return matchSegment && matchSearch;
  });

  const summary = {
    total: guests.length,
    vip: guests.filter(g => g.vip).length,
    highValue: guests.filter(g => !g.vip && g.total_spend >= 200000).length,
    totalRevenue: guests.reduce((sum, g) => sum + (g.total_spend || 0), 0),
    avgSpend: guests.length > 0 ? Math.round(guests.reduce((sum, g) => sum + (g.total_spend || 0), 0) / guests.length) : 0,
  };

  const segmentColor: Record<string, string> = {
    "VIP": "#B8952A", "High Value": "#1B2D5B", "Regular": "#15803d", "Inactive": "#6B7280",
  };
  const segmentBg: Record<string, string> = {
    "VIP": "#FFFBEB", "High Value": "#EEF2FF", "Regular": "#F0FDF4", "Inactive": "#F3F4F6",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "CRM" ? "white" : "#94a3b8", backgroundColor: item === "CRM" ? "#243d75" : "transparent", fontWeight: item === "CRM" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>CRM</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Customer Relationship Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/guests" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Contact</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Contacts", value: summary.total, color: "#1B2D5B" },
              { label: "VIP", value: summary.vip, color: "#B8952A" },
              { label: "High Value", value: summary.highValue, color: "#1B2D5B" },
              { label: "Total Revenue", value: `₦${(summary.totalRevenue / 1000000).toFixed(1)}M`, color: "#15803d" },
              { label: "Avg Spend", value: `₦${(summary.avgSpend / 1000).toFixed(0)}K`, color: "#6B7280" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #E5E7EB" }}>
            {["contacts", "segments"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: "13px", border: "none", borderBottom: activeTab === tab ? "2px solid #1B2D5B" : "2px solid transparent", backgroundColor: "transparent", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>{tab}</button>
            ))}
          </div>

          {activeTab === "contacts" && (
            <>
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px", flexWrap: "wrap" }}>
                {segments.map((s) => (
                  <button key={s} onClick={() => setActiveSegment(s)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeSegment === s ? "#1B2D5B" : "white", color: activeSegment === s ? "white" : "#6B7280", cursor: "pointer" }}>{s}</button>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading contacts...</p></div>
              ) : (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#F9FAFB" }}>
                        {["Contact", "Segment", "Stays", "Total Spend", "Preferred Room", "Notes", ""].map((h, i) => (
                          <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.length === 0 ? (
                        <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No contacts found.</td></tr>
                      ) : filtered.map((g, i) => {
                        const segment = getSegment(g);
                        return (
                          <tr key={g.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                            <td style={{ padding: "12px 16px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div style={{ width: "32px", height: "32px", backgroundColor: g.vip ? "#B8952A" : "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                                  {g.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{g.full_name}</p>
                                    {g.vip && <span style={{ fontSize: "9px", backgroundColor: "#FFFBEB", color: "#B8952A", padding: "1px 6px", fontWeight: 700 }}>VIP</span>}
                                  </div>
                                  <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{g.email || g.phone || "—"}</p>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "12px 16px" }}>
                              <span style={{ backgroundColor: segmentBg[segment], color: segmentColor[segment], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{segment}</span>
                            </td>
                            <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500, textAlign: "center" }}>{g.total_stays}</td>
                            <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{(g.total_spend || 0).toLocaleString()}</td>
                            <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.preferred_room_type || "—"}</td>
                            <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280", maxWidth: "200px" }}>{g.notes ? g.notes.slice(0, 50) + (g.notes.length > 50 ? "..." : "") : "—"}</td>
                            <td style={{ padding: "12px 16px" }}>
                              <Link href="/dashboard/guests" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none" }}>View</Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {activeTab === "segments" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {[
                { segment: "VIP", count: guests.filter(g => g.vip).length, desc: "Guests marked as VIP — receive priority service and special treatment.", color: "#B8952A", bg: "#FFFBEB" },
                { segment: "High Value", count: guests.filter(g => !g.vip && g.total_spend >= 200000).length, desc: "Guests with total spend above ₦200,000 — strong revenue contributors.", color: "#1B2D5B", bg: "#EEF2FF" },
                { segment: "Regular", count: guests.filter(g => !g.vip && g.total_spend < 200000 && g.total_stays >= 2).length, desc: "Guests with 2 or more stays — loyal returning customers.", color: "#15803d", bg: "#F0FDF4" },
                { segment: "Inactive", count: guests.filter(g => !g.vip && g.total_stays < 2 && g.total_spend < 200000).length, desc: "Guests with only 1 stay and low spend — potential for re-engagement.", color: "#6B7280", bg: "#F3F4F6" },
              ].map((s) => (
                <div key={s.segment} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <span style={{ backgroundColor: s.bg, color: s.color, padding: "4px 10px", fontSize: "12px", fontWeight: 600 }}>{s.segment}</span>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: s.color, margin: 0 }}>{s.count}</p>
                  </div>
                  <p style={{ fontSize: "13px", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}