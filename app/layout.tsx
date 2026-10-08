import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Friends Provisional Store",
  description: "Local grocery and daily essentials store website for Friends Provisional Store.",
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
