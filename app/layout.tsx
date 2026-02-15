import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SocialConnect from "@/components/SocialConnect";
import CookieConsent from "@/components/CookieConsent";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shiv Jani | DevOps Engineer & Linux Practitioner",
  description: "Portfolio of Shiv Jani - DevOps Engineer specializing in Linux, automation, CI/CD, and reliable systems. Explore projects, skills, and daily learnings.",
  keywords: ["DevOps", "Shiv Jani", "Linux", "Kubernetes", "Docker", "CI/CD", "AWS", "Automation", "Portfolio"],
  authors: [{ name: "Shiv Jani", url: "https://www.linkedin.com/in/shiv-jani/" }],
  openGraph: {
    title: "Shiv Jani | DevOps Engineer",
    description: "Building reliable, scalable systems with Linux and Cloud Native technologies.",
    url: "https://itsme-gold.vercel.app",
    siteName: "Shiv Jani Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Jani | DevOps Engineer",
    description: "DevOps Engineer specializing in Linux, automation, and CI/CD.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen relative">{children}</main>
          <Footer />
          <SocialConnect />
          <CookieConsent />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
