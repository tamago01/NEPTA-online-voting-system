import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEPTA Online Voting System",
  description: "Let's Vote Online!!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
