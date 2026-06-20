"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = ["profile", "hotel", "billing", "security", "integrations"];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>
      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "Settings" ? "white" : "#94a3b8", backgroundColor: item === "Settings" ? "#243d75" : "transparent", fontWeight: item === "Settings" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>Settings</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Manage your account and hotel settings</p>
          </div>
          {saved && <span style={{ color: "#15803d", fontSize: "13px", fontWeight: 500 }}>✓ Changes saved</span>}
        </header>

        <div style={{ padding: "28px", flex: 1 }}>
          <div style={{ display: "flex", gap: "24px" }}>

            {/* Sidebar Tabs */}
            <div style={{ width: "200px", flexShrink: 0 }}>
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ display: "block", width: "100%", padding: "12px 16px", fontSize: "13px", textAlign: "left", border: "none", borderBottom: "1px solid #F3F4F6", backgroundColor: activeTab === tab ? "#F4F5F7" : "white", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>

              {activeTab === "profile" && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Profile Settings</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Full Name</label>
                      <input defaultValue={user?.full_name || ""} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Email Address</label>
                      <input defaultValue={user?.email || ""} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Phone Number</label>
                      <input placeholder="+234 000 000 0000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <button onClick={handleSave} style={{ alignSelf: "flex-start", backgroundColor: "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === "hotel" && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Hotel Settings</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                    {[
                      { label: "Hotel Name", placeholder: "e.g. Parkview Hotel Abuja" },
                      { label: "Hotel Email", placeholder: "hotel@email.com" },
                      { label: "Hotel Phone", placeholder: "+234 000 000 0000" },
                      { label: "Address", placeholder: "Hotel address" },
                      { label: "City", placeholder: "e.g. Abuja" },
                      { label: "Country", placeholder: "e.g. Nigeria" },
                      { label: "Website", placeholder: "https://yourhotel.com" },
                    ].map((f) => (
                      <div key={f.label}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                        <input placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <button onClick={handleSave} style={{ alignSelf: "flex-start", backgroundColor: "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>Save Changes</button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Security Settings</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Current Password</label>
                      <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>New Password</label>
                      <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Confirm New Password</label>
                      <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                    </div>
                    <button onClick={handleSave} style={{ alignSelf: "flex-start", backgroundColor: "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer" }}>Update Password</button>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Billing & Subscription</h2>
                  <p style={{ color: "#6B7280", fontSize: "13px", margin: "0 0 24px" }}>Manage your CMR Hospitality Suite subscription.</p>
                  <div style={{ border: "1px solid #E5E7EB", padding: "20px", marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1B2D5B", margin: "0 0 4px" }}>Starter Plan</p>
                        <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>Currently active — free during beta</p>
                      </div>
                      <span style={{ backgroundColor: "#F0FDF4", color: "#15803d", padding: "4px 10px", fontSize: "11px", fontWeight: 600 }}>Active</span>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                    {[
                      { plan: "Starter", price: "Free", features: ["1 Hotel", "Up to 50 rooms", "Basic analytics", "Email support"] },
                      { plan: "Professional", price: "₦50,000/mo", features: ["1 Hotel", "Unlimited rooms", "AI Concierge", "Advanced analytics", "Priority support"] },
                      { plan: "Enterprise", price: "Custom", features: ["Multiple hotels", "Unlimited rooms", "Full AI suite", "Custom integrations", "Dedicated support"] },
                    ].map((p) => (
                      <div key={p.plan} style={{ border: p.plan === "Professional" ? "2px solid #1B2D5B" : "1px solid #E5E7EB", padding: "20px" }}>
                        {p.plan === "Professional" && <p style={{ fontSize: "10px", color: "#B8952A", fontWeight: 700, margin: "0 0 8px", textTransform: "uppercase" }}>Recommended</p>}
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{p.plan}</p>
                        <p style={{ fontSize: "18px", fontWeight: 700, color: "#B8952A", margin: "0 0 16px" }}>{p.price}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
                          {p.features.map(f => (
                            <p key={f} style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>✓ {f}</p>
                          ))}
                        </div>
                        <button style={{ width: "100%", backgroundColor: p.plan === "Professional" ? "#1B2D5B" : "white", color: p.plan === "Professional" ? "white" : "#1B2D5B", padding: "10px", fontSize: "12px", fontWeight: 600, border: "1px solid #1B2D5B", cursor: "pointer" }}>
                          {p.plan === "Starter" ? "Current Plan" : "Upgrade"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "integrations" && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Integrations</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { name: "Paystack", desc: "Accept payments from guests via card, bank transfer and USSD.", status: "Not Connected", color: "#6B7280" },
                      { name: "Flutterwave", desc: "Alternative payment gateway for African markets.", status: "Not Connected", color: "#6B7280" },
                      { name: "Resend", desc: "Send booking confirmations and notifications via email.", status: "Not Connected", color: "#6B7280" },
                      { name: "Anthropic AI", desc: "Power the CMR AI Concierge with Claude AI.", status: "Connected", color: "#15803d" },
                      { name: "WhatsApp Business", desc: "Send booking confirmations and updates via WhatsApp.", status: "Coming Soon", color: "#B8952A" },
                      { name: "Termii SMS", desc: "Send SMS alerts and notifications to guests.", status: "Coming Soon", color: "#B8952A" },
                    ].map((integration) => (
                      <div key={integration.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", border: "1px solid #E5E7EB" }}>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: 600, color: "#1B2D5B", margin: "0 0 4px" }}>{integration.name}</p>
                          <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>{integration.desc}</p>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span style={{ fontSize: "11px", fontWeight: 600, color: integration.color }}>{integration.status}</span>
                          {integration.status === "Not Connected" && (
                            <button style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #1B2D5B", backgroundColor: "white", color: "#1B2D5B", cursor: "pointer", fontWeight: 500 }}>Connect</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}