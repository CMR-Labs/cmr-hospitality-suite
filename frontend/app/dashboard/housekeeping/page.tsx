"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Task = {
  id: string;
  room_id: string;
  assigned_to: string;
  task_type: string;
  priority: string;
  status: string;
  scheduled_date: string;
  notes: string;
};

type Room = { id: string; room_number: string };
type Staff = { id: string; full_name: string };

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const statusColor: Record<string, string> = { "Completed": "#15803d", "In Progress": "#1B2D5B", "Pending": "#B8952A" };
const statusBg: Record<string, string> = { "Completed": "#F0FDF4", "In Progress": "#EEF2FF", "Pending": "#FFFBEB" };
const priorityColor: Record<string, string> = { "Urgent": "#dc2626", "High": "#B8952A", "Normal": "#6B7280" };
const filters = ["All", "Pending", "In Progress", "Completed"];
const taskTypes = ["Full Cleaning", "Turndown Service", "Deep Cleaning", "Linen Change", "Maintenance Report"];
const priorities = ["Normal", "High", "Urgent"];

export default function Housekeeping() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ room_id: "", assigned_to: "", task_type: "Full Cleaning", priority: "Normal", scheduled_date: "", notes: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [taskData, roomData, staffData] = await Promise.all([
        api.get("/api/v1/housekeeping/"),
        api.get("/api/v1/rooms/"),
        api.get("/api/v1/staff/"),
      ]);
      setTasks(taskData);
      setRooms(roomData);
      setStaffList(staffData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!form.room_id) { setError("Room is required"); return; }
    setSaving(true);
    setError("");
    try {
      await api.post("/api/v1/housekeeping/", {
        room_id: form.room_id,
        assigned_to: form.assigned_to || null,
        task_type: form.task_type,
        priority: form.priority,
        scheduled_date: form.scheduled_date || null,
        notes: form.notes,
      });
      setShowAdd(false);
      setForm({ room_id: "", assigned_to: "", task_type: "Full Cleaning", priority: "Normal", scheduled_date: "", notes: "" });
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    } finally {
      setSaving(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      await api.patch(`/api/v1/housekeeping/${id}/complete`, {});
      fetchData();
    } catch { }
  };

  const handleStart = async (id: string) => {
    try {
      await api.patch(`/api/v1/housekeeping/${id}`, { status: "In Progress" });
      fetchData();
    } catch { }
  };

  const getRoom = (id: string) => rooms.find(r => r.id === id);
  const getStaff = (id: string) => staffList.find(s => s.id === id);

  const filtered = tasks.filter((t) => {
    const matchFilter = activeFilter === "All" || t.status === activeFilter;
    const room = getRoom(t.room_id);
    const matchSearch = room?.room_number.includes(search) || t.task_type.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const summary = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    completed: tasks.filter(t => t.status === "Completed").length,
    urgent: tasks.filter(t => t.priority === "Urgent").length,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Housekeeping" ? "white" : "#94a3b8", backgroundColor: item === "Housekeeping" ? "#243d75" : "transparent", fontWeight: item === "Housekeeping" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Housekeeping</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Task management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "200px", backgroundColor: "#F9FAFB" }} />
            <button onClick={() => setShowAdd(true)} style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>+ Add Task</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {showAdd && (
            <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ backgroundColor: "white", padding: "32px", width: "480px", maxWidth: "90vw", maxHeight: "90vh", overflowY: "auto" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Add Housekeeping Task</h2>
                {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "16px" }}>{error}</p>}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Room *</label>
                    <select value={form.room_id} onChange={(e) => setForm({ ...form, room_id: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select room</option>
                      {rooms.map(r => <option key={r.id} value={r.id}>Room {r.room_number}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Assign To</label>
                    <select value={form.assigned_to} onChange={(e) => setForm({ ...form, assigned_to: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      <option value="">Select staff member</option>
                      {staffList.map(s => <option key={s.id} value={s.id}>{s.full_name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Task Type</label>
                    <select value={form.task_type} onChange={(e) => setForm({ ...form, task_type: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      {taskTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Priority</label>
                    <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "white" }}>
                      {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Scheduled Date</label>
                    <input type="date" value={form.scheduled_date} onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Notes</label>
                    <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button onClick={handleAdd} disabled={saving} style={{ flex: 1, backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "12px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                      {saving ? "Saving..." : "Add Task"}
                    </button>
                    <button onClick={() => { setShowAdd(false); setError(""); }} style={{ flex: 1, backgroundColor: "white", color: "#6B7280", padding: "12px", fontSize: "13px", border: "1px solid #E5E7EB", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Tasks", value: summary.total, color: "#1B2D5B" },
              { label: "Pending", value: summary.pending, color: "#B8952A" },
              { label: "In Progress", value: summary.inProgress, color: "#1B2D5B" },
              { label: "Completed", value: summary.completed, color: "#15803d" },
              { label: "Urgent", value: summary.urgent, color: "#dc2626" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "16px 20px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading tasks...</p></div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Room", "Task", "Assigned To", "Date", "Priority", "Status", ""].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No tasks found. Add your first housekeeping task.</td></tr>
                  ) : filtered.map((t, i) => {
                    const room = getRoom(t.room_id);
                    const assignee = getStaff(t.assigned_to);
                    return (
                      <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: "13px", color: "#1B2D5B", fontWeight: 600 }}>Room {room?.room_number || "—"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{t.task_type}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{assignee?.full_name || "Unassigned"}</td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{t.scheduled_date || "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: priorityColor[t.priority] || "#6B7280" }}>{t.priority}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[t.status] || "#F3F4F6", color: statusColor[t.status] || "#6B7280", padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{t.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {t.status === "Pending" && <button onClick={() => handleStart(t.id)} style={{ color: "#1B2D5B", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Start</button>}
                            {t.status === "In Progress" && <button onClick={() => handleComplete(t.id)} style={{ color: "#15803d", fontSize: "11px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Complete</button>}
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