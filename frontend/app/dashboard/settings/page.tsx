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

            <div style={{ width: "200px", flexShrink: 0 }}>
              <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{ display: "block", width: "100%", padding: "12px 16px", fontSize: "13px", textAlign: "left", border: "none", borderBottom: "1px solid #F3F4F6", backgroundColor: activeTab === tab ? "#F4F5F7" : "white", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

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

                  <div style={{ border: "1px solid #E5E7EB", padding: "20px", marginBottom: "32px", backgroundColor: "#F9F7F4" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#1B2D5B", margin: "0 0 4px" }}>Starter Plan</p>
                        <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 4px" }}>₦31,083/month · Currently active — beta period</p>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>1 Hotel · Up to 7 Rooms · Basic Analytics · 1 Manager Account</p>
                      </div>
                      <span style={{ backgroundColor: "#F0FDF4", color: "#15803d", padding: "4px 10px", fontSize: "11px", fontWeight: 600 }}>Active</span>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                    {[
                      {
                        plan: "Starter", price: "₦31,083", period: "/month", annual: "₦331,970/year",
                        desc: "Ideal for small hotels, lodges, and guest houses.",
                        features: ["1 Hotel", "Up to 7 Rooms", "Reservations Management", "Guest Management", "Payments Management", "Basic Analytics", "Hotel Profile & Hotel Image", "1 Manager Account", "Email Support", "✗ No Room Photo Uploads", "✗ No AI Concierge", "✗ No Event Center Management"],
                        current: true, popular: false,
                      },
                      {
                        plan: "Professional", price: "₦155,000", period: "/month", annual: "₦1,654,800/year — 11% off",
                        desc: "Ideal for growing hotels requiring automation and analytics.",
                        features: ["Up to 2 Hotels", "Up to 25 Rooms", "1 Event Center", "AI Concierge", "Advanced Analytics", "Up to 6 Staff Accounts", "1 Manager Account", "Room Photos (3/room, 1MB max)", "Event Center Photos (5, 1MB max)", "Email Notifications", "Enhanced Reporting", "Priority Support"],
                        current: false, popular: true,
                      },
                      {
                        plan: "Professional Elite", price: "₦550,000", period: "/month", annual: "₦5,874,000/year — 11% off",
                        desc: "Ideal for hotel groups, resorts, and multi-property operators.",
                        features: ["Up to 5 Hotels", "Up to 99 Rooms", "Up to 5 Event Centers", "AI Concierge", "Advanced Analytics", "Custom Dashboard", "Up to 23 Staff Accounts", "Up to 7 Manager Accounts", "Club, Gym, Pool & Bar Mgmt", "Room Photos (2MB max)", "Event Center Photos (13, 3MB)", "Facility Photos (10, 3MB)", "High-Priority Support"],
                        current: false, popular: false,
                      },
                      {
                        plan: "Enterprise", price: "₦13M+", period: "", annual: "Custom pricing — contact sales",
                        desc: "For hotel chains, luxury resorts, and institutional hospitality.",
                        features: ["Unlimited Hotels & Rooms", "Unlimited Event Centers", "Dedicated Infrastructure", "White-Label Options", "Custom Integrations & API", "Unlimited Staff & Managers", "Advanced Reporting", "Dedicated Account Manager", "SLA Coverage", "Data Migration Assistance", "4 Months Implementation", "4 Days On-Site Training", "Go-Live Support"],
                        current: false, popular: false,
                      },
                    ].map((p) => (
                      <div key={p.plan} style={{ border: p.popular ? "2px solid #1B2D5B" : "1px solid #E5E7EB", padding: "20px", display: "flex", flexDirection: "column" }}>
                        {p.popular && <p style={{ fontSize: "10px", color: "#B8952A", fontWeight: 700, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>⭐ Most Popular</p>}
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{p.plan}</p>
                        <p style={{ fontSize: "22px", fontWeight: 700, color: "#B8952A", margin: "0 0 2px" }}>{p.price}<span style={{ fontSize: "12px", fontWeight: 400, color: "#6B7280" }}>{p.period}</span></p>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 0 8px" }}>{p.annual}</p>
                        <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 16px", lineHeight: 1.5 }}>{p.desc}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px", flex: 1 }}>
                          {p.features.map(f => (
                            <p key={f} style={{ fontSize: "11px", color: f.startsWith("✗") ? "#9CA3AF" : "#374151", margin: 0, lineHeight: 1.4 }}>
                              {f.startsWith("✗") ? f : `✓ ${f}`}
                            </p>
                          ))}
                        </div>
                        <button style={{ width: "100%", backgroundColor: p.current ? "#F3F4F6" : p.popular ? "#1B2D5B" : "white", color: p.current ? "#9CA3AF" : p.popular ? "white" : "#1B2D5B", padding: "10px", fontSize: "12px", fontWeight: 600, border: p.current ? "1px solid #E5E7EB" : "1px solid #1B2D5B", cursor: p.current ? "not-allowed" : "pointer" }}>
                          {p.current ? "Current Plan" : p.plan === "Enterprise" ? "Contact Sales" : "Upgrade"}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "32px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Optional Add-Ons</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {[
                        { name: "Additional Rooms", price: "₦2,500/month per room" },
                        { name: "Additional Staff Accounts", price: "₦1,500/month per user" },
                        { name: "WhatsApp Integration", price: "₦15,000/month" },
                        { name: "SMS Notifications", price: "Pay-as-you-use" },
                        { name: "Custom Domain Setup", price: "₦25,000/year" },
                      ].map((a) => (
                        <div key={a.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", border: "1px solid #E5E7EB" }}>
                          <span style={{ fontSize: "13px", color: "#374151" }}>{a.name}</span>
                          <span style={{ fontSize: "13px", color: "#B8952A", fontWeight: 600 }}>{a.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ border: "1px solid #E5E7EB", padding: "20px", backgroundColor: "#F9F7F4", marginBottom: "32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>Hospitality Website Package</p>
                        <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>For hotels requiring a professional online presence.</p>
                      </div>
                      <p style={{ fontSize: "14px", fontWeight: 700, color: "#B8952A", margin: 0 }}>₦250,000 – ₦750,000</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                      {["Custom Hotel Website", "Mobile Responsive", "Contact Forms", "Email Integration", "Image Gallery", "Booking Request Form", "SEO Setup", "Social Media Integration", "Basic Analytics"].map(f => (
                        <span key={f} style={{ fontSize: "11px", color: "#374151", backgroundColor: "white", border: "1px solid #E5E7EB", padding: "3px 10px" }}>✓ {f}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 0 12px" }}>Custom requirements are quoted separately.</p>
                    <button style={{ backgroundColor: "#1B2D5B", color: "white", padding: "10px 20px", fontSize: "12px", fontWeight: 600, border: "none", cursor: "pointer" }}>Request Quote</button>
                  </div>

                  <div style={{ padding: "20px", border: "1px solid #E5E7EB" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "14px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Why Hotels Choose CMR Hospitality Suite</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
                      {["Modern Hotel Operations Platform", "AI-Powered Concierge", "Built for African Hospitality Businesses", "Secure Cloud Infrastructure", "Real-Time Analytics", "Multi-Property Management", "Dedicated Support", "Scalable Enterprise Architecture"].map(r => (
                        <p key={r} style={{ fontSize: "12px", color: "#374151", margin: 0 }}>✅ {r}</p>
                      ))}
                    </div>
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