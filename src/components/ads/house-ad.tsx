import Image from "next/image";
import type { AdFrame } from "@/lib/ads/config";
import type { HouseAd as HouseAdData } from "@/lib/ads/house-ad";

const FRAME_CLASS: Record<AdFrame, string> = {
  banner: "max-h-28 sm:max-h-36",
  rectangle: "max-h-[280px] max-w-sm",
  sidebar: "max-h-[600px]",
};

const FRAME_SIZE: Record<AdFrame, { width: number; height: number; sizes: string }> = {
  banner: { width: 728, height: 90, sizes: "(max-width: 768px) 100vw, 728px" },
  rectangle: { width: 336, height: 280, sizes: "336px" },
  sidebar: { width: 300, height: 600, sizes: "300px" },
};

interface HouseAdProps {
  ad: HouseAdData;
  frame: AdFrame;
}

export function HouseAdView({ ad, frame }: HouseAdProps) {
  const size = FRAME_SIZE[frame];

  return (
    <div aria-label="Advertisement">
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Advertisement
      </p>
      <a href={ad.href} target="_blank" rel="sponsored noopener noreferrer" className="block">
        <Image
          src={ad.imageUrl}
          alt={ad.alt}
          width={ad.width ?? size.width}
          height={ad.height ?? size.height}
          sizes={size.sizes}
          className={`mx-auto h-auto w-auto max-w-full object-contain ${FRAME_CLASS[frame]}`}
        />
      </a>
    </div>
  );
}
