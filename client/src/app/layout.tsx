import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEPTA Voting System",
  description: "Let's Vote Online!!!",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 ">{children}</body>
    </html>
  );
}
