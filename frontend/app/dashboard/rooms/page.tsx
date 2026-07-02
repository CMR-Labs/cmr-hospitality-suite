"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Room = {
  id: string;
  room_number: string;
  floor: number;
  status: string;
  notes: string;
  room_type_id: string;
  photos: string[];
};

type RoomType = {
  id: string;
  name: string;
  base_price: number;
  capacity: number;
  amenities: string[];
};

const statusColor: Record<string, string> = {
  "Available": "#15803d", "Occupied": "#1B2D5B", "Reserved": "#B8952A",
  "Cleaning": "#6B7280", "Maintenance": "#dc2626", "Out of Service": "#991b1b",
};
const statusBg: Record<string, string> = {
  "Available": "#F0FDF4", "Occupied": "#EEF2FF", "Reserved": "#FFFBEB",
  "Cleaning": "#F3F4F6", "Maintenance": "#FEF2F2", "Out of Service": "#FEF2F2",
};

const statuses = ["All", "Available", "Occupied", "Reserved", "Cleaning", "Maintenance", "Out of Service"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";

export default function Rooms() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ room_number: "", floor: "", status: "Available", notes: "", room_type_id: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingRoomId, setUploadingRoomId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsData, typesData] = await Promise.all([
        api.get("/api/v1/rooms/"),
        api.get("/api/v1/rooms/types/list"),
      ]);
      setRooms(roomsData);
      setRoomTypes(typesData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.room_number) { setError("Room number is required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/rooms/", {
        room_number: newRoom.room_number,
        floor: newRoom.floor ? parseInt(newRoom.floor) : null,
        status: newRoom.status,
        notes: newRoom.notes,
        room_type_id: newRoom.room_type_id || null,
      });
      setShowAddRoom(false);
      setNewRoom({ room_number: "", floor: "", status: "Available", notes: "", room_type_id: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add room");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusUpdate = async (roomId: string, status: string) => {
    try {
      await api.patch(`/api/v1/rooms/${roomId}`, { status });
      fetchData();
    } catch { }
  };

  const handlePhotoUpload = async (roomId: string, file: File) => {
    setUploadingRoomId(roomId);
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/v1/uploads/room-photo/${roomId}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        fetchData();
      } else {
        alert(data.detail || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploadingRoomId(null);
    }
  };

  const handlePhotoDelete = async (roomId: string, photoUrl: string) => {
    try {
      await api.delete(`/api/v1/uploads/room-photo/${roomId}?photo_url=${encodeURIComponent(photoUrl)}`);
      fetchData();
    } catch { }
  };

  const getRoomType = (id: string) => roomTypes.find(t => t.id === id);

  const filtered = rooms.filter((r) => {
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    const matchSearch = r.room_number.includes(search);
    return matchStatus && matchSearch;
  });

  const summary = {
    total: rooms.length,
    available: rooms.filter(r => r.status === "Available").length,
    occupied: rooms.filter(r => r.status === "Occupied").length,
    reserved: rooms.filter(r => r.status === "Reserved").length,
    cleaning: rooms.filter(r => r.status === "Cleaning").length,
    maintenance: rooms.filter(r => r.status === "Maintenance" || r.status === "Out of Service").length,
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Rooms</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Live room management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search rooms..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "200px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setView("grid")} style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: view === "grid" ? "#1B2D5B" : "white", color: view === "grid" ? "white" : "#6B7280", fontSize: "12px", cursor: "pointer" }}>Grid</button>
            <button onClick={() => setView("list")} style={{ padding: "8px 12px", border: "1px solid #E5E7EB", backgroundColor: view === "list" ? "#1B2D5B" : "white", color: view === "list" ? "white" : "#6B7280", fontSize: "12px", cursor: "pointer" }}>List</button>
            <button onClick={() => setShowAddRoom(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Room</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Add Room Modal */}
          {showAddRoom && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add New Room</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room Number *</label>
                    <input value={newRoom.room_number} onChange={(e) => setNewRoom({ ...newRoom, room_number: e.target.value })} placeholder="e.g. 101" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Floor</label>
                    <input value={newRoom.floor} onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })} placeholder="e.g. 1" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room Type</label>
                    <select value={newRoom.room_type_id} onChange={(e) => setNewRoom({ ...newRoom, room_type_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select room type</option>
                      {roomTypes.map(t => <option key={t.id} value={t.id}>{t.name} — ₦{t.base_price.toLocaleString()}/night</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Status</label>
                    <select value={newRoom.status} onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      {statuses.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Notes</label>
                    <input value={newRoom.notes} onChange={(e) => setNewRoom({ ...newRoom, notes: e.target.value })} placeholder="Optional notes" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAddRoom} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Room"}
                    </button>
                    <button onClick={() => { setShowAddRoom(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Total", value: summary.total, color: "#1B2D5B" },
              { label: "Available", value: summary.available, color: "#15803d" },
              { label: "Occupied", value: summary.occupied, color: "#1B2D5B" },
              { label: "Reserved", value: summary.reserved, color: "#B8952A" },
              { label: "Cleaning", value: summary.cleaning, color: "#6B7280" },
              { label: "Maintenance", value: summary.maintenance, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "22px", fontWeight: 700, color: s.color, margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0, textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "4px", marginBottom: "20px", flexWrap: "wrap" }}>
            {statuses.map((s) => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "6px 12px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: statusFilter === s ? "#1B2D5B" : "white", color: statusFilter === s ? "white" : "#6B7280", cursor: "pointer" }}>{s}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}>
              <p style={{ color: "#9CA3AF" }}>Loading rooms...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "48px", textAlign: "center" }}>
              <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 16px" }}>No rooms found. Add your first room to get started.</p>
              <button onClick={() => setShowAddRoom(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Room</button>
            </div>
          ) : view === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {filtered.map((room) => {
                const rt = getRoomType(room.room_type_id);
                const photos = room.photos || [];
                return (
                  <div key={room.id} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Room {room.room_number}</p>
                        <p style={{ fontSize: "12px", color: "#6B7280", margin: "2px 0 0" }}>{rt?.name || "No type"} · Floor {room.floor || "—"}</p>
                      </div>
                      <span style={{ backgroundColor: statusBg[room.status], color: statusColor[room.status], padding: "4px 8px", fontSize: "10px", fontWeight: 600 }}>{room.status}</span>
                    </div>

                    {rt && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                        <div>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Capacity</p>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{rt.capacity} guests</p>
                        </div>
                        <div>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "0 0 2px", textTransform: "uppercase" }}>Rate</p>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>₦{rt.base_price.toLocaleString()}</p>
                        </div>
                      </div>
                    )}

                    {room.notes && <p style={{ fontSize: "11px", color: "#B8952A", margin: "0 0 12px", fontStyle: "italic" }}>{room.notes}</p>}

                    {/* Room Photos */}
                    {photos.length > 0 && (
                      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "10px" }}>
                        {photos.map((photo, idx) => (
                          <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                            <img src={photo} alt={`Room ${room.room_number}`} style={{ width: "64px", height: "48px", objectFit: "cover", border: "1px solid #E5E7EB" }} />
                            <button
                              onClick={() => handlePhotoDelete(room.id, photo)}
                              style={{ position: "absolute", top: "2px", right: "2px", backgroundColor: "rgba(0,0,0,0.6)", color: "white", border: "none", width: "14px", height: "14px", fontSize: "9px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
                            >✕</button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Photo */}
                    <div style={{ marginBottom: "12px" }}>
                      <label style={{ fontSize: "11px", color: "#B8952A", cursor: "pointer", fontWeight: 600 }}>
                        {uploadingRoomId === room.id ? "Uploading..." : "+ Add Photo"}
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          style={{ display: "none" }}
                          disabled={uploadingRoomId === room.id}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handlePhotoUpload(room.id, file);
                          }}
                        />
                      </label>
                      <span style={{ fontSize: "10px", color: "#9CA3AF", marginLeft: "8px" }}>JPG, PNG, WebP · Max 3MB</span>
                    </div>

                    <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "12px" }}>
                      <select value={room.status} onChange={(e) => handleStatusUpdate(room.id, e.target.value)} style={{ width: "100%", padding: "6px 10px", border: "1px solid #E5E7EB", fontSize: "12px", color: "#1B2D5B", outline: "none", backgroundColor: "white", cursor: "pointer" }}>
                        {statuses.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Room", "Type", "Floor", "Capacity", "Rate/Night", "Photos", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((room, i) => {
                    const rt = getRoomType(room.room_type_id);
                    const photos = room.photos || [];
                    return (
                      <tr key={room.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>Room {room.room_number}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#374151" }}>{rt?.name || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6B7280" }}>Floor {room.floor || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6B7280" }}>{rt?.capacity || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 500 }}>₦{rt?.base_price.toLocaleString() || "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            {photos.slice(0, 2).map((photo, idx) => (
                              <img key={idx} src={photo} alt="" style={{ width: "32px", height: "24px", objectFit: "cover", border: "1px solid #E5E7EB" }} />
                            ))}
                            <label style={{ fontSize: "11px", color: "#B8952A", cursor: "pointer", fontWeight: 600 }}>
                              +
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handlePhotoUpload(room.id, file);
                                }}
                              />
                            </label>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[room.status], color: statusColor[room.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{room.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <select value={room.status} onChange={(e) => handleStatusUpdate(room.id, e.target.value)} style={{ padding: "4px 8px", border: "1px solid #E5E7EB", fontSize: "11px", color: "#1B2D5B", outline: "none", backgroundColor: "white", cursor: "pointer" }}>
                            {statuses.filter(s => s !== "All").map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
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