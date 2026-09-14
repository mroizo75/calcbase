import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-dvh min-h-dvh overflow-hidden">{children}</div>;
}
