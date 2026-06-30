import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Emir Öztürk — Software Developer",
    template: "%s — Emir Öztürk",
  },
  description:
    "Software Developer & Physics Student based in İzmir, Turkey. Building game engines, full-stack web apps, and blockchain solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <div className="flex-1 w-full pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
