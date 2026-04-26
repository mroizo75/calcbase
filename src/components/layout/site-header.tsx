import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { ActiveLink } from "./active-link";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="relative flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/calclogo.png"
            alt="CalcBase – Business Calculators"
            className="h-16 w-auto"
          />
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-1 sm:flex">
          <HeaderSearch />
          <ActiveLink href="/calculators">Calculators</ActiveLink>
          <ActiveLink href="/guides">Guides</ActiveLink>
          <ActiveLink href="/about">About</ActiveLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
