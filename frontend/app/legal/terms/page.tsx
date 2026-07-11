"use client";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
        <Link href="/login" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>Sign In</Link>
      </nav>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Terms of Service</h1>
        <p style={{ color: "#9CA3AF", fontSize: "14px", margin: "0 0 48px" }}>Last updated: July 2026</p>

        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing or using CMR Hospitality Suite ('the Service'), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service. The Service is operated by CMR Group, a technology company registered in Nigeria."
          },
          {
            title: "2. Description of Service",
            content: "CMR Hospitality Suite is a cloud-based hotel management platform that provides tools for reservation management, guest management, payment processing, staff management, housekeeping, event management, analytics, and AI-powered insights. The Service is provided on a subscription basis."
          },
          {
            title: "3. Account Registration",
            content: "To use the Service, you must register for an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify CMR Group immediately of any unauthorized use of your account."
          },
          {
            title: "4. Subscription and Payment",
            content: "The Service is available on paid subscription plans as described on our pricing page. Subscription fees are billed monthly or annually in Nigerian Naira (NGN). All payments are processed through Paystack. Fees are non-refundable except as required by applicable law. CMR Group reserves the right to change pricing with 30 days notice."
          },
          {
            title: "5. Free Trial",
            content: "New accounts receive a 14-day free trial. No payment is required during the trial period. At the end of the trial, you must subscribe to a paid plan to continue using the Service. CMR Group reserves the right to modify or terminate free trials at any time."
          },
          {
            title: "6. Data Ownership",
            content: "You retain all rights to your data. CMR Group does not claim ownership of any data you input into the Service. You grant CMR Group a limited license to process your data solely for the purpose of providing the Service. Upon account termination, you may request an export of your data within 30 days."
          },
          {
            title: "7. Data Security",
            content: "CMR Group implements industry-standard security measures to protect your data, including encryption at rest and in transit, role-based access control, and regular security audits. However, no method of electronic storage is 100% secure. You acknowledge that you use the Service at your own risk."
          },
          {
            title: "8. Acceptable Use",
            content: "You agree not to use the Service for any unlawful purpose, to upload malicious content, to attempt to gain unauthorized access to the Service or its infrastructure, to interfere with other users, or to use the Service in any way that violates applicable Nigerian or international laws."
          },
          {
            title: "9. Service Availability",
            content: "CMR Group strives to maintain 99% uptime but does not guarantee uninterrupted access to the Service. Scheduled maintenance will be communicated in advance. CMR Group is not liable for any losses resulting from service interruptions beyond our reasonable control."
          },
          {
            title: "10. Intellectual Property",
            content: "The Service, including its software, design, and content, is owned by CMR Group and protected by Nigerian and international intellectual property laws. You may not copy, modify, distribute, or create derivative works from any part of the Service without written permission."
          },
          {
            title: "11. Termination",
            content: "Either party may terminate the subscription at any time. You may cancel your subscription through the Settings page. CMR Group may suspend or terminate your account for violations of these terms with or without notice. Upon termination, your access to the Service will cease."
          },
          {
            title: "12. Limitation of Liability",
            content: "To the maximum extent permitted by law, CMR Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill. CMR Group's total liability shall not exceed the amount you paid in the 3 months preceding the claim."
          },
          {
            title: "13. Governing Law",
            content: "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria."
          },
          {
            title: "14. Changes to Terms",
            content: "CMR Group reserves the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use of the Service after changes constitutes acceptance of the updated terms."
          },
          {
            title: "15. Contact",
            content: "For questions about these Terms of Service, please contact CMR Group at legal@cmrgroup.ng or through the support channel in your dashboard."
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "32px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 12px" }}>{section.title}</h2>
            <p style={{ color: "#374151", fontSize: "15px", lineHeight: 1.8, margin: 0 }}>{section.content}</p>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "32px", display: "flex", gap: "24px" }}>
          <Link href="/legal/privacy" style={{ color: "#B8952A", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>Privacy Policy</Link>
          <Link href="/" style={{ color: "#6B7280", fontSize: "14px", textDecoration: "none" }}>Back to Home</Link>
        </div>
      </div>
    </main>
  );
}