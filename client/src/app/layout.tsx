"use client";

import React from "react";
import "./globals.css";
import { TimerProvider } from "./context/TimeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 relative">
        <TimerProvider>{children}</TimerProvider>
      </body>
    </html>
  );
}
