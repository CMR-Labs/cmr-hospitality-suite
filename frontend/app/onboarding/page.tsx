"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const STEPS = [
  { id: 1, title: "Welcome", subtitle: "Let's set up your hotel" },
  { id: 2, title: "Hotel Profile", subtitle: "Tell us about your hotel" },
  { id: 3, title: "Preferences", subtitle: "Currency and timezone" },
  { id: 4, title: "Room Types", subtitle: "Define your room categories" },
  { id: 5, title: "First Room", subtitle: "Add your first room" },
  { id: 6, title: "All Done", subtitle: "You're ready to go" },
];

const CURRENCIES = ["NGN (₦)", "USD ($)", "GBP (£)", "EUR (€)", "GHS (₵)", "KES (KSh)", "ZAR (R)"];
const TIMEZONES = ["Africa/Lagos", "Africa/Nairobi", "Africa/Johannesburg", "Africa/Accra", "Europe/London", "America/New_York"];
const HOTEL_TYPES = ["Hotel", "Lodge", "Guest House", "Resort", "Boutique Hotel", "Motel", "Serviced Apartment"];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [hotel, setHotel] = useState({
    name: "", phone: "", address: "", city: "", country: "Nigeria",
    website: "", hotel_type: "Hotel",
  });
  const [preferences, setPreferences] = useState({
    currency: "NGN (₦)", timezone: "Africa/Lagos",
  });
  const [roomType, setRoomType] = useState({
    name: "", base_price: "", capacity: "2", amenities: "",
  });
  const [room, setRoom] = useState({
    room_number: "", floor: "", notes: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
  }, []);

  const handleHotelSave = async () => {
    if (!hotel.name) { setError("Hotel name is required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.patch("/api/v1/auth/hotel", hotel);
      setStep(3);
    } catch {
      setStep(3);
    } finally {
      setSaving(false);
    }
  };

  const handleRoomTypeSave = async () => {
    if (!roomType.name || !roomType.base_price) { setError("Name and price are required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/rooms/types/", {
        name: roomType.name,
        base_price: parseInt(roomType.base_price),
        capacity: parseInt(roomType.capacity),
        amenities: roomType.amenities ? roomType.amenities.split(",").map(a => a.trim()) : [],
      });
      setStep(5);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save room type");
    } finally {
      setSaving(false);
    }
  };

  const handleRoomSave = async () => {
    if (!room.room_number) { setError("Room number is required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/rooms/", {
        room_number: room.room_number,
        floor: room.floor ? parseInt(room.floor) : null,
        status: "Available",
        notes: room.notes,
      });
      setStep(6);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save room");
    } finally {
      setSaving(false);
    }
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9F7F4", fontFamily: "'Inter', sans-serif" }}>

      {/* Nav */}
      <nav style={{ backgroundColor: "#1B2D5B", height: "64px", display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between" }}>
        <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        <span style={{ color: "#94a3b8", fontSize: "13px" }}>Setting up your hotel</span>
      </nav>

      <div style={{ maxWidth: "640px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Progress */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#6B7280" }}>Step {step} of {STEPS.length}</span>
            <span style={{ fontSize: "13px", color: "#B8952A", fontWeight: 600 }}>{Math.round(progress)}% complete</span>
          </div>
          <div style={{ height: "4px", backgroundColor: "#E5E7EB", borderRadius: "2px" }}>
            <div style={{ height: "100%", width: `${progress}%`, backgroundColor: "#B8952A", borderRadius: "2px", transition: "width 0.3s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
            {STEPS.map((s) => (
              <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: step > s.id ? "#B8952A" : step === s.id ? "#1B2D5B" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: step >= s.id ? "white" : "#9CA3AF", fontWeight: 600 }}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span style={{ fontSize: "10px", color: step === s.id ? "#1B2D5B" : "#9CA3AF", fontWeight: step === s.id ? 600 : 400, textAlign: "center", maxWidth: "60px" }}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "40px" }}>

          {error && <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "12px 16px", marginBottom: "24px" }}><p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p></div>}

          {/* Step 1 — Welcome */}
          {step === 1 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#1B2D5B", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#B8952A", fontSize: "28px" }}>🏨</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>Welcome to CMR Hospitality Suite</h1>
              <p style={{ color: "#6B7280", fontSize: "15px", margin: "0 0 8px", lineHeight: 1.6 }}>Let's get your hotel set up in just a few minutes.</p>
              <p style={{ color: "#9CA3AF", fontSize: "13px", margin: "0 0 40px", lineHeight: 1.6 }}>We'll walk you through setting up your hotel profile, room types, and first room. This takes about 3 minutes.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {["✓ Set up your hotel profile", "✓ Define room types and pricing", "✓ Add your first room", "✓ Start managing operations"].map(item => (
                  <p key={item} style={{ fontSize: "14px", color: "#374151", margin: 0, textAlign: "left", padding: "8px 0", borderBottom: "1px solid #F3F4F6" }}>{item}</p>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={{ marginTop: "32px", width: "100%", backgroundColor: "#1B2D5B", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>
                Get Started →
              </button>
            </div>
          )}

          {/* Step 2 — Hotel Profile */}
          {step === 2 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Hotel Profile</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: "0 0 28px" }}>Tell us about your hotel.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Hotel Name *</label>
                  <input value={hotel.name} onChange={(e) => setHotel({ ...hotel, name: e.target.value })} placeholder="e.g. Parkview Hotel Abuja" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Hotel Type</label>
                  <select value={hotel.hotel_type} onChange={(e) => setHotel({ ...hotel, hotel_type: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                    {HOTEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Phone</label>
                    <input value={hotel.phone} onChange={(e) => setHotel({ ...hotel, phone: e.target.value })} placeholder="+234 000 000 0000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>City</label>
                    <input value={hotel.city} onChange={(e) => setHotel({ ...hotel, city: e.target.value })} placeholder="e.g. Abuja" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Address</label>
                  <input value={hotel.address} onChange={(e) => setHotel({ ...hotel, address: e.target.value })} placeholder="Full hotel address" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Website</label>
                  <input value={hotel.website} onChange={(e) => setHotel({ ...hotel, website: e.target.value })} placeholder="https://yourhotel.com" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Back</button>
                  <button onClick={handleHotelSave} disabled={saving} style={{ flex: 2, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                    {saving ? "Saving..." : "Save & Continue →"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Preferences */}
          {step === 3 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Preferences</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: "0 0 28px" }}>Set your currency and timezone.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Currency</label>
                  <select value={preferences.currency} onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                    {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Timezone</label>
                  <select value={preferences.timezone} onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                    {TIMEZONES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Back</button>
                  <button onClick={() => setStep(4)} style={{ flex: 2, backgroundColor: "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>
                    Save & Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — Room Types */}
          {step === 4 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>First Room Type</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: "0 0 28px" }}>Define your first room category and pricing.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room Type Name *</label>
                  <input value={roomType.name} onChange={(e) => setRoomType({ ...roomType, name: e.target.value })} placeholder="e.g. Standard, Deluxe, Suite" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Price Per Night (₦) *</label>
                    <input type="number" value={roomType.base_price} onChange={(e) => setRoomType({ ...roomType, base_price: e.target.value })} placeholder="e.g. 50000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Capacity (guests)</label>
                    <input type="number" value={roomType.capacity} onChange={(e) => setRoomType({ ...roomType, capacity: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Amenities (comma separated)</label>
                  <input value={roomType.amenities} onChange={(e) => setRoomType({ ...roomType, amenities: e.target.value })} placeholder="AC, WiFi, TV, Hot Shower" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setStep(3)} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Back</button>
                  <button onClick={handleRoomTypeSave} disabled={saving} style={{ flex: 2, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                    {saving ? "Saving..." : "Save & Continue →"}
                  </button>
                </div>
                <button onClick={() => setStep(5)} style={{ backgroundColor: "transparent", color: "#9CA3AF", fontSize: "12px", border: "none", cursor: "pointer", padding: "4px 0" }}>
                  Skip for now →
                </button>
              </div>
            </div>
          )}

          {/* Step 5 — First Room */}
          {step === 5 && (
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Add First Room</h2>
              <p style={{ color: "#6B7280", fontSize: "13px", margin: "0 0 28px" }}>Add your first room to get started.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room Number *</label>
                    <input value={room.room_number} onChange={(e) => setRoom({ ...room, room_number: e.target.value })} placeholder="e.g. 101" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Floor</label>
                    <input type="number" value={room.floor} onChange={(e) => setRoom({ ...room, floor: e.target.value })} placeholder="e.g. 1" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Notes</label>
                  <input value={room.notes} onChange={(e) => setRoom({ ...room, notes: e.target.value })} placeholder="Optional notes about this room" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                  <button onClick={() => setStep(4)} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Back</button>
                  <button onClick={handleRoomSave} disabled={saving} style={{ flex: 2, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                    {saving ? "Saving..." : "Save & Continue →"}
                  </button>
                </div>
                <button onClick={() => setStep(6)} style={{ backgroundColor: "transparent", color: "#9CA3AF", fontSize: "12px", border: "none", cursor: "pointer", padding: "4px 0" }}>
                  Skip for now →
                </button>
              </div>
            </div>
          )}

          {/* Step 6 — Done */}
          {step === 6 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", backgroundColor: "#F0FDF4", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #15803d" }}>
                <span style={{ color: "#15803d", fontSize: "32px" }}>✓</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>You're All Set!</h1>
              <p style={{ color: "#6B7280", fontSize: "15px", margin: "0 0 32px", lineHeight: 1.6 }}>
                Your hotel is now configured and ready to go. Head to your dashboard to start managing operations.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
                {[
                  "✓ Hotel profile configured",
                  "✓ Room types defined",
                  "✓ First room added",
                  "✓ AI Concierge ready",
                  "✓ Payment system active",
                ].map(item => (
                  <p key={item} style={{ fontSize: "14px", color: "#15803d", margin: 0, fontWeight: 500 }}>{item}</p>
                ))}
              </div>
              <button onClick={() => router.push("/dashboard")} style={{ width: "100%", backgroundColor: "#B8952A", color: "white", padding: "14px", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>
                Go to Dashboard →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}