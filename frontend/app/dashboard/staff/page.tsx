"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Staff = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  shift: string;
  status: string;
  join_date: string;
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const statusColor: Record<string, string> = { "Active": "#15803d", "On Leave": "#B8952A", "Inactive": "#dc2626" };
const statusBg: Record<string, string> = { "Active": "#F0FDF4", "On Leave": "#FFFBEB", "Inactive": "#FEF2F2" };
const shiftColor: Record<string, string> = { "Morning": "#1B2D5B", "Evening": "#B8952A", "Night": "#6B7280" };
const filters = ["All", "Active", "On Leave", "Inactive"];
const departments = ["All", "Management", "Front Office", "Housekeeping", "Food & Beverage", "Security", "Finance", "Maintenance"];
const shifts = ["Morning", "Evening", "Night"];
const statuses = ["Active", "On Leave", "Inactive"];

export default function Staff() {
  const router = useRouter();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", role: "", department: "", shift: "Morning", join_date: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const data = await api.get("/api/v1/staff/");
      setStaff(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.full_name || !form.role) { setError("Full name and role are required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/staff/", form);
      setShowAdd(false);
      setForm({ full_name: "", email: "", phone: "", role: "", department: "", shift: "Morning", join_date: "" });
      fetchStaff();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add staff");
    } finally {
      setSaving(false);
    }
  };

  const filtered = staff.filter((s) => {
    const matchFilter = activeFilter === "All" || s.status === activeFilter;
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    const matchSearch = s.full_name.toLowerCase().includes(search.toLowerCase()) || s.role?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchDept && matchSearch;
  });

  const summary = {
    total: staff.length,
    active: staff.filter(s => s.status === "Active").length,
    onLeave: staff.filter(s => s.status === "On Leave").length,
    inactive: staff.filter(s => s.status === "Inactive").length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Staff" ? "white" : "#94a3b8", backgroundColor: item === "Staff" ? "#243d75" : "transparent", fontWeight: item === "Staff" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Staff</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Staff management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search staff..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Staff</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add Staff Member</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Full Name *", key: "full_name", placeholder: "Staff full name" },
                    { label: "Email", key: "email", placeholder: "staff@hotel.com" },
                    { label: "Phone", key: "phone", placeholder: "+234 000 000 0000" },
                    { label: "Role *", key: "role", placeholder: "e.g. Front Desk Officer" },
                    { label: "Department", key: "department", placeholder: "e.g. Front Office" },
                    { label: "Join Date", key: "join_date", placeholder: "", type: "date" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                      <input type={f.type || "text"} value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Shift</label>
                    <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      {shifts.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Staff"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Staff", value: summary.total, color: "#1B2D5B" },
              { label: "Active", value: summary.active, color: "#15803d" },
              { label: "On Leave", value: summary.onLeave, color: "#B8952A" },
              { label: "Inactive", value: summary.inactive, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {departments.map((d) => (
                <button key={d} onClick={() => setDeptFilter(d)} style={{ padding: "6px 10px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: deptFilter === d ? "#B8952A" : "white", color: deptFilter === d ? "white" : "#6B7280", cursor: "pointer" }}>{d}</button>
              ))}
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading staff...</p></div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Staff Member", "Role", "Department", "Contact", "Shift", "Joined", "Status"].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No staff found. Add your first staff member.</td></tr>
                  ) : filtered.map((s, i) => (
                    <tr key={s.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "32px", height: "32px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                            {s.full_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{s.full_name}</p>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{s.role || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{s.department || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{s.email || "—"}</p>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{s.phone || "—"}</p>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: "11px", color: shiftColor[s.shift] || "#6B7280", backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 500 }}>{s.shift || "—"}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{s.join_date || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ backgroundColor: statusBg[s.status] || "#F3F4F6", color: statusColor[s.status] || "#6B7280", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{s.status || "Active"}</span>
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