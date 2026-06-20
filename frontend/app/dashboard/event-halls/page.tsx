"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type EventHall = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  size_sqm: number;
  floor: number;
  price_per_day: number;
  amenities: string[];
  status: string;
};

type EventBooking = {
  id: string;
  event_hall_id: string;
  client_name: string;
  event_name: string;
  event_date: string;
  guest_count: number;
  amount: number;
  status: string;
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const statusColor: Record<string, string> = { "Available": "#15803d", "Booked": "#1B2D5B", "Maintenance": "#dc2626", "Confirmed": "#15803d", "Pending": "#B8952A", "Cancelled": "#dc2626" };
const statusBg: Record<string, string> = { "Available": "#F0FDF4", "Booked": "#EEF2FF", "Maintenance": "#FEF2F2", "Confirmed": "#F0FDF4", "Pending": "#FFFBEB", "Cancelled": "#FEF2F2" };

export default function EventHalls() {
  const router = useRouter();
  const [halls, setHalls] = useState<EventHall[]>([]);
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("halls");
  const [showAddHall, setShowAddHall] = useState(false);
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [hallForm, setHallForm] = useState({ name: "", description: "", capacity: "", size_sqm: "", floor: "", price_per_day: "", amenities: "" });
  const [bookingForm, setBookingForm] = useState({ event_hall_id: "", client_name: "", client_email: "", client_phone: "", event_name: "", event_date: "", guest_count: "", amount: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [hallData, bookingData] = await Promise.all([
        api.get("/api/v1/events/halls"),
        api.get("/api/v1/events/bookings"),
      ]);
      setHalls(hallData);
      setBookings(bookingData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHall = async () => {
    if (!hallForm.name || !hallForm.capacity || !hallForm.price_per_day) { setError("Name, capacity and price are required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/events/halls", {
        name: hallForm.name,
        description: hallForm.description,
        capacity: parseInt(hallForm.capacity),
        size_sqm: hallForm.size_sqm ? parseInt(hallForm.size_sqm) : null,
        floor: hallForm.floor ? parseInt(hallForm.floor) : null,
        price_per_day: parseInt(hallForm.price_per_day),
        amenities: hallForm.amenities ? hallForm.amenities.split(",").map(a => a.trim()) : [],
      });
      setShowAddHall(false);
      setHallForm({ name: "", description: "", capacity: "", size_sqm: "", floor: "", price_per_day: "", amenities: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add hall");
    } finally {
      setSaving(false);
    }
  };

  const handleAddBooking = async () => {
    if (!bookingForm.event_hall_id || !bookingForm.client_name || !bookingForm.event_name || !bookingForm.event_date || !bookingForm.amount) {
      setError("Please fill in all required fields");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/events/bookings", {
        event_hall_id: bookingForm.event_hall_id,
        client_name: bookingForm.client_name,
        client_email: bookingForm.client_email,
        client_phone: bookingForm.client_phone,
        event_name: bookingForm.event_name,
        event_date: bookingForm.event_date,
        guest_count: bookingForm.guest_count ? parseInt(bookingForm.guest_count) : null,
        amount: parseInt(bookingForm.amount),
        notes: bookingForm.notes,
      });
      setShowAddBooking(false);
      setBookingForm({ event_hall_id: "", client_name: "", client_email: "", client_phone: "", event_name: "", event_date: "", guest_count: "", amount: "", notes: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create booking");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmBooking = async (id: string) => {
    try {
      await api.patch(`/api/v1/events/bookings/${id}/confirm`, {});
      fetchData();
    } catch { }
  };

  const getHall = (id: string) => halls.find(h => h.id === id);

  const summary = {
    total: halls.length,
    available: halls.filter(h => h.status === "Available").length,
    booked: halls.filter(h => h.status === "Booked").length,
    revenue: bookings.filter(b => b.status === "Confirmed").reduce((sum, b) => sum + b.amount, 0),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Event Halls" ? "white" : "#94a3b8", backgroundColor: item === "Event Halls" ? "#243d75" : "transparent", fontWeight: item === "Event Halls" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Event Halls</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Event hall management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={() => { setShowAddHall(true); setError(""); }} style={{ border: "1px solid #1B2D5B", color: "#1B2D5B", padding: "8px 16px", fontSize: "13px", fontWeight: 600, backgroundColor: "white", cursor: "pointer" }}>+ Add Hall</button>
            <button onClick={() => { setShowAddBooking(true); setError(""); }} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Book Hall</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Add Hall Modal */}
          {showAddHall && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add Event Hall</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Hall Name *", key: "name", placeholder: "e.g. Grand Ballroom" },
                    { label: "Description", key: "description", placeholder: "Brief description" },
                    { label: "Capacity *", key: "capacity", placeholder: "e.g. 500", type: "number" },
                    { label: "Size (sqm)", key: "size_sqm", placeholder: "e.g. 800", type: "number" },
                    { label: "Floor", key: "floor", placeholder: "e.g. 1", type: "number" },
                    { label: "Price Per Day (₦) *", key: "price_per_day", placeholder: "e.g. 500000", type: "number" },
                    { label: "Amenities (comma separated)", key: "amenities", placeholder: "AC, Stage, Sound System" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                      <input type={f.type || "text"} value={hallForm[f.key as keyof typeof hallForm]} onChange={(e) => setHallForm({ ...hallForm, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAddHall} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Hall"}
                    </button>
                    <button onClick={() => { setShowAddHall(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Add Booking Modal */}
          {showAddBooking && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Book Event Hall</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Event Hall *</label>
                    <select value={bookingForm.event_hall_id} onChange={(e) => setBookingForm({ ...bookingForm, event_hall_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select hall</option>
                      {halls.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                    </select>
                  </div>
                  {[
                    { label: "Client Name *", key: "client_name", placeholder: "Client or company name" },
                    { label: "Client Email", key: "client_email", placeholder: "client@email.com" },
                    { label: "Client Phone", key: "client_phone", placeholder: "+234 000 000 0000" },
                    { label: "Event Name *", key: "event_name", placeholder: "e.g. Annual Gala Dinner" },
                    { label: "Guest Count", key: "guest_count", placeholder: "e.g. 200", type: "number" },
                    { label: "Amount (₦) *", key: "amount", placeholder: "e.g. 500000", type: "number" },
                    { label: "Notes", key: "notes", placeholder: "Optional notes" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                      <input type={f.type || "text"} value={bookingForm[f.key as keyof typeof bookingForm]} onChange={(e) => setBookingForm({ ...bookingForm, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Event Date *</label>
                    <input type="date" value={bookingForm.event_date} onChange={(e) => setBookingForm({ ...bookingForm, event_date: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAddBooking} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#B8952A", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Create Booking"}
                    </button>
                    <button onClick={() => { setShowAddBooking(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Halls", value: summary.total, color: "#1B2D5B" },
              { label: "Available", value: summary.available, color: "#15803d" },
              { label: "Booked", value: summary.booked, color: "#1B2D5B" },
              { label: "Event Revenue", value: `₦${(summary.revenue / 1000).toFixed(0)}K`, color: "#B8952A" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", borderBottom: "1px solid #E5E7EB" }}>
            {["halls", "bookings"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 20px", fontSize: "13px", border: "none", borderBottom: activeTab === tab ? "2px solid #1B2D5B" : "2px solid transparent", backgroundColor: "transparent", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>{tab}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading...</p></div>
          ) : activeTab === "halls" ? (
            halls.length === 0 ? (
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "48px", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 16px" }}>No event halls found. Add your first hall.</p>
                <button onClick={() => setShowAddHall(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Hall</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
                {halls.map((hall) => (
                  <div key={hall.id} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{hall.name}</h3>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{hall.size_sqm ? `${hall.size_sqm} sqm` : ""} · Floor {hall.floor ?? "—"}</p>
                      </div>
                      <span style={{ backgroundColor: statusBg[hall.status] || "#F3F4F6", color: statusColor[hall.status] || "#6B7280", padding: "4px 8px", fontSize: "10px", fontWeight: 600 }}>{hall.status}</span>
                    </div>
                    {hall.description && <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 16px", lineHeight: 1.6 }}>{hall.description}</p>}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Capacity</p>
                        <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>{hall.capacity} guests</p>
                      </div>
                      <div>
                        <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Rate / Day</p>
                        <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>₦{(hall.price_per_day || 0).toLocaleString()}</p>
                      </div>
                    </div>
                    {hall.amenities && hall.amenities.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {hall.amenities.map((a: string) => (
                          <span key={a} style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 8px" }}>{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Hall", "Client", "Event", "Date", "Guests", "Amount", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr><td colSpan={8} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No bookings found.</td></tr>
                  ) : bookings.map((b, i) => {
                    const hall = getHall(b.event_hall_id);
                    return (
                      <tr key={b.id} style={{ borderBottom: i < bookings.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>{hall?.name || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{b.client_name}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.event_name}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.event_date}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{b.guest_count || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>₦{(b.amount || 0).toLocaleString()}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[b.status] || "#F3F4F6", color: statusColor[b.status] || "#6B7280", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{b.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          {b.status === "Pending" && <button onClick={() => handleConfirmBooking(b.id)} style={{ color: "#15803d", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Confirm</button>}
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