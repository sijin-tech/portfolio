import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — Full Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the link is shared on LinkedIn, WhatsApp, X, etc.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(circle at 75% 30%, #3b1f6e 0%, #0b2a3a 35%, #050505 70%)",
          color: "#f5f5f7",
        }}
      >
        <div style={{ fontSize: 28, color: "#a3a3a3", display: "flex" }}>{`Full-stack engineer · ${profile.availability}`}</div>
        <div style={{ fontSize: 150, fontWeight: 800, letterSpacing: -6, lineHeight: 1, marginTop: 20, display: "flex" }}>{`${profile.name}.`}</div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            marginTop: 24,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, #a78bfa, #22d3ee 45%, #f472b6)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Full stack. Fully shipped.
        </div>
        <div style={{ fontSize: 28, color: "#a3a3a3", marginTop: 40, display: "flex" }}>
          React · Next.js · Node · NestJS · AWS · RAG
        </div>
      </div>
    ),
    size,
  );
}
