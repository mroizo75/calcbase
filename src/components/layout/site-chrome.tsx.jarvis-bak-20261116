"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { AdsenseScript } from "@/components/ads/adsense-script";

export function SiteChrome({
  children,
  banner,
}: {
  children: React.ReactNode;
  banner?: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      {banner}
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieBanner />
      <AdsenseScript />
    </>
  );
}
