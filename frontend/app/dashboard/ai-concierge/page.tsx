"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const suggestions = [
  "Show today's VIP guests",
  "Which rooms need cleaning?",
  "Summarize today's revenue",
  "How many check-ins today?",
  "Show pending reservations",
  "Which rooms are available now?",
  "List overdue payments",
  "Show upcoming events this week",
];

type Message = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Good morning! I'm your CMR AI Concierge. I have full visibility into your hotel operations at Parkview Hotel Abuja. How can I assist you today?\n\nYou can ask me about reservations, guests, room status, revenue, housekeeping, events, or any operational question.",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

export default function AIConcierge() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content) return;

    const userMessage: Message = {
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: `You are the CMR AI Concierge for Parkview Hotel Abuja, an intelligent hospitality operations assistant built into CMR Hospitality Suite by CMR Group.

You have full knowledge of the hotel's current operations:

ROOMS (100 total):
- 42 Available, 38 Occupied, 12 Reserved, 6 Cleaning, 2 Maintenance
- Room types: Suites (₦60,000-₦85,000/night), Deluxe (₦35,000-₦38,000/night), Standard (₦18,000-₦20,000/night)

TODAY'S STATS:
- Occupancy: 82% (+5% from yesterday)
- Revenue: ₦2,450,000
- Active Guests: 127
- Check-ins today: 8, Check-outs today: 5

CURRENT RESERVATIONS (active):
- RES-001: Adebayo Okonkwo, Suite 101, Jun 16-19, Confirmed, Paid
- RES-002: Amina Bello, Deluxe 204, Jun 16-18, Checked In, Paid
- RES-003: Emeka Nwosu, Standard 312, Jun 17-20, Confirmed, Pending Payment
- RES-004: Ngozi Adeyemi, Suite 105, Jun 18-22, Confirmed, Partial Payment
- RES-006: Chioma Obi, Suite 304, Jun 20-25, Confirmed, Pending Payment

VIP GUESTS:
- Adebayo Okonkwo (Suite 101) — 4 stays, ₦480,000 lifetime spend
- Ngozi Adeyemi (Suite 105) — 6 stays, ₦920,000 lifetime spend, Adeyemi Holdings
- Chioma Obi (Suite 304) — Honeymoon guest, welcome package arranged

HOUSEKEEPING:
- 3 tasks pending, 2 in progress, 3 completed
- Urgent: Room 202 AC repair needed
- Room 105 deep cleaning scheduled 11AM (post checkout — honeymoon suite)

EVENTS TODAY:
- Executive Suite: First Bank Nigeria Board Meeting Jun 17
- Grand Ballroom: Adeyemi Holdings Gala Jun 20 (350 guests, ₦500,000)

PENDING PAYMENTS:
- RES-003: Emeka Nwosu ₦60,000
- RES-006: Chioma Obi ₦425,000

STAFF ON DUTY:
- Aisha Bello (Housekeeping Supervisor), Emeka Eze (Housekeeping), Fatima Usman (Front Desk), Chukwudi Okafor (Front Desk Evening), Yusuf Musa (Security Night)

Answer questions about hotel operations clearly and concisely. Be professional, helpful, and specific with numbers and names. Format responses with line breaks for readability. Keep responses under 200 words unless a detailed breakdown is needed.`,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that request. Please try again.";

      const assistantMessage: Message = {
        role: "assistant",
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please check your connection and try again.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif", backgroundColor: "#F4F5F7" }}>

      <aside style={{ width: "220px", backgroundColor: "#1B2D5B", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 20 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #243d75" }}>
          <img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "44px", width: "auto" }} />
        </div>
        <nav style={{ padding: "12px 8px", flex: 1, overflowY: "auto" }}>
          {navItems.map((item) => (
            <Link key={item} href={`/dashboard${item === "Dashboard" ? "" : "/" + item.toLowerCase().replace(" ", "-")}`} style={{ display: "block", padding: "9px 12px", marginBottom: "2px", fontSize: "13px", textDecoration: "none", color: item === "AI Concierge" ? "white" : "#94a3b8", backgroundColor: item === "AI Concierge" ? "#243d75" : "transparent", fontWeight: item === "AI Concierge" ? 600 : 400, borderRadius: "4px" }}>
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
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>AI Concierge</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Parkview Hotel Abuja · Powered by CMR AI</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#15803d" }} />
            <span style={{ fontSize: "12px", color: "#15803d", fontWeight: 500 }}>Online</span>
          </div>
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    {msg.role === "assistant" && (
                      <div style={{ width: "24px", height: "24px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8952A", fontSize: "10px", fontWeight: 700 }}>AI</div>
                    )}
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>{msg.role === "user" ? "You" : "CMR AI"} · {msg.time}</span>
                  </div>
                  <div style={{ maxWidth: "680px", backgroundColor: msg.role === "user" ? "#1B2D5B" : "white", color: msg.role === "user" ? "white" : "#374151", padding: "14px 18px", border: msg.role === "assistant" ? "1px solid #E5E7EB" : "none", fontSize: "13px", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <div style={{ width: "24px", height: "24px", backgroundColor: "#1B2D5B", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8952A", fontSize: "10px", fontWeight: 700 }}>AI</div>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>CMR AI is thinking...</span>
                  </div>
                  <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "14px 18px", display: "flex", gap: "4px", alignItems: "center" }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8952A", animation: "pulse 1.4s ease-in-out infinite", animationDelay: `${j * 0.2}s` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ backgroundColor: "white", borderTop: "1px solid #E5E7EB", padding: "16px 28px" }}>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Ask about guests, rooms, revenue, housekeeping..."
                  style={{ flex: 1, padding: "12px 16px", border: "1px solid #E5E7EB", fontSize: "13px", color: "#1B2D5B", outline: "none", backgroundColor: "#F9FAFB" }}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  style={{ backgroundColor: loading || !input.trim() ? "#E5E7EB" : "#1B2D5B", color: loading || !input.trim() ? "#9CA3AF" : "white", padding: "12px 24px", fontSize: "13px", fontWeight: 600, border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer" }}
                >
                  Send
                </button>
              </div>
            </div>

          </div>

          {/* Suggestions Panel */}
          <div style={{ width: "260px", backgroundColor: "white", borderLeft: "1px solid #E5E7EB", padding: "20px", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Suggested Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} style={{ padding: "10px 12px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#374151", cursor: "pointer", textAlign: "left", lineHeight: 1.4 }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#F9F7F4", border: "1px solid #e5e0d8" }}>
              <p style={{ fontSize: "11px", color: "#B8952A", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Powered by</p>
              <p style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600, margin: "0 0 4px" }}>CMR AI</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>Anthropic Claude · CMR Hospitality Suite</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}