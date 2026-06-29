"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }
    verifyEmail(token);
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      await api.post("/api/v1/auth/verify-email", { token });
      setStatus("success");
      setMessage("Your email has been verified successfully!");
      setTimeout(() => router.push("/onboarding"), 3000);
    } catch (err: unknown) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Verification failed. The link may have expired.");
    }
  };

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #e5e0d8", padding: "48px", width: "100%", maxWidth: "440px", textAlign: "center" }}>
      {status === "loading" && (
        <>
          <p style={{ color: "#1B2D5B", fontSize: "16px", fontWeight: 600, margin: "0 0 8px" }}>Verifying your email...</p>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: 0 }}>Please wait a moment.</p>
        </>
      )}
      {status === "success" && (
        <>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#F0FDF4", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#15803d", fontSize: "24px" }}>✓</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Email Verified!</h1>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 24px" }}>{message}</p>
          <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>Redirecting to login...</p>
        </>
      )}
      {status === "error" && (
        <>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#FEF2F2", borderRadius: "50%", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#dc2626", fontSize: "24px" }}>✕</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: "#1B2D5B", margin: "0 0 8px" }}>Verification Failed</h1>
          <p style={{ color: "#6B7280", fontSize: "14px", margin: "0 0 24px" }}>{message}</p>
          <Link href="/login" style={{ backgroundColor: "#1B2D5B", color: "white", padding: "12px 24px", fontSize: "13px", fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Go to Login</Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <main style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", backgroundColor: "#F9F7F4", display: "flex", flexDirection: "column" }}>
      <nav style={{ backgroundColor: "#1B2D5B", padding: "0 48px", height: "72px", display: "flex", alignItems: "center" }}>
        <Link href="/"><img src="/cmr-hospitality-logo.jpeg" alt="CMR Hospitality Suite" style={{ height: "60px", width: "auto" }} /></Link>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <Suspense fallback={<div style={{ color: "#9CA3AF" }}>Loading...</div>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </main>
  );
}