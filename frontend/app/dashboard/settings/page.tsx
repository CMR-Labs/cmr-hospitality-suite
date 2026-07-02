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

type Profile = { full_name: string; email: string; phone: string; email_verified: boolean };
type HotelData = {
  name: string; email: string; phone: string; address: string;
  city: string; country: string; website: string; logo_url?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://cmr-hospitality-suite.onrender.com";

const plans = [
  {
    plan: "Starter", price: "₦31,083", period: "/month", annual: "₦331,970/year",
    desc: "Ideal for small hotels, lodges, and guest houses.",
    features: ["1 Hotel", "Up to 11 Rooms", "Reservations Management", "Guest Management", "Payments Management", "Basic Analytics", "1 Manager Account", "Email Support", "Available on Mobile App", "✗ No Room Photo Uploads", "✗ No AI Concierge", "✗ No Event Center Management"],
    current: true, popular: false, enterprise: false,
  },
  {
    plan: "Professional", price: "₦161,250", period: "/month", annual: "₦1,722,150/year — 11% off",
    desc: "Ideal for growing hotels requiring automation and analytics.",
    features: ["Up to 2 Hotels", "Up to 25 Rooms", "1 Event Center", "AI Concierge", "Advanced Analytics", "6 Staff Accounts", "1 Manager Account", "Email Notifications", "Enhanced Reporting", "Priority Support"],
    current: false, popular: true, enterprise: false,
  },
  {
    plan: "Professional Elite", price: "₦573,901+", period: "/month", annual: "",
    desc: "Ideal for hotel groups, resorts, and multi-property operators.",
    features: ["Up to 5 Hotels", "Up to 73+ Rooms", "Up to 5 Event Centers", "Club, Gym, Pool & Bar Mgmt", "AI Concierge (unlimited)", "Advanced Analytics", "Custom Dashboard", "23 Staff Accounts", "7 Manager Accounts", "High-Priority Support"],
    current: false, popular: false, enterprise: false,
  },
  {
    plan: "Enterprise", price: "", period: "", annual: "",
    desc: "For hotel chains, luxury resorts, and institutional hospitality.",
    features: ["Unlimited Hotels & Rooms", "Unlimited Event Centers", "Dedicated Infrastructure", "White-Label Options", "Custom Integrations & API", "Unlimited Staff & Managers", "Advanced Reporting", "Dedicated Account Manager", "SLA Coverage", "Data Migration Assistance", "4 Months Implementation", "Go-Live Support"],
    current: false, popular: false, enterprise: true,
  },
];

export default function Settings() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile>({ full_name: "", email: "", phone: "", email_verified: false });
  const [hotel, setHotel] = useState<HotelData>({ name: "", email: "", phone: "", address: "", city: "", country: "Nigeria", website: "", logo_url: "" });
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "", confirm_password: "" });
  const [loading, setLoading] = useState(true);
  const [logoUploading, setLogoUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileData, hotelData] = await Promise.all([
        api.get("/api/v1/settings/profile"),
        api.get("/api/v1/settings/hotel"),
      ]);
      setProfile(profileData);
      setHotel(hotelData);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await api.patch("/api/v1/settings/profile", {
        full_name: profile.full_name,
        phone: profile.phone,
      });
      setProfile({ ...profile, ...updated });
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        localStorage.setItem("user", JSON.stringify({ ...parsed, full_name: updated.full_name }));
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveHotel = async () => {
    setSaving(true);
    setError("");
    try {
      await api.patch("/api/v1/settings/hotel", {
        name: hotel.name,
        email: hotel.email,
        phone: hotel.phone,
        address: hotel.address,
        city: hotel.city,
        country: hotel.country,
        website: hotel.website,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    setLogoUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/v1/uploads/hotel-logo`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.logo_url) {
        setHotel({ ...hotel, logo_url: data.logo_url });
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setError(data.detail || "Failed to upload logo");
      }
    } catch {
      setError("Failed to upload logo");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!passwords.current_password || !passwords.new_password) { setError("All fields are required"); return; }
    if (passwords.new_password !== passwords.confirm_password) { setError("New passwords do not match"); return; }
    if (passwords.new_password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setSaving(true);
    setError("");
    try {
      await api.patch("/api/v1/settings/password", {
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      setPasswords({ current_password: "", new_password: "", confirm_password: "" });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update password");
    } finally {
      setSaving(false);
    }
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
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px" }}><p style={{ color: "#9CA3AF" }}>Loading settings...</p></div>
          ) : (
            <div style={{ display: "flex", gap: "24px" }}>

              <div style={{ width: "200px", flexShrink: 0 }}>
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", overflow: "hidden" }}>
                  {tabs.map((tab) => (
                    <button key={tab} onClick={() => { setActiveTab(tab); setError(""); }} style={{ display: "block", width: "100%", padding: "12px 16px", fontSize: "13px", textAlign: "left", border: "none", borderBottom: "1px solid #F3F4F6", backgroundColor: activeTab === tab ? "#F4F5F7" : "white", color: activeTab === tab ? "#1B2D5B" : "#6B7280", cursor: "pointer", fontWeight: activeTab === tab ? 600 : 400, textTransform: "capitalize" }}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1 }}>

                {error && <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", padding: "12px 16px", marginBottom: "20px" }}><p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p></div>}

                {activeTab === "profile" && (
                  <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Profile Settings</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Full Name</label>
                        <input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Email Address</label>
                        <input value={profile.email} disabled style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box", backgroundColor: "#F9FAFB", color: "#6B7280" }} />
                        <p style={{ fontSize: "11px", color: profile.email_verified ? "#15803d" : "#B8952A", margin: "4px 0 0" }}>
                          {profile.email_verified ? "✓ Email verified" : "⚠ Email not verified"}
                        </p>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Phone Number</label>
                        <input value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="+234 000 000 0000" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <button onClick={handleSaveProfile} disabled={saving} style={{ alignSelf: "flex-start", backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "hotel" && (
                  <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Hotel Settings</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>

                      {/* Hotel Logo Upload */}
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Hotel Logo</label>
                        {hotel.logo_url && (
                          <div style={{ marginBottom: "10px" }}>
                            <img src={hotel.logo_url} alt="Hotel Logo" style={{ height: "64px", width: "auto", border: "1px solid #E5E7EB", padding: "4px", objectFit: "contain" }} />
                          </div>
                        )}
                        <label style={{ display: "inline-block", backgroundColor: hotel.logo_url ? "white" : "#1B2D5B", color: hotel.logo_url ? "#1B2D5B" : "white", border: "1px solid #1B2D5B", padding: "8px 16px", fontSize: "12px", fontWeight: 600, cursor: logoUploading ? "not-allowed" : "pointer" }}>
                          {logoUploading ? "Uploading..." : hotel.logo_url ? "Change Logo" : "Upload Logo"}
                          <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            style={{ display: "none" }}
                            disabled={logoUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoUpload(file);
                            }}
                          />
                        </label>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "6px 0 0" }}>JPG, PNG or WebP · Max 5MB · Recommended: 400×400px</p>
                      </div>

                      {/* Hotel Fields */}
                      {[
                        { label: "Hotel Name", key: "name", placeholder: "e.g. Parkview Hotel Abuja" },
                        { label: "Hotel Email", key: "email", placeholder: "hotel@email.com" },
                        { label: "Hotel Phone", key: "phone", placeholder: "+234 000 000 0000" },
                        { label: "Address", key: "address", placeholder: "Hotel address" },
                        { label: "City", key: "city", placeholder: "e.g. Abuja" },
                        { label: "Country", key: "country", placeholder: "e.g. Nigeria" },
                        { label: "Website", key: "website", placeholder: "https://yourhotel.com" },
                      ].map((f) => (
                        <div key={f.key}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>{f.label}</label>
                          <input value={(hotel as Record<string, string>)[f.key] || ""} onChange={(e) => setHotel({ ...hotel, [f.key]: e.target.value })} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                        </div>
                      ))}
                      <button onClick={handleSaveHotel} disabled={saving} style={{ alignSelf: "flex-start", backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "28px" }}>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>Security Settings</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Current Password</label>
                        <input type="password" value={passwords.current_password} onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>New Password</label>
                        <input type="password" value={passwords.new_password} onChange={(e) => setPasswords({ ...passwords, new_password: e.target.value })} placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#1B2D5B", marginBottom: "6px" }}>Confirm New Password</label>
                        <input type="password" value={passwords.confirm_password} onChange={(e) => setPasswords({ ...passwords, confirm_password: e.target.value })} placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", border: "1px solid #E5E7EB", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
                      </div>
                      <button onClick={handleUpdatePassword} disabled={saving} style={{ alignSelf: "flex-start", backgroundColor: saving ? "#6B7280" : "#1B2D5B", color: "white", padding: "10px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: saving ? "not-allowed" : "pointer" }}>
                        {saving ? "Updating..." : "Update Password"}
                      </button>
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
                          <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 4px" }}>₦31,083/month · Currently active</p>
                          <p style={{ fontSize: "11px", color: "#9CA3AF", margin: 0 }}>1 Hotel · Up to 11 Rooms · Basic Analytics · 1 Manager Account</p>
                        </div>
                        <span style={{ backgroundColor: "#F0FDF4", color: "#15803d", padding: "4px 10px", fontSize: "11px", fontWeight: 600 }}>Active</span>
                      </div>
                      <Link href="/dashboard/subscription" style={{ display: "inline-block", marginTop: "12px", color: "#B8952A", fontSize: "12px", fontWeight: 600, textDecoration: "none" }}>
                        View subscription details →
                      </Link>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
                      {plans.map((p) => (
                        <div key={p.plan} style={{ border: p.popular ? "2px solid #1B2D5B" : "1px solid #E5E7EB", padding: "20px", display: "flex", flexDirection: "column" }}>
                          {p.popular && <p style={{ fontSize: "10px", color: "#B8952A", fontWeight: 700, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>⭐ Most Popular</p>}
                          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>{p.plan}</p>
                          {p.enterprise ? (
                            <p style={{ fontSize: "15px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 4px" }}>Contact us for pricing</p>
                          ) : (
                            <p style={{ fontSize: "22px", fontWeight: 700, color: "#B8952A", margin: "0 0 2px" }}>{p.price}<span style={{ fontSize: "12px", fontWeight: 400, color: "#6B7280" }}>{p.period}</span></p>
                          )}
                          {p.annual ? <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "0 0 8px" }}>{p.annual}</p> : <div style={{ marginBottom: "8px" }} />}
                          <p style={{ fontSize: "12px", color: "#6B7280", margin: "0 0 16px", lineHeight: 1.5 }}>{p.desc}</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "20px", flex: 1 }}>
                            {p.features.map(f => (
                              <p key={f} style={{ fontSize: "11px", color: f.startsWith("✗") ? "#9CA3AF" : "#374151", margin: 0, lineHeight: 1.4 }}>
                                {f.startsWith("✗") ? f : `✓ ${f}`}
                              </p>
                            ))}
                          </div>
                          <button style={{ width: "100%", backgroundColor: p.current ? "#F3F4F6" : p.popular ? "#1B2D5B" : "white", color: p.current ? "#9CA3AF" : p.popular ? "white" : "#1B2D5B", padding: "10px", fontSize: "12px", fontWeight: 600, border: p.current ? "1px solid #E5E7EB" : "1px solid #1B2D5B", cursor: p.current ? "not-allowed" : "pointer" }}>
                            {p.current ? "Current Plan" : p.enterprise ? "Contact Sales" : "Upgrade"}
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
          )}
        </div>
      </main>
    </div>
  );
}