"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Payment = {
  id: string;
  reservation_id: string;
  guest_id: string;
  amount: number;
  method: string;
  status: string;
  reference: string;
  notes: string;
};

type Guest = { id: string; full_name: string };
type Reservation = { id: string; reservation_number: string };

const statusColor: Record<string, string> = {
  "Successful": "#15803d", "Pending": "#B8952A", "Refunded": "#6B7280", "Failed": "#dc2626",
};
const statusBg: Record<string, string> = {
  "Successful": "#F0FDF4", "Pending": "#FFFBEB", "Refunded": "#F3F4F6", "Failed": "#FEF2F2",
};

const filters = ["All", "Successful", "Pending", "Refunded"];
const methods = ["Cash", "Bank Transfer", "Card", "Paystack", "Flutterwave"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Payments() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ guest_id: "", reservation_id: "", amount: "", method: "Cash", reference: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [payData, guestData, resData] = await Promise.all([
        api.get("/api/v1/payments/"),
        api.get("/api/v1/guests/"),
        api.get("/api/v1/reservations/"),
      ]);
      setPayments(payData);
      setGuests(guestData);
      setReservations(resData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.amount || !form.method) { setError("Amount and method are required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/payments/", {
        guest_id: form.guest_id || null,
        reservation_id: form.reservation_id || null,
        amount: parseInt(form.amount),
        method: form.method,
        reference: form.reference,
        notes: form.notes,
      });
      setShowAdd(false);
      setForm({ guest_id: "", reservation_id: "", amount: "", method: "Cash", reference: "", notes: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to record payment");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirm = async (id: string) => {
    try {
      await api.patch(`/api/v1/payments/${id}/confirm`, {});
      fetchData();
    } catch { }
  };

  const handleRefund = async (id: string) => {
    try {
      await api.patch(`/api/v1/payments/${id}/refund`, {});
      fetchData();
    } catch { }
  };

  const getGuest = (id: string) => guests.find(g => g.id === id);
  const getReservation = (id: string) => reservations.find(r => r.id === id);

  const filtered = payments.filter((p) => {
    const matchFilter = activeFilter === "All" || p.status === activeFilter;
    const guest = getGuest(p.guest_id);
    const matchSearch = guest?.full_name.toLowerCase().includes(search.toLowerCase()) || p.reference?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: payments.filter(p => p.status === "Successful").reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === "Pending").reduce((sum, p) => sum + p.amount, 0),
    count: payments.filter(p => p.status === "Successful").length,
    refunded: payments.filter(p => p.status === "Refunded").reduce((sum, p) => sum + p.amount, 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Payments" ? "white" : "#94a3b8", backgroundColor: item === "Payments" ? "#243d75" : "transparent", fontWeight: item === "Payments" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Payments</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Payment management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search payments..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Record Payment</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Add Payment Modal */}
          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Record Payment</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Guest</label>
                    <select value={form.guest_id} onChange={(e) => setForm({ ...form, guest_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select guest</option>
                      {guests.map(g => <option key={g.id} value={g.id}>{g.full_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Reservation</label>
                    <select value={form.reservation_id} onChange={(e) => setForm({ ...form, reservation_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select reservation</option>
                      {reservations.map(r => <option key={r.id} value={r.id}>{r.reservation_number}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Amount (₦) *</label>
                    <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="e.g. 180000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Payment Method *</label>
                    <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      {methods.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Reference</label>
                    <input value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder="Transaction reference" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Record Payment"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Revenue", value: `₦${(summary.total / 1000000).toFixed(2)}M`, color: "#15803d" },
              { label: "Pending", value: `₦${(summary.pending / 1000).toFixed(0)}K`, color: "#B8952A" },
              { label: "Refunded", value: `₦${(summary.refunded / 1000).toFixed(0)}K`, color: "#6B7280" },
              { label: "Transactions", value: summary.count, color: "#1B2D5B" },
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
              <p style={{ color: "#9CA3AF" }}>Loading payments...</p>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Guest", "Reservation", "Amount", "Method", "Reference", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No payments found. Record your first payment.</td></tr>
                  ) : filtered.map((p, i) => {
                    const guest = getGuest(p.guest_id);
                    const res = getReservation(p.reservation_id);
                    return (
                      <tr key={p.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{guest?.full_name || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{res?.reservation_number || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>₦{(p.amount || 0).toLocaleString()}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", color: "#1B2D5B", backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 500 }}>{p.method}</span>
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{p.reference || "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[p.status], color: statusColor[p.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{p.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {p.status === "Pending" && <button onClick={() => handleConfirm(p.id)} style={{ color: "#15803d", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Confirm</button>}
                            {p.status === "Successful" && <button onClick={() => handleRefund(p.id)} style={{ color: "#dc2626", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Refund</button>}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}