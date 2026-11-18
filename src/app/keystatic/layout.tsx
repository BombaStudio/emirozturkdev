// src/app/keystatic/layout.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keystatic CMS Admin",
  description: "Content Management System for emirozturkdev",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-auto">
      {children}
    </div>
  );
}
