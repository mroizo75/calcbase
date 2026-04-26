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
          background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "#3B66D9",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            CB
          </div>
          <span style={{ fontSize: "52px", fontWeight: 800, color: "#1a1a2e" }}>
            CalcBase
          </span>
        </div>
        <p
          style={{
            fontSize: "26px",
            color: "#525252",
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
            marginBottom: "40px",
          }}
        >
          Free business calculators for VAT, margins, markup, ROI, sales tax, commissions, and break-even analysis.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["VAT", "Margin", "Markup", "ROI", "Sales Tax", "Discount", "Commission", "Break-even"].map((label) => (
            <span
              key={label}
              style={{
                background: "#f0f4ff",
                color: "#3B66D9",
                padding: "8px 18px",
                borderRadius: "20px",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
