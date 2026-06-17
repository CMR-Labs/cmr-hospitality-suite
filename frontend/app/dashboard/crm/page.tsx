"use client";
import Link from "next/link";
import { useState } from "react";

const contacts = [
  { id: "CRM-001", name: "Ngozi Adeyemi", company: "Adeyemi Holdings", type: "Corporate", email: "ngozi@adeyemiholdings.com", phone: "+234 804 567 8901", totalStays: 6, totalSpend: 920000, lastContact: "Jun 16, 2025", status: "Active", vip: true, segment: "Corporate VIP", notes: "Key corporate client — handles all company travel bookings" },
  { id: "CRM-002", name: "Adebayo Okonkwo", company: "Self", type: "Individual", email: "adebayo@email.com", phone: "+234 801 234 5678", totalStays: 4, totalSpend: 480000, lastContact: "Jun 16, 2025", status: "Active", vip: true, segment: "Loyal Guest", notes: "Prefers Suite 101 — always books directly" },
  { id: "CRM-003", name: "First Bank Nigeria", company: "First Bank Nigeria", type: "Corporate", email: "events@firstbank.com", phone: "+234 802 000 1111", totalStays: 8, totalSpend: 1200000, lastContact: "Jun 17, 2025", status: "Active", vip: true, segment: "Corporate VIP", notes: "Regular boardroom bookings — quarterly events" },
  { id: "CRM-004", name: "Chioma Obi", company: "Self", type: "Individual", email: "chioma@email.com", phone: "+234 806 789 0123", totalStays: 2, totalSpend: 425000, lastContact: "Jun 16, 2025", status: "Active", vip: true, segment: "High Value", notes: "Honeymoon guest — arrange welcome package" },
  { id: "CRM-005", name: "Obi-Nwosu Family", company: "Self", type: "Event", email: "obinwosu@email.com", phone: "+234 803 456 7890", totalStays: 1, totalSpend: 250000, lastContact: "Jun 16, 2025", status: "Active", vip: false, segment: "Event Client", notes: "Wedding reception — Garden Terrace Jun 22" },
  { id: "CRM-006", name: "CMR Group", company: "CMR Group", type: "Corporate", email: "suthmanh@gmail.com", phone: "+234 903 414 9815", totalStays: 3, totalSpend: 240000, lastContact: "Jun 18, 2025", status: "Active", vip: false, segment: "Corporate", notes: "Strategy workshop bookings" },
  { id: "CRM-007", name: "Amina Bello", company: "Self", type: "Individual", email: "amina@email.com", phone: "+234 802 345 6789", totalStays: 2, totalSpend: 140000, lastContact: "Jun 16, 2025", status: "Active", vip: false, segment: "Regular Guest", notes: "" },
  { id: "CRM-008", name: "Folake Adetoye", company: "Self", type: "Individual", email: "folake@email.com", phone: "+234 808 901 2345", totalStays: 1, totalSpend: 0, lastContact: "Jun 16, 2025", status: "Inactive", vip: false, segment: "Churned", notes: "Cancelled reservation — follow up required" },
];

const interactions = [
  { contact: "Ngozi Adeyemi", type: "Booking", note: "Confirmed Annual Gala Dinner — Grand Ballroom Jun 20", date: "Jun 16, 2025" },
  { contact: "First Bank Nigeria", type: "Meeting", note: "Board meeting confirmed for Jun 17 — Executive Suite", date: "Jun 16, 2025" },
  { contact: "Chioma Obi", type: "Note", note: "Welcome package arranged — honeymoon suite Jun 20", date: "Jun 16, 2025" },
  { contact: "Folake Adetoye", type: "Follow Up", note: "Reached out regarding cancellation — no response", date: "Jun 16, 2025" },
  { contact: "Adebayo Okonkwo", type: "Check In", note: "Checked in to Suite 101 — VIP treatment arranged", date: "Jun 16, 2025" },
];

const statusColor: Record<string, string> = { "Active": "#15803d", "Inactive": "#dc2626" };
const statusBg: Record<string, string> = { "Active": "#F0FDF4", "Inactive": "#FEF2F2" };
const typeColor: Record<string, string> = { "Corporate": "#1B2D5B", "Individual": "#6B7280", "Event": "#B8952A" };
const interactionColor: Record<string, string> = { "Booking": "#15803d", "Meeting": "#1B2D5B", "Note": "#6B7280", "Follow Up": "#B8952A", "Check In": "#15803d" };

const segments = ["All", "Corporate VIP", "Loyal Guest", "High Value", "Corporate", "Event Client", "Regular Guest", "Churned"];
const filters = ["All", "Active", "Inactive", "VIP"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function CRM() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [segmentFilter, setSegmentFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("contacts");

  const filtered = contacts.filter((c) => {
    const matchFilter = activeFilter === "All" || (activeFilter === "VIP" ? c.vip : c.status === activeFilter);
    const matchSegment = segmentFilter === "All" || c.segment === segmentFilter;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSegment && matchSearch;
  });

  const summary = {
    total: contacts.length,
    active: contacts.filter(c => c.status === "Active").length,
    vip: contacts.filter(c => c.vip).length,
    corporate: contacts.filter(c => c.type === "Corporate").length,
    totalRevenue: contacts.reduce((sum, c) => sum + c.totalSpend, 0),
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
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>Parkview Hotel Abuja</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>Admin</p>
          <Link href="/login" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>CRM</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Customer Relationship Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contacts..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/crm/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Contact</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Contacts", value: summary.total, color: "#1B2D5B" },
              { label: "Active", value: summary.active, color: "#15803d" },
              { label: "VIP", value: summary.vip, color: "#B8952A" },
              { label: "Corporate", value: summary.corporate, color: "#1B2D5B" },
              { label: "Total Revenue", value: `₦${(summary.totalRevenue / 1000000).toFixed(1)}M`, color: "#B8952A" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #E5E7EB" }}>
            {["contacts", "interactions"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: "13px", border: "none", borderBottom: activeTab === tab ? "2px solid #1B2D5B" : "2px solid transparent", backgroundColor: "transparent", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>{tab}</button>
            ))}
          </div>

          {activeTab === "contacts" && (
            <>
              {/* Filters */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {filters.map((f) => (
                    <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {segments.map((s) => (
                    <button key={s} onClick={() => setSegmentFilter(s)} style={{ padding: "6px 10px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: segmentFilter === s ? "#B8952A" : "white", color: segmentFilter === s ? "white" : "#6B7280", cursor: "pointer" }}>{s}</button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F9FAFB" }}>
                      {["Contact", "Type", "Segment", "Stays", "Total Spend", "Last Contact", "Status", ""].map((h, i) => (
                        <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ width: "32px", height: "32px", backgroundColor: c.vip ? "#B8952A" : "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                              {c.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{c.name}</p>
                                {c.vip && <span style={{ fontSize: "9px", backgroundColor: "#FFFBEB", color: "#B8952A", padding: "1px 6px", fontWeight: 700 }}>VIP</span>}
                              </div>
                              <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{c.email}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", color: typeColor[c.type], backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 500 }}>{c.type}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{c.segment}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500, textAlign: "center" }}>{c.totalStays}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{c.totalSpend.toLocaleString()}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{c.lastContact}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[c.status], color: statusColor[c.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{c.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <Link href="#" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none", marginRight: "8px" }}>View</Link>
                          <Link href="#" style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ padding: "48px", textAlign: "center" }}>
                    <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No contacts found.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "interactions" && (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {interactions.map((interaction, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", paddingBottom: "16px", borderBottom: i < interactions.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: interactionColor[interaction.type], marginTop: "5px", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{interaction.contact}</p>
                          <span style={{ fontSize: "10px", color: interactionColor[interaction.type], backgroundColor: "#F3F4F6", padding: "2px 8px", fontWeight: 600 }}>{interaction.type}</span>
                        </div>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{interaction.date}</p>
                      </div>
                      <p style={{ fontSize: "12px", color: "#6B7280", margin: 0, lineHeight: 1.6 }}>{interaction.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}