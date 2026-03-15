import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: "#193c72",
          color: "#ffffff",
          fontSize: 16,
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
