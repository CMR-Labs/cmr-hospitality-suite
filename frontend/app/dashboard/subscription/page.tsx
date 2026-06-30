"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

type SubscriptionData = {
  subscription: {
    id: string;
    status: string;
    trial_ends_at: string | null;
    days_left_in_trial: number | null;
    current_period_end: string | null;
  };
  plan: {
    name: string;
    slug: string;
    price_monthly: number;
    max_rooms: number;
    max_staff: number;
    max_hotels: number;
    has_ai: boolean;
    has_photos: boolean;
    has_event_management: boolean;
  };
  usage: {
    rooms_used: number;
    rooms_limit: number;
    staff_used: number;
    staff_limit: number;
  };
};

type Plan = {
  id: string;
  name: string;
  slug: string;
  price_monthly: number;
  price_annual: number;
  max_rooms: number;
  max_staff: number;
  max_hotels: number;
  has_ai: boolean;
  has_photos: boolean;
  has_event_management: boolean;
};

export default function SubscriptionPage() {
  const router = useRouter();
  const [data, setData] = useState<SubscriptionData | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subData, plansData] = await Promise.all([
        api.get("/api/v1/subscription/current"),
        api.get("/api/v1/subscription/plans"),
      ]);
      setData(subData);
      setPlans(plansData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const statusColor: Record<string, string> = {
    trial: "#B8952A", active: "#15803d", expired: "#dc2626", suspended: "#dc2626",
  };
  const statusBg: Record<string, string> = {
    trial: "#FFFBEB", active: "#F0FDF4", expired: "#FEF2F2", suspended: "#FEF2F2",
  };

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
          <Link href="/dashboard/subscription" style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: "white", backgroundColor: "#243d75", fontWeight: 600, borderRadius: "4px" }}>
            Subscription
          </Link>
        </nav>
        <div style={{ padding: "16px", borderTop: "1px solid #243d75" }}>
          <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Subscription & Billing</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Manage your plan and usage</p>
          </div>
        </header>

        <div style={{ padding: "28px", flex: 1 }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading subscription...</p></div>
          ) : data ? (
            <>
              {/* Current Plan Status */}
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{data.plan.name} Plan</p>
                    <p style={{ fontSize: "13px", color: "#6B7280", margin: 0 }}>₦{data.plan.price_monthly.toLocaleString()}/month</p>
                  </div>
                  <span style={{ backgroundColor: statusBg[data.subscription.status] || "#F3F4F6", color: statusColor[data.subscription.status] || "#6B7280", padding: "6px 14px", fontSize: "12px", fontWeight: 700, textTransform: "capitalize" }}>
                    {data.subscription.status}
                  </span>
                </div>

                {data.subscription.status === "trial" && data.subscription.days_left_in_trial !== null && (
                  <div style={{ backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", padding: "16px 20px", marginBottom: "24px" }}>
                    <p style={{ fontSize: "13px", color: "#92400e", margin: 0, fontWeight: 600 }}>
                      {data.subscription.days_left_in_trial} day{data.subscription.days_left_in_trial !== 1 ? "s" : ""} left in your free trial
                    </p>
                    <p style={{ fontSize: "12px", color: "#92400e", margin: "4px 0 0" }}>
                      Upgrade now to avoid any interruption to your hotel operations.
                    </p>
                  </div>
                )}

                {data.subscription.status === "expired" && (
                  <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "16px 20px", marginBottom: "24px" }}>
                    <p style={{ fontSize: "13px", color: "#991b1b", margin: 0, fontWeight: 600 }}>
                      Your trial has expired
                    </p>
                    <p style={{ fontSize: "12px", color: "#991b1b", margin: "4px 0 0" }}>
                      Upgrade now to continue using CMR Hospitality Suite.
                    </p>
                  </div>
                )}

                {/* Usage Bars */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#374151" }}>Rooms</span>
                      <span style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{data.usage.rooms_used} / {data.usage.rooms_limit}</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                      <div style={{ width: `${Math.min(100, (data.usage.rooms_used / data.usage.rooms_limit) * 100)}%`, height: "100%", backgroundColor: data.usage.rooms_used >= data.usage.rooms_limit ? "#dc2626" : "#1B2D5B", borderRadius: "3px" }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", color: "#374151" }}>Staff</span>
                      <span style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600 }}>{data.usage.staff_used} / {data.usage.staff_limit}</span>
                    </div>
                    <div style={{ height: "6px", backgroundColor: "#F3F4F6", borderRadius: "3px" }}>
                      <div style={{ width: `${Math.min(100, (data.usage.staff_used / data.usage.staff_limit) * 100)}%`, height: "100%", backgroundColor: data.usage.staff_used >= data.usage.staff_limit ? "#dc2626" : "#1B2D5B", borderRadius: "3px" }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
                  {[
                    { label: "AI Concierge", active: data.plan.has_ai },
                    { label: "Room Photos", active: data.plan.has_photos },
                    { label: "Event Management", active: data.plan.has_event_management },
                  ].map(f => (
                    <span key={f.label} style={{ fontSize: "11px", color: f.active ? "#15803d" : "#9CA3AF", backgroundColor: f.active ? "#F0FDF4" : "#F3F4F6", padding: "4px 10px", fontWeight: 500 }}>
                      {f.active ? "✓" : "✗"} {f.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* All Plans */}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Available Plans</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {plans.map((p) => {
                  const isCurrent = p.slug === data.plan.slug;
                  return (
                    <div key={p.id} style={{ border: isCurrent ? "2px solid #1B2D5B" : "1px solid #E5E7EB", padding: "20px", backgroundColor: "white" }}>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{p.name}</p>
                      <p style={{ fontSize: "20px", fontWeight: 700, color: "#B8952A", margin: "0 0 16px" }}>₦{p.price_monthly.toLocaleString()}<span style={{ fontSize: "12px", fontWeight: 400, color: "#6B7280" }}>/mo</span></p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "16px", fontSize: "11px", color: "#6B7280" }}>
                        <p style={{ margin: 0 }}>✓ {p.max_hotels} Hotel{p.max_hotels > 1 ? "s" : ""}</p>
                        <p style={{ margin: 0 }}>✓ {p.max_rooms} Rooms</p>
                        <p style={{ margin: 0 }}>✓ {p.max_staff} Staff Accounts</p>
                        <p style={{ margin: 0 }}>{p.has_ai ? "✓" : "✗"} AI Concierge</p>
                      </div>
                      <button disabled={isCurrent} style={{ width: "100%", backgroundColor: isCurrent ? "#F3F4F6" : "#1B2D5B", color: isCurrent ? "#9CA3AF" : "white", padding: "10px", fontSize: "12px", fontWeight: 600, border: "none", cursor: isCurrent ? "not-allowed" : "pointer" }}>
                        {isCurrent ? "Current Plan" : "Upgrade"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p style={{ color: "#9CA3AF" }}>No subscription data found.</p>
          )}
        </div>
      </main>
    </div>
  );
}