"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Reservation = {
  id: string;
  reservation_number: string;
  guest_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  adults: number;
  status: string;
  payment_status: string;
  total_amount: number;
  notes: string;
};

type Guest = { id: string; full_name: string; phone: string };
type Room = { id: string; room_number: string };

const statusColor: Record<string, string> = {
  "Confirmed": "#1B2D5B", "Checked In": "#15803d", "Checked Out": "#6B7280",
  "Cancelled": "#dc2626", "Pending": "#B8952A",
};
const statusBg: Record<string, string> = {
  "Confirmed": "#EEF2FF", "Checked In": "#F0FDF4", "Checked Out": "#F3F4F6",
  "Cancelled": "#FEF2F2", "Pending": "#FFFBEB",
};
const paymentColor: Record<string, string> = {
  "Paid": "#15803d", "Pending": "#B8952A", "Partial": "#1B2D5B", "Refunded": "#6B7280",
};

const filters = ["All", "Confirmed", "Checked In", "Checked Out", "Cancelled"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Reservations() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ guest_id: "", room_id: "", reservation_number: "", check_in: "", check_out: "", nights: "", adults: "1", total_amount: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resData, guestData, roomData] = await Promise.all([
        api.get("/api/v1/reservations/"),
        api.get("/api/v1/guests/"),
        api.get("/api/v1/rooms/"),
      ]);
      setReservations(resData);
      setGuests(guestData);
      setRooms(roomData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.guest_id || !form.room_id || !form.check_in || !form.check_out || !form.total_amount) {
      setError("Please fill in all required fields");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const resNumber = form.reservation_number || `RES-${Date.now().toString().slice(-6)}`;
      await api.post("/api/v1/reservations/", {
        guest_id: form.guest_id,
        room_id: form.room_id,
        reservation_number: resNumber,
        check_in: form.check_in,
        check_out: form.check_out,
        nights: form.nights ? parseInt(form.nights) : null,
        adults: parseInt(form.adults),
        total_amount: parseInt(form.total_amount),
        notes: form.notes,
      });
      setShowAdd(false);
      setForm({ guest_id: "", room_id: "", reservation_number: "", check_in: "", check_out: "", nights: "", adults: "1", total_amount: "", notes: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create reservation");
    } finally {
      setSaving(false);
    }
  };

  const handleAction = async (id: string, action: string) => {
    try {
      await api.patch(`/api/v1/reservations/${id}/${action}`, {});
      fetchData();
    } catch { }
  };

  const getGuest = (id: string) => guests.find(g => g.id === id);
  const getRoom = (id: string) => rooms.find(r => r.id === id);

  const filtered = reservations.filter((r) => {
    const matchFilter = activeFilter === "All" || r.status === activeFilter;
    const guest = getGuest(r.guest_id);
    const matchSearch = r.reservation_number.toLowerCase().includes(search.toLowerCase()) || guest?.full_name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: reservations.length,
    confirmed: reservations.filter(r => r.status === "Confirmed").length,
    checkedIn: reservations.filter(r => r.status === "Checked In").length,
    checkedOut: reservations.filter(r => r.status === "Checked Out").length,
    revenue: reservations.reduce((sum, r) => sum + (r.total_amount || 0), 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Reservations" ? "white" : "#94a3b8", backgroundColor: item === "Reservations" ? "#243d75" : "transparent", fontWeight: item === "Reservations" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Reservations</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Reservation management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reservations..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ New Reservation</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Add Reservation Modal */}
          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "520px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>New Reservation</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Guest *</label>
                    <select value={form.guest_id} onChange={(e) => setForm({ ...form, guest_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select guest</option>
                      {guests.map(g => <option key={g.id} value={g.id}>{g.full_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room *</label>
                    <select value={form.room_id} onChange={(e) => setForm({ ...form, room_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select room</option>
                      {rooms.map(r => <option key={r.id} value={r.id}>Room {r.room_number}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Check In *</label>
                      <input type="date" value={form.check_in} onChange={(e) => setForm({ ...form, check_in: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Check Out *</label>
                      <input type="date" value={form.check_out} onChange={(e) => setForm({ ...form, check_out: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Adults</label>
                      <input type="number" value={form.adults} onChange={(e) => setForm({ ...form, adults: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Total Amount (₦) *</label>
                      <input type="number" value={form.total_amount} onChange={(e) => setForm({ ...form, total_amount: e.target.value })} placeholder="e.g. 180000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Notes</label>
                    <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Create Reservation"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: summary.total, color: "#1B2D5B" },
              { label: "Confirmed", value: summary.confirmed, color: "#1B2D5B" },
              { label: "Checked In", value: summary.checkedIn, color: "#15803d" },
              { label: "Checked Out", value: summary.checkedOut, color: "#6B7280" },
              { label: "Revenue", value: `₦${(summary.revenue / 1000).toFixed(0)}K`, color: "#B8952A" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: 700, color: s.color, margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0, textTransform: "uppercase" }}>{s.label}</p>
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
              <p style={{ color: "#9CA3AF" }}>Loading reservations...</p>
            </div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["ID", "Guest", "Room", "Check In", "Check Out", "Amount", "Payment", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No reservations found. Create your first reservation.</td></tr>
                  ) : filtered.map((r, i) => {
                    const guest = getGuest(r.guest_id);
                    const room = getRoom(r.room_id);
                    return (
                      <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{r.reservation_number}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{guest?.full_name || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>Room {room?.room_number || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.check_in}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{r.check_out}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{(r.total_amount || 0).toLocaleString()}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: paymentColor[r.payment_status] || "#6B7280" }}>{r.payment_status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[r.status], color: statusColor[r.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{r.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {r.status === "Confirmed" && <button onClick={() => handleAction(r.id, "checkin")} style={{ color: "#15803d", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Check In</button>}
                            {r.status === "Checked In" && <button onClick={() => handleAction(r.id, "checkout")} style={{ color: "#1B2D5B", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Check Out</button>}
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