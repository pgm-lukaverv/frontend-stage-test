// Root layout for the app
// Provides fonts, sidebar, and global TeamProvider context
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { TeamProvider } from "@/context/TeamContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Team Builder",
  description: "Build your ultimate Star Wars team!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Sidebar navigation and global team context */}
        <div className="flex">
          <Sidebar />
          <TeamProvider>
            {/* Main app content */}
            <main className="flex-1 md:ml-64">{children}</main>
          </TeamProvider>
        </div>
      </body>
    </html>
  );
}
