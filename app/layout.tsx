import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackToTop from "../components/ui/BackToTop";
import dataJson from "../components/data/data.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: dataJson?.pages?.home?.metadata?.title || "Medora Healthcare – Pharmaceutical & Botanical Formulations",
  description: dataJson?.pages?.home?.metadata?.description || "Medora Healthcare is a certified pharmaceutical manufacturer delivering WHO-GMP compliant prescription medicines, sterile injectables, and botanical healthcare solutions.",
  icons: {
    icon: "/logo/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
