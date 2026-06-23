import Link from "next/link";

const features = [
  { title: "Smart Booking", desc: "Manage reservations, room availability, and booking confirmations from one unified dashboard." },
  { title: "AI Concierge", desc: "Intelligent assistant that handles guest inquiries, recommendations, and support automatically." },
  { title: "Guest Management", desc: "Complete guest profiles, history, preferences, and communication in one place." },
  { title: "Room Management", desc: "Track room status, housekeeping, maintenance, and availability in real time." },
  { title: "Analytics & Reports", desc: "Real-time operational insights, occupancy rates, revenue tracking, and performance metrics." },
  { title: "Event Management", desc: "Manage event halls, corporate bookings, catering coordination, and scheduling." },
  { title: "Payments", desc: "Seamless payment processing with Paystack and Flutterwave for Nigerian and African markets." },
  { title: "Workflow Automation", desc: "Automate repetitive tasks — check-in reminders, housekeeping schedules, and guest communications." },
];

const steps = [
  { number: "01", title: "Set up your hotel", desc: "Add your rooms, rates, event halls, and team members in minutes." },
  { number: "02", title: "Manage reservations", desc: "Accept bookings, assign rooms, and track guest arrivals from your dashboard." },
  { number: "03", title: "Automate operations", desc: "Let CMR handle reminders, housekeeping schedules, and guest communications." },
  { number: "04", title: "Grow with insights", desc: "Use real-time analytics to make better decisions and increase revenue." },
];

const audiences = ["Hotels", "Resorts", "Guest Houses", "Boutique Hotels", "Serviced Apartments", "Event Centers"];

const reasons = [
  { title: "AI-Powered", desc: "Built with intelligent automation at its core — not as an afterthought." },
  { title: "Built for Africa", desc: "Designed with Nigerian and African hospitality operations in mind." },
  { title: "Secure & Scalable", desc: "Enterprise-grade architecture that grows with your business." },
  { title: "Multi-Tenant Ready", desc: "Manage multiple properties from a single unified platform." },
];

export default function Home() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", margin: 0, padding: 0 }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "#1B2D5B", borderBottom: "1px solid #243d75" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/login" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none", padding: "8px 16px" }}>Sign In</Link>
            <Link href="/register" style={{ backgroundColor: "#B8952A", color: "white", padding: "10px 24px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <section style={{ backgroundColor: "#1B2D5B", paddingTop: "140px", paddingBottom: "100px", paddingLeft: "48px", paddingRight: "48px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", backgroundColor: "#243d75", padding: "8px 16px", marginBottom: "32px" }}>
            <img src="/cmr-group-logo.jpeg" alt="CMR Group" style={{ height: "20px", width: "auto" }} />
            <span style={{ color: "#94a3b8", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Product of CMR Group</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "56px", fontWeight: 700, color: "white", lineHeight: 1.15, margin: "0 0 24px" }}>
            Run Your Hotel on<br /><span style={{ color: "#B8952A" }}>Intelligent Digital Infrastructure</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "18px", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto 40px" }}>
            CMR Hospitality Suite is an AI-powered operations platform that helps hotels, resorts, and hospitality businesses streamline reservations, manage guests, automate workflows, and gain real-time operational insights from a single unified system.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{ backgroundColor: "#B8952A", color: "white", padding: "16px 40px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>Get Started Free</Link>
            <Link href="/demo" style={{ border: "1px solid #94a3b8", color: "#94a3b8", padding: "16px 40px", fontSize: "15px", textDecoration: "none" }}>Book a Demo</Link>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#F9F7F4", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#B8952A", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Features</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Everything your hotel needs</h2>
            <div style={{ height: "2px", width: "48px", backgroundColor: "#B8952A", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
            {features.map((f) => (
              <div key={f.title} style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "32px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "#1B2D5B", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#B8952A", fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{f.title[0]}</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#1B2D5B", margin: "0 0 10px" }}>{f.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#1B2D5B", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#B8952A", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>How It Works</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: "white", margin: "0 0 16px" }}>Up and running in minutes</h2>
            <div style={{ height: "2px", width: "48px", backgroundColor: "#B8952A", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px" }}>
            {steps.map((step) => (
              <div key={step.number} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 700, color: "#B8952A", margin: "0 0 16px" }}>{step.number}</p>
                <h3 style={{ fontSize: "17px", fontWeight: 600, color: "white", margin: "0 0 10px" }}>{step.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#F9F7F4", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ color: "#B8952A", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Who It's For</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Built for every hospitality business</h2>
            <div style={{ height: "2px", width: "48px", backgroundColor: "#B8952A", margin: "0 auto" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px" }}>
            {audiences.map((a) => (
              <span key={a} style={{ border: "1px solid #1B2D5B", color: "#1B2D5B", padding: "12px 28px", fontSize: "14px", fontWeight: 500 }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "white", padding: "96px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ color: "#B8952A", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>Why CMR</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Built different</h2>
            <div style={{ height: "2px", width: "48px", backgroundColor: "#B8952A", margin: "0 auto" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {reasons.map((r) => (
              <div key={r.title} style={{ borderTop: "3px solid #B8952A", padding: "32px 24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 600, color: "#1B2D5B", margin: "0 0 12px" }}>{r.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#1B2D5B", padding: "96px 48px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: "white", margin: "0 0 20px", lineHeight: 1.3 }}>
            Transform your hospitality operations
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: 1.8, margin: "0 0 40px" }}>
            Join forward-thinking hotels and hospitality businesses building smarter operations on intelligent digital infrastructure.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{ backgroundColor: "#B8952A", color: "white", padding: "16px 40px", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>Get Started Free</Link>
            <Link href="/demo" style={{ border: "1px solid #94a3b8", color: "#94a3b8", padding: "16px 40px", fontSize: "15px", textDecoration: "none" }}>Book a Demo</Link>
          </div>
        </div>
      </section>

      <footer style={{ backgroundColor: "#0F1E3D", borderTop: "1px solid #243d75", padding: "40px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "36px", width: "auto" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img src="/cmr-group-logo.jpeg" alt="CMR Group" style={{ height: "16px", width: "auto" }} />
            <span style={{ color: "#4B5563", fontSize: "12px" }}>A product of CMR Group</span>
          </div>
          <p style={{ color: "#4B5563", fontSize: "12px", margin: 0 }}>© 2021-2026 CMR Group · All rights reserved</p>
        </div>
      </footer>
    </main>
  );
}
