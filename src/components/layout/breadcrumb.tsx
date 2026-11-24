import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Optional overrides for the Spanish pages. Defaults keep the English behaviour. */
  homeLabel?: string;
  homeHref?: string;
  ariaLabel?: string;
}

export function Breadcrumb({
  items,
  homeLabel = "Home",
  homeHref = "/",
  ariaLabel = "Breadcrumb",
}: BreadcrumbProps) {
  return (
    <nav aria-label={ariaLabel} className="mb-4 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href={homeHref} className="transition-colors hover:text-foreground">
            {homeLabel}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
