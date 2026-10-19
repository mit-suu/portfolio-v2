import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { GRADE_BOOT_SCRIPT } from "@/lib/grade";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display-face",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "700"],
});

const serif = Fraunces({
  variable: "--font-serif-face",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const sans = Inter({
  variable: "--font-sans-face",
  subsets: ["latin", "vietnamese"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tran Tuan Hiep — Full-Stack & AI Engineer",
  description:
    "The portfolio of Tran Tuan Hiep, a full-stack and AI engineer in Da Nang building with React, Next.js, Node.js and TypeScript — told as a film.",
};

export const viewport: Viewport = {
  themeColor: "#070a0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable} ${mono.variable}`}
      // The boot script may set data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: GRADE_BOOT_SCRIPT }} />
      </head>
      <body>
        <noscript>
          <style>{`.leader{display:none}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
