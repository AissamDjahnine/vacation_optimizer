import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "#193c72",
          color: "#ffffff",
          fontSize: 78,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        PM
      </div>
    ),
    size,
  );
}
