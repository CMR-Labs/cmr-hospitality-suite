"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type RoomType = {
  id: string;
  name: string;
  description: string;
  base_price: number;
  capacity: number;
  amenities: string[];
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function RoomTypes() {
  const router = useRouter();
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", description: "", base_price: "", capacity: "2", amenities: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const data = await api.get("/api/v1/rooms/types/list");
      setRoomTypes(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.base_price) { setError("Name and price are required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/rooms/types/", {
        name: form.name,
        description: form.description,
        base_price: parseInt(form.base_price),
        capacity: parseInt(form.capacity),
        amenities: form.amenities ? form.amenities.split(",").map(a => a.trim()) : [],
      });
      setShowAdd(false);
      setForm({ name: "", description: "", base_price: "", capacity: "2", amenities: "" });
      fetchTypes();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add room type");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Rooms" ? "white" : "#94a3b8", backgroundColor: item === "Rooms" ? "#243d75" : "transparent", fontWeight: item === "Rooms" ? 600 : 400, borderRadius: "4px" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/dashboard/rooms" style={{ color: "#9CA3AF", fontSize: "13px", textDecoration: "none" }}>Rooms</Link>
              <span style={{ color: "#9CA3AF" }}>›</span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Room Types</h1>
            </div>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Manage room categories and pricing</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Room Type</button>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add Room Type</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {[
                    { label: "Type Name *", key: "name", placeholder: "e.g. Suite, Deluxe, Standard" },
                    { label: "Description", key: "description", placeholder: "Brief description" },
                    { label: "Base Price (₦) *", key: "base_price", placeholder: "e.g. 60000", type: "number" },
                    { label: "Capacity (guests)", key: "capacity", placeholder: "e.g. 2", type: "number" },
                    { label: "Amenities (comma separated)", key: "amenities", placeholder: "AC, WiFi, TV, Minibar" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                      <input type={f.type || "text"} value={form[f.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Room Type"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading room types...</p></div>
          ) : roomTypes.length === 0 ? (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "48px", textAlign: "center" }}>
              <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 16px" }}>No room types yet. Add your first room type to start managing rooms.</p>
              <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Room Type</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {roomTypes.map((rt) => (
                <div key={rt.id} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "24px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{rt.name}</h3>
                    {rt.description && <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>{rt.description}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                    <div>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Base Price</p>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#B8952A", margin: 0 }}>₦{(rt.base_price || 0).toLocaleString()}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>per night</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Capacity</p>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>{rt.capacity}</p>
                      <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>guests</p>
                    </div>
                  </div>
                  {rt.amenities && rt.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {rt.amenities.map((a: string) => (
                        <span key={a} style={{ fontSize: "10px", color: "#6B7280", backgroundColor: "#F3F4F6", padding: "2px 8px" }}>{a}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}