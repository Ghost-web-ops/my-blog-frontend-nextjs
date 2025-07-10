import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "My Blogspot",
  description: "A simple blog built with Next.js and Strapi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className="min-h-screen flex flex-col justify-between"
      >
      <Navbar />
       <main className="flex-grow">{children}</main> 
      <Footer />
      </body>
    </html>
  );
}
