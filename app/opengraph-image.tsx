import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #fff8f2 0%, #f6f9ff 55%, #eef4ff 100%)",
          color: "#193d74",
          fontFamily: "Arial, sans-serif",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "2px solid rgba(26, 61, 116, 0.12)",
            borderRadius: "40px",
            background: "rgba(255,255,255,0.82)",
            padding: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "24px",
                background: "#1f4a84",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: 800,
              }}
            >
              PM
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ fontSize: "28px", fontWeight: 800 }}>Ponts Malins</div>
              <div style={{ fontSize: "22px", opacity: 0.84 }}>
                Simulateur de ponts et congés en France
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                fontSize: "74px",
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                maxWidth: "900px",
              }}
            >
              Optimisez vos congés 2026 et trouvez les meilleurs ponts
            </div>
            <div
              style={{
                fontSize: "30px",
                lineHeight: 1.3,
                color: "rgba(25, 61, 116, 0.78)",
                maxWidth: "820px",
              }}
            >
              Jours fériés, vacances scolaires, plan annuel et exports calendrier.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "24px",
              color: "rgba(25, 61, 116, 0.78)",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "12px 18px",
                borderRadius: "999px",
                background: "#ff7c57",
                color: "white",
                fontWeight: 700,
              }}
            >
              pontsmalins.com
            </div>
            <div>Bridge ideas, leave planning, school zones</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
