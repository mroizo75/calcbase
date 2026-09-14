import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { buildSiteMetadata } from "@/lib/seo/metadata";
import { buildSiteGraphJsonLd } from "@/lib/seo/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = buildSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSiteGraphJsonLd()) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
