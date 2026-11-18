import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Header from "../../components/header";
import Footer from "../../components/Footer";
import MotionProvider from "../../components/motion-provider";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
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
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <Header />
          <div id="main" tabIndex={-1} className="flex-1 w-full pt-16 print:pt-0 outline-none">
            {children}
          </div>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
