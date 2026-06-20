"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const navItems = [
  "Dashboard", "Reservations", "Guests", "Rooms", "Housekeeping",
  "Event Halls", "Payments", "Analytics", "CRM", "AI Concierge",
  "Notifications", "Reports", "Staff", "Settings",
];

const suggestions = [
  "Show today's occupancy rate",
  "How many guests are checked in?",
  "What is the total revenue?",
  "How many rooms are available?",
  "Show pending housekeeping tasks",
  "How many reservations are confirmed?",
  "What are the pending payments?",
  "Give me a full operations summary",
];

type Message = {
  role: "user" | "assistant";
  content: string;
  time: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Good day! I'm your CMR AI Concierge. I have live access to your hotel operations data. Ask me anything about your rooms, guests, reservations, revenue, housekeeping, or staff.",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  },
];

export default function AIConcierge() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMessage: Message = {
      role: "user",
      content,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const allMessages = [...messages, userMessage];
      const data = await api.post("/api/v1/ai/chat", {
        messages: allMessages.map(m => ({ role: m.role, content: m.content })),
      });

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again.",
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
          <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); router.push("/login"); }} style={{ color: "#B8952A", fontSize: "12px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ marginLeft: "220px", flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", padding: "0 28px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: 0 }}>AI Concierge</h1>
            <p style={{ color: "#9CA3AF", fontSize: "11px", margin: 0 }}>Powered by CMR AI · Live hotel data</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#15803d" }} />
            <span style={{ fontSize: "12px", color: "#15803d", fontWeight: 500 }}>Online</span>
          </div>
        </header>

        <div style={{ display: "flex", flex: 1, overflow: "hidden", height: "calc(100vh - 60px)" }}>

          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
                    <span style={{ color: "#B8952A", fontSize: "18px" }}>···</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

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

          {/* Suggestions */}
          <div style={{ width: "260px", backgroundColor: "white", borderLeft: "1px solid #E5E7EB", padding: "20px", overflowY: "auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "13px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 16px" }}>Suggested Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {suggestions.map((s) => (
                <button key={s} onClick={() => sendMessage(s)} disabled={loading} style={{ padding: "10px 12px", border: "1px solid #E5E7EB", backgroundColor: "white", fontSize: "12px", color: "#374151", cursor: loading ? "not-allowed" : "pointer", textAlign: "left", lineHeight: 1.4 }}>
                  {s}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "24px", padding: "16px", backgroundColor: "#F9F7F4", border: "1px solid #e5e0d8" }}>
              <p style={{ fontSize: "11px", color: "#B8952A", fontWeight: 600, margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Powered by</p>
              <p style={{ fontSize: "12px", color: "#1B2D5B", fontWeight: 600, margin: "0 0 4px" }}>CMR AI</p>
              <p style={{ fontSize: "11px", color: "#6B7280", margin: 0, lineHeight: 1.5 }}>Anthropic Claude · Live hotel data · Secure backend</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}