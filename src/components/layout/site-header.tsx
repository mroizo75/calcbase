import Link from "next/link";
import { Calculator } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { ActiveLink } from "./active-link";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <Calculator className="h-5 w-5 text-primary" />
          <span className="text-lg">CalcBase</span>
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
