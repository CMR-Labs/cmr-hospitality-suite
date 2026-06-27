"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type AuditLog = {
  id: string;
  action: string;
  user_name: string;
  description: string;
  table_name: string;
  record_id: string;
  ip_address: string;
  created_at: string;
};

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const actionColor: Record<string, string> = {
  "reservation.created": "#1B2D5B",
  "reservation.checkin": "#15803d",
  "reservation.checkout": "#6B7280",
  "payment.created": "#B8952A",
  "payment.confirmed": "#15803d",
  "payment.refunded": "#dc2626",
};

export default function AuditLogs() {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await api.get("/api/v1/audit/");
      setLogs(data);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const filtered = logs.filter((l) =>
    l.description?.toLowerCase().includes(search.toLowerCase()) ||
    l.user_name?.toLowerCase().includes(search.toLowerCase()) ||
    l.action?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: "#94a3b8", backgroundColor: "transparent", fontWeight: 400, borderRadius: "4px" }}>
              {item}
            </Link>
          ))}
          <Link href="/dashboard/audit" style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: "white", backgroundColor: "#243d75", fontWeight: 600, borderRadius: "4px" }}>
            Audit Logs
          </Link>
        </nav>
        <div style={{ padding: "16px", borderTop: "1px solid #243d75" }}>
          <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Audit Logs</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Track all actions performed in your hotel system</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." style={{ padding: "8px 14px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", width: "220px", backgroundColor: "#F9FAFB" }} />
            <button onClick={fetchLogs} style={{ padding: "8px 16px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#6B7280", cursor: "pointer" }}>Refresh</button>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Actions", value: logs.length, color: "#1B2D5B" },
              { label: "Today", value: logs.filter(l => l.created_at && new Date(l.created_at).toDateString() === new Date().toDateString()).length, color: "#B8952A" },
              { label: "Users Active", value: [...new Set(logs.map(l => l.user_name))].length, color: "#15803d" },
            ].map((s) => (
              <div key={s.label} style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "20px 24px" }}>
                <p style={{ color: "#9CA3AF", fontSize: "11px", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading audit logs...</p></div>
          ) : (
            <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F9FAFB" }}>
                    {["Action", "User", "Description", "Table", "IP Address", "Time"].map((h, i) => (
                      <th key={i} style={{ padding: "10px 16px", textAlign: "left", fontSize: "10px", fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid #E5E7EB" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={6} style={{ padding: "48px", textAlign: "center", color: "#9CA3AF" }}>No audit logs yet. Actions will appear here as they happen.</td></tr>
                  ) : filtered.map((log, i) => (
                    <tr key={log.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                      <td style={{ padding: "12px 16px" }}>
                        <span style={{ fontSize: "11px", color: actionColor[log.action] || "#1B2D5B", backgroundColor: "#F3F4F6", padding: "3px 8px", fontWeight: 600, fontFamily: "monospace" }}>{log.action}</span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#1B2D5B", fontWeight: 500 }}>{log.user_name || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#374151", maxWidth: "280px" }}>{log.description || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "11px", color: "#6B7280", fontFamily: "monospace" }}>{log.table_name || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "11px", color: "#9CA3AF", fontFamily: "monospace" }}>{log.ip_address || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: "11px", color: "#9CA3AF" }}>
                        {log.created_at ? new Date(log.created_at).toLocaleString() : "—"}
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