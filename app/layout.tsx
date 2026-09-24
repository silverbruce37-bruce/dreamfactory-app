import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Syne } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const headline = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-headline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DREAMFRAME — AI Image Generator",
  description:
    "Create cinematic stills with DreamFrame, an AI image generator for editorial, product, and film-grade frames.",
};

export const viewport = {
  themeColor: "#07060c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} ${headline.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
