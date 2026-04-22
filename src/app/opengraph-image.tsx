import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CalcBase – Practical Business Calculators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "#171717",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <span style={{ fontSize: "48px", fontWeight: 700, color: "#171717" }}>
            CalcBase
          </span>
        </div>
        <p
          style={{
            fontSize: "24px",
            color: "#525252",
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Free online calculators for VAT, margins, markup, discounts, and break-even analysis.
        </p>
      </div>
    ),
    { ...size },
  );
}
