"use client";
import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "🚀",
    articles: [
      {
        title: "Setting up your hotel",
        content: `After registering, you'll be guided through a 6-step onboarding wizard:

1. Welcome — Overview of the platform
2. Hotel Profile — Enter your hotel name, location, contact details
3. Preferences — Set your currency and timezone
4. Room Types — Define your room categories and pricing (e.g. Standard, Deluxe, Suite)
5. First Room — Add your first room to the system
6. Done — You're ready to start managing operations

After onboarding, go to Settings → Hotel to update your hotel logo and additional details.`
      },
      {
        title: "Understanding the dashboard",
        content: `The dashboard gives you a real-time overview of your hotel:

- Occupancy Rate — percentage of rooms currently occupied
- Active Reservations — confirmed bookings and checked-in guests
- Total Guests — all registered guests in your system
- Total Revenue — sum of all successful payments

The Room Status section shows available, occupied, reserved, and cleaning rooms at a glance.

Quick Actions let you jump directly to creating a reservation, adding a guest, or generating a report.`
      },
      {
        title: "Adding your team",
        content: `To add staff members:

1. Go to Staff in the left navigation
2. Click + Add Staff
3. Enter their name, email, phone, role, and department
4. Assign a shift (Morning, Evening, or Night)
5. Click Add Staff

Staff roles and permissions:
- Hotel Owner — full access to everything
- Manager — all operations except settings
- Receptionist — reservations, guests, payments only
- Housekeeping — housekeeping tasks and room status only
- Finance — payments and reports only
- Event Manager — event halls and bookings only`
      },
    ]
  },
  {
    id: "reservations",
    title: "Reservations",
    icon: "📅",
    articles: [
      {
        title: "Creating a reservation",
        content: `To create a new reservation:

1. Go to Reservations → click + New Reservation
2. Select the guest (or add a new guest first)
3. Select the room
4. Set check-in and check-out dates
5. Enter number of adults
6. Enter the total amount
7. Click Create Reservation

The reservation will be created with status Confirmed and payment status Pending.`
      },
      {
        title: "Check-in and Check-out",
        content: `To check in a guest:

1. Go to Reservations
2. Find the reservation (status: Confirmed)
3. Click Check In in the actions column
4. The status changes to Checked In

To check out a guest:

1. Find the reservation (status: Checked In)
2. Click Check Out
3. The status changes to Checked Out
4. The room status automatically updates to Cleaning`
      },
      {
        title: "Processing payments",
        content: `You can record payments in two ways:

Manual payment (cash, bank transfer):
1. Go to Payments → + Record Payment
2. Select guest and reservation
3. Enter amount and payment method
4. Add reference if available
5. Click Record Payment

Paystack online payment:
1. Go to Reservations
2. Find the reservation with Pending payment
3. Click Pay via Paystack
4. The guest will be directed to Paystack checkout
5. Payment is automatically confirmed when complete`
      },
    ]
  },
  {
    id: "rooms",
    title: "Room Management",
    icon: "🏨",
    articles: [
      {
        title: "Setting up room types",
        content: `Room types define your categories of rooms and pricing.

To add a room type:
1. Go to Rooms → click Room Types (or Rooms/Types)
2. Click + Add Room Type
3. Enter the name (e.g. Standard, Deluxe, Suite)
4. Set the base price per night
5. Set capacity (number of guests)
6. Add amenities separated by commas (e.g. AC, WiFi, TV, Minibar)

Always add room types before adding individual rooms.`
      },
      {
        title: "Adding rooms",
        content: `To add a room:

1. Go to Rooms → click + Add Room
2. Enter the room number (e.g. 101, 202)
3. Select the floor
4. Select the room type
5. Set initial status (usually Available)
6. Add any notes
7. Click Add Room

You can switch between Grid view and List view using the buttons in the header.`
      },
      {
        title: "Room statuses",
        content: `Rooms can have the following statuses:

- Available — ready for a new guest
- Occupied — guest is currently staying
- Reserved — booked but guest hasn't arrived yet
- Cleaning — being cleaned after checkout
- Maintenance — under repair or maintenance
- Out of Service — not available for booking

Update room status by selecting from the dropdown on each room card.`
      },
    ]
  },
  {
    id: "housekeeping",
    title: "Housekeeping",
    icon: "🧹",
    articles: [
      {
        title: "Managing housekeeping tasks",
        content: `To add a housekeeping task:

1. Go to Housekeeping → click + Add Task
2. Select the room
3. Assign to a staff member (optional)
4. Select task type (Full Cleaning, Turndown, Deep Cleaning, etc.)
5. Set priority (Normal, High, Urgent)
6. Set scheduled date
7. Click Add Task

To update task progress:
- Click Start to mark as In Progress
- Click Complete to mark as Completed`
      },
    ]
  },
  {
    id: "ai-concierge",
    title: "AI Concierge",
    icon: "🤖",
    articles: [
      {
        title: "Using the AI Concierge",
        content: `The AI Concierge is powered by Claude AI and has real-time access to your hotel data.

You can ask it questions like:
- "Give me a full operations summary"
- "How many rooms are available right now?"
- "What is our occupancy rate today?"
- "Who are our VIP guests?"
- "What is the total revenue this month?"
- "How many housekeeping tasks are pending?"
- "Which reservations are checking out today?"

The AI responds based on your live hotel data. It does not have access to other hotels' data.

Note: AI Concierge is available on Professional plan and above.`
      },
    ]
  },
  {
    id: "settings",
    title: "Settings",
    icon: "⚙️",
    articles: [
      {
        title: "Hotel settings",
        content: `To update your hotel profile:

1. Go to Settings → Hotel tab
2. Upload your hotel logo (JPG, PNG, WebP, max 5MB)
3. Update hotel name, email, phone
4. Enter your hotel address and city
5. Add your website URL
6. Click Save Changes

Your hotel name and logo will appear in email notifications sent to guests.`
      },
      {
        title: "Changing your password",
        content: `To change your password:

1. Go to Settings → Security tab
2. Enter your current password
3. Enter your new password (minimum 8 characters)
4. Confirm the new password
5. Click Update Password

If you've forgotten your password, use the Forgot Password link on the login page.`
      },
      {
        title: "Managing your subscription",
        content: `To view your subscription details:

1. Go to Settings → Billing tab
2. Click "View subscription details"

The subscription page shows:
- Your current plan and status
- Days remaining in trial
- Room and staff usage vs limits
- Feature availability (AI, photos, events)

To upgrade, click the Upgrade button on any plan card.

For Enterprise pricing, click Contact Sales.`
      },
    ]
  },
];

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeArticle, setActiveArticle] = useState(0);

  const section = sections.find(s => s.id === activeSection);
  const article = section?.articles[activeArticle];

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <Link href="/dashboard" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>Dashboard</Link>
          <Link href="/login" style={{ color: "white", fontSize: "14px", textDecoration: "none", fontWeight: 600 }}>Sign In</Link>
        </div>
      </nav>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px", display: "flex", gap: "32px" }}>

        {/* Sidebar */}
        <div style={{ width: "260px", flexShrink: 0 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>User Guide</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveSection(s.id); setActiveArticle(0); }}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", fontSize: "13px", textAlign: "left", border: "none", backgroundColor: activeSection === s.id ? "#1B2D5B" : "white", color: activeSection === s.id ? "white" : "#374151", cursor: "pointer", fontWeight: activeSection === s.id ? 600 : 400, borderRadius: "4px" }}
              >
                <span>{s.icon}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {section && (
            <>
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                {section.articles.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveArticle(i)}
                    style={{ padding: "6px 14px", fontSize: "12px", border: "1px solid #E5E7EB", backgroundColor: activeArticle === i ? "#B8952A" : "white", color: activeArticle === i ? "white" : "#6B7280", cursor: "pointer", fontWeight: activeArticle === i ? 600 : 400 }}
                  >
                    {a.title}
                  </button>
                ))}
              </div>

              {article && (
                <div style={{ backgroundColor: "white", border: "1px solid #E5E7EB", padding: "32px" }}>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 24px" }}>{article.title}</h1>
                  <div style={{ color: "#374151", fontSize: "14px", lineHeight: 1.9, whiteSpace: "pre-line" }}>
                    {article.content}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #E5E7EB", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "48px" }}>
        <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>CMR Hospitality Suite · CMR Group Nigeria</p>
        <div style={{ display: "flex", gap: "24px" }}>
          <Link href="/legal/terms" style={{ color: "#9CA3AF", fontSize: "13px", textDecoration: "none" }}>Terms</Link>
          <Link href="/legal/privacy" style={{ color: "#9CA3AF", fontSize: "13px", textDecoration: "none" }}>Privacy</Link>
          <Link href="/" style={{ color: "#9CA3AF", fontSize: "13px", textDecoration: "none" }}>Home</Link>
        </div>
      </footer>
    </main>
  );
}