import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CMR Hospitality Suite — AI-Powered Hospitality Operations Platform",
  description: "CMR Hospitality Suite is an AI-powered operations platform for hotels, resorts, guest houses, and hospitality businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}