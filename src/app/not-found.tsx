import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="mb-2 text-6xl font-bold tracking-tight">404</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go Home
        </Link>
        <Link
          href="/calculators"
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          All Calculators
        </Link>
      </div>
    </div>
  );
}
