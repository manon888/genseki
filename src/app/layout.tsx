import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genseki — Find What&apos;s Inside You",
  description: "Find your latent gifts and connect them to real pathways in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}