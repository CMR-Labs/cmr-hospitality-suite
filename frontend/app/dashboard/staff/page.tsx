"use client";
import Link from "next/link";
import { useState } from "react";

const staff = [
  { id: "STF-001", name: "Oluwaseun Adeyemi", role: "General Manager", department: "Management", email: "seun@parkviewabuja.com", phone: "+234 801 111 2222", status: "Active", shift: "Morning", joinDate: "Jan 15, 2023" },
  { id: "STF-002", name: "Fatima Usman", role: "Front Desk Officer", department: "Front Office", email: "fatima@parkviewabuja.com", phone: "+234 802 222 3333", status: "Active", shift: "Morning", joinDate: "Mar 10, 2023" },
  { id: "STF-003", name: "Chukwudi Okafor", role: "Front Desk Officer", department: "Front Office", email: "chukwudi@parkviewabuja.com", phone: "+234 803 333 4444", status: "Active", shift: "Evening", joinDate: "May 22, 2023" },
  { id: "STF-004", name: "Aisha Bello", role: "Housekeeping Supervisor", department: "Housekeeping", email: "aisha@parkviewabuja.com", phone: "+234 804 444 5555", status: "Active", shift: "Morning", joinDate: "Feb 8, 2023" },
  { id: "STF-005", name: "Emeka Eze", role: "Housekeeping Staff", department: "Housekeeping", email: "emeka@parkviewabuja.com", phone: "+234 805 555 6666", status: "Active", shift: "Morning", joinDate: "Jun 1, 2023" },
  { id: "STF-006", name: "Ngozi Okonkwo", role: "Housekeeping Staff", department: "Housekeeping", email: "ngozi@parkviewabuja.com", phone: "+234 806 666 7777", status: "On Leave", shift: "Evening", joinDate: "Apr 14, 2023" },
  { id: "STF-007", name: "Taiwo Adebayo", role: "Chef", department: "Food & Beverage", email: "taiwo@parkviewabuja.com", phone: "+234 807 777 8888", status: "Active", shift: "Morning", joinDate: "Jan 20, 2023" },
  { id: "STF-008", name: "Yusuf Musa", role: "Security Officer", department: "Security", email: "yusuf@parkviewabuja.com", phone: "+234 808 888 9999", status: "Active", shift: "Night", joinDate: "Mar 5, 2023" },
  { id: "STF-009", name: "Blessing Okwu", role: "Accountant", department: "Finance", email: "blessing@parkviewabuja.com", phone: "+234 809 999 0000", status: "Active", shift: "Morning", joinDate: "Feb 28, 2023" },
  { id: "STF-010", name: "Musa Ibrahim", role: "Maintenance Technician", department: "Maintenance", email: "musa@parkviewabuja.com", phone: "+234 810 000 1111", status: "Inactive", shift: "Morning", joinDate: "Jul 10, 2023" },
];

const statusColor: Record<string, string> = {
  "Active": "#15803d", "On Leave": "#B8952A", "Inactive": "#dc2626",
};
const statusBg: Record<string, string> = {
  "Active": "#F0FDF4", "On Leave": "#FFFBEB", "Inactive": "#FEF2F2",
};
const shiftColor: Record<string, string> = {
  "Morning": "#1B2D5B", "Evening": "#B8952A", "Night": "#6B7280",
};

const departments = ["All", "Management", "Front Office", "Housekeeping", "Food & Beverage", "Security", "Finance", "Maintenance"];
const filters = ["All", "Active", "On Leave", "Inactive"];

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Staff() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = staff.filter((s) => {
    const matchFilter = activeFilter === "All" || s.status === activeFilter;
    const matchDept = deptFilter === "All" || s.department === deptFilter;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
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
          <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>Parkview Hotel Abuja</p>
          <p style={{ color: "#6B7280", fontSize: "11px", margin: "0 0 8px" }}>Admin</p>
          <Link href="/login" style={{ color: "#B8952A", fontSize: "12px", textDecoration: "none" }}>Sign out</Link>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Staff</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Staff Management</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, role, department..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <Link href="/dashboard/staff/new" style={{ backgroundColor: "#B8952A", color: "white", padding: "8px 18px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>+ Add Staff</Link>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          {/* Summary */}
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

          {/* Filters */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "4px" }}>
              {filters.map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeFilter === f ? "#1B2D5B" : "white", color: activeFilter === f ? "white" : "#6B7280", cursor: "pointer" }}>{f}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "4px", marginLeft: "16px", flexWrap: "wrap" }}>
              {departments.map((d) => (
                <button key={d} onClick={() => setDeptFilter(d)} style={{ padding: "6px 12px", fontSize: "11px", border: "1px solid #E5E7EB", backgroundColor: deptFilter === d ? "#B8952A" : "white", color: deptFilter === d ? "white" : "#6B7280", cursor: "pointer" }}>{d}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#F9FAFB" }}>
                  {["Staff Member", "Role", "Department", "Contact", "Shift", "Joined", "Status", ""].map((h, i) => (
                    <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 700, flexShrink: 0 }}>
                          {s.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", color: "#1B2D5B", fontWeight: 500, margin: 0 }}>{s.name}</p>
                          <p style={{ fontSize: "10px", color: "#9CA3AF", margin: 0 }}>{s.id}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151" }}>{s.role}</td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{s.department}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <p style={{ fontSize: "12px", color: "#374151", margin: 0 }}>{s.email}</p>
                      <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>{s.phone}</p>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "11px", color: shiftColor[s.shift], backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 500 }}>{s.shift}</span>
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "12px", color: "#6B7280" }}>{s.joinDate}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ backgroundColor: statusBg[s.status], color: statusColor[s.status], padding: "3px 8px", fontSize: "10px", fontWeight: 600 }}>{s.status}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Link href="#" style={{ color: "#B8952A", fontSize: "11px", textDecoration: "none", marginRight: "8px" }}>View</Link>
                      <Link href="#" style={{ color: "#6B7280", fontSize: "11px", textDecoration: "none" }}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: "48px", textAlign: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "14px", margin: 0 }}>No staff found.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}