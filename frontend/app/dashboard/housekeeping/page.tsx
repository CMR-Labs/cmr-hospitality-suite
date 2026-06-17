"use client";
import Link from "next/link";
import { useState } from "react";

const tasks = [
  { id: "HK-001", room: "101", type: "Suite", floor: 1, task: "Full Cleaning", assignedTo: "Aisha Bello", priority: "High", status: "In Progress", startTime: "08:00 AM", estimatedEnd: "09:30 AM", notes: "VIP guest checking in at 2PM" },
  { id: "HK-002", room: "103", type: "Standard", floor: 1, task: "Full Cleaning", assignedTo: "Emeka Eze", priority: "Normal", status: "Pending", startTime: "09:00 AM", estimatedEnd: "10:00 AM", notes: "" },
  { id: "HK-003", room: "204", type: "Suite", floor: 2, task: "Turndown Service", assignedTo: "Ngozi Okonkwo", priority: "Normal", status: "Completed", startTime: "07:00 AM", estimatedEnd: "07:45 AM", notes: "" },
  { id: "HK-004", room: "202", type: "Standard", floor: 2, task: "Maintenance Report", assignedTo: "Aisha Bello", priority: "Urgent", status: "Pending", startTime: "10:00 AM", estimatedEnd: "11:00 AM", notes: "AC unit needs repair — report to maintenance" },
  { id: "HK-005", room: "308", type: "Deluxe", floor: 3, task: "Full Cleaning", assignedTo: "Emeka Eze", priority: "Normal", status: "Completed", startTime: "07:30 AM", estimatedEnd: "08:30 AM", notes: "" },
  { id: "HK-006", room: "105", type: "Suite", floor: 1, task: "Deep Cleaning", assignedTo: "Aisha Bello", priority: "High", status: "Pending", startTime: "11:00 AM", estimatedEnd: "01:00 PM", notes: "Post checkout — honeymoon suite" },
  { id: "HK-007", room: "203", type: "Deluxe", floor: 2, task: "Linen Change", assignedTo: "Ngozi Okonkwo", priority: "Normal", status: "In Progress", startTime: "09:30 AM", estimatedEnd: "10:00 AM", notes: "" },
  { id: "HK-008", room: "301", type: "Standard", floor: 3, task: "Full Cleaning", assignedTo: "Emeka Eze", priority: "Normal", status: "Pending", startTime: "10:30 AM", estimatedEnd: "11:30 AM", notes: "" },
];

const statusColor: Record<string, string> = {
  "Completed": "#15803d", "In Progress": "#1B2D5B", "Pending": "#B8952A",
};
const statusBg: Record<string, string> = {
  "Completed": "#F0FDF4", "In Progress": "#EEF2FF", "Pending": "#FFFBEB",
};
const priorityColor: Record<string, string> = {
  "Urgent": "#dc2626", "High": "#B8952A", "Normal": "#6B7280",
};

const filters = ["All", "Pending", "In Progress", "Completed"];
const floorFilters = ["All Floors", "Floor 1", "Floor 2", "Floor 3"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const staffSummary = [
  { name: "Aisha Bello", tasks: 3, completed: 1, role: "Supervisor" },
  { name: "Emeka Eze", tasks: 3, completed: 2, role: "Staff" },
  { name: "Ngozi Okonkwo", tasks: 2, completed: 1, role: "Staff" },
];

export default function Housekeeping() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [floorFilter, setFloorFilter] = useState("All Floors");
  const [search, setSearch] = useState("");

  const filtered = tasks.filter((t) => {
    const matchFilter = activeFilter === "All" || t.status === activeFilter;
    const matchFloor = floorFilter === "All Floors" || t.floor === parseInt(floorFilter.split(" ")[1]);
    const matchSearch =
      t.room.includes(search) ||
      t.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      t.task.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchFloor && matchSearch;
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
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>Parkview Hotel Abuja</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>Admin</p>
          <Link href="/login" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Housekeeping</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Housekeeping Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search room, staff, task..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/housekeeping/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Task</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "24px" }}>

            {/* Left — Tasks */}
            <div>
              {/* Filters */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: "4px" }}>
                  {filters.map((f) => (
                    <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {floorFilters.map((f) => (
                    <button key={f} onClick={() => setFloorFilter(f)} style={{ padding: "6px 12px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: floorFilter === f ? "#B8952A" : "white", color: floorFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#F9FAFB" }}>
                      {["Room", "Task", "Assigned To", "Time", "Priority", "Status", ""].map((h, i) => (
                        <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((t, i) => (
                      <tr key={t.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                        <td style={{ padding: "12px 16px" }}>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 600, margin: 0 }}>Room {t.room}</p>
                          <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{t.type} · Floor {t.floor}</p>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <p style={{ fontSize: "12px", color: "#374151", fontWeight: 500, margin: 0 }}>{t.task}</p>
                          {t.notes && <p style={{ fontSize: "10px", color: "#B8952A", margin: "2px 0 0", fontStyle: "italic" }}>{t.notes}</p>}
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{t.assignedTo}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <p style={{ fontSize: "11px", color: "#374151", margin: 0 }}>{t.startTime}</p>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>End: {t.estimatedEnd}</p>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: priorityColor[t.priority] }}>{t.priority}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ backgroundColor: statusBg[t.status], color: statusColor[t.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{t.status}</span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            {t.status === "Pending" && <Link href="#" style={{ color: "#1B2D5B", fontSize: "11px", textDecoration: "none" }}>Start</Link>}
                            {t.status === "In Progress" && <Link href="#" style={{ color: "#15803d", fontSize: "11px", textDecoration: "none" }}>Complete</Link>}
                            <Link href="#" style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ padding: "48px", textAlign: "center" }}>
                    <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No tasks found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right — Staff Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Staff on Duty</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {staffSummary.map((s, i) => (
                    <div key={s.name} style={{ paddingBottom: "16px", borderBottom: i < staffSummary.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                        <div style={{ width: "32px", height: "32px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700 }}>
                          {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{s.name}</p>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>{s.role}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", color: "#6B7280" }}>{s.completed}/{s.tasks} tasks</span>
                        <span style={{ fontSize: "11px", color: "#15803d" }}>{Math.round((s.completed / s.tasks) * 100)}%</span>
                      </div>
                      <div style={{ height: "4px", backgroundColor: "#F3F4F6", borderRadius: "2px" }}>
                        <div style={{ width: `${(s.completed / s.tasks) * 100}%`, height: "100%", backgroundColor: "#15803d", borderRadius: "2px" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Quick Actions</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Assign Task", "Mark All Complete", "Generate Report", "View Schedule"].map((a) => (
                    <Link key={a} href="#" style={{ display: "block", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "12px", color: "#1B2D5B", textDecoration: "none", fontWeight: 500 }}>{a}</Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}