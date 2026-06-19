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
  id_type: string;
  vip: boolean;
  preferred_room_type: string;
  notes: string;
  total_stays: number;
  total_spend: number;
};

type GuestForm = {
  full_name: string;
  email: string;
  phone: string;
  nationality: string;
  id_type: string;
  vip: boolean;
  preferred_room_type: string;
  notes: string;
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const filters = ["All", "VIP"];

const textFields = [
  { label: "Full Name *", key: "full_name", placeholder: "Guest full name" },
  { label: "Email", key: "email", placeholder: "guest@email.com" },
  { label: "Phone", key: "phone", placeholder: "+234 000 000 0000" },
  { label: "Nationality", key: "nationality", placeholder: "e.g. Nigerian" },
  { label: "ID Type", key: "id_type", placeholder: "e.g. Passport" },
  { label: "Preferred Room Type", key: "preferred_room_type", placeholder: "e.g. Suite" },
  { label: "Notes", key: "notes", placeholder: "Optional notes" },
];

export default function Guests() {
  const router = useRouter();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<GuestForm>({
    full_name: "",
    email: "",
    phone: "",
    nationality: "",
    id_type: "",
    vip: false,
    preferred_room_type: "",
    notes: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const data = await api.get("/api/v1/guests/");
      setGuests(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.full_name) { setError("Full name is required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/guests/", form);
      setShowAdd(false);
      setForm({ full_name: "", email: "", phone: "", nationality: "", id_type: "", vip: false, preferred_room_type: "", notes: "" });
      fetchGuests();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add guest");
    } finally {
      setSaving(false);
    }
  };

  const handleTextChange = (key: keyof GuestForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = guests.filter((g) => {
    const matchFilter = activeFilter === "All" || (activeFilter === "VIP" && g.vip);
    const matchSearch =
      g.full_name.toLowerCase().includes(search.toLowerCase()) ||
      g.email?.toLowerCase().includes(search.toLowerCase()) ||
      g.phone?.includes(search);
    return matchFilter && matchSearch;
  });

  const summary = {
    total: guests.length,
    vip: guests.filter(g => g.vip).length,
    totalSpend: guests.reduce((sum, g) => sum + (g.total_spend || 0), 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Guests" ? "white" : "#94a3b8", backgroundColor: item === "Guests" ? "#243d75" : "transparent", fontWeight: item === "Guests" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Guests</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Guest management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guests..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Guest</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Add Guest Modal */}
          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add New Guest</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {textFields.map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                      <input
                        value={form[f.key as keyof GuestForm] as string}
                        onChange={(e) => handleTextChange(f.key as keyof GuestForm, e.target.value)}
                        placeholder={f.placeholder}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <input
                      type="checkbox"
                      checked={form.vip}
                      onChange={(e) => setForm((prev) => ({ ...prev, vip: e.target.checked }))}
                      id="vip"
                    />
                    <label htmlFor="vip" style={{ fontSize: "13px", color: "#1B2D5B", cursor: "pointer" }}>VIP Guest</label>
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Guest"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Guests", value: summary.total, color: "#1B2D5B" },
              { label: "VIP Guests", value: summary.vip, color: "#B8952A" },
              { label: "Total Revenue", value: `₦${summary.totalSpend.toLocaleString()}`, color: "#15803d" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ color: "#9CA3AF" }}>Loading guests...</p>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Guest", "Contact", "ID Type", "Stays", "Total Spend", "Preferred Room", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No guests found. Add your first guest.</td></tr>
                  ) : filtered.map((g, i) => (
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
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{g.email || "—"}</p>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{g.phone || "—"}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.id_type || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500, textAlign: "center" }}>{g.total_stays}</td>
                      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{(g.total_spend || 0).toLocaleString()}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{g.preferred_room_type || "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ color: "#B8952A", fontSize: "11px", cursor: "pointer" }}>View</span>
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