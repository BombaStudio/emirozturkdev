import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../../components/Footer";
import "./globals.css";
import Header from "../../components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emir Öztürk",
  description: "Emir Öztürk - Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights/>
      <Analytics/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-zinc-50 dark:bg-black`}
      >
        <Header />
        <div className="flex-1 w-full">
            {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
