"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/lib/api";
import { canAccessPage } from "@/lib/rbac";

const allNavItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function DashboardSidebar({ active }: { active: string }) {
  const router = useRouter();
  const [role, setRole] = useState("Hotel Owner");
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
    fetchRole();
  }, []);

  const fetchRole = async () => {
    try {
      const data = await api.get("/api/v1/auth/me/role");
      setRole(data.role);
    } catch { }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const visibleItems = allNavItems.filter(item => canAccessPage(role, item));

  return (
    <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
      <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
        <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
      </div>
      <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
        {visibleItems.map((item) => (
          <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === active ? "white" : "#94a3b8", backgroundColor: item === active ? "#243d75" : "transparent", fontWeight: item === active ? 600 : 400, borderRadius: "4px" }}>
            {item}
          </Link>
        ))}
      </nav>
      <div style={{ padding: "16px", borderTop: "1px solid #243d75" }}>
        <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 2px" }}>{user?.full_name || "Hotel Manager"}</p>
        <p style={{ color: "#4B5563", fontSize: "10px", margin: "0 0 4px", textTransform: "capitalize" }}>{role}</p>
        <button onClick={signOut} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
      </div>
    </aside>
  );
}