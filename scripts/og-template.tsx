import React from "react";
import type { OgRoute } from "./og-meta.ts";

const BG = "#020617";
const FONT_OUTFIT = "Outfit";
const FONT_PLAYFAIR = "Playfair Display";

const gradientText = (stops: [string, string, string]) => ({
  backgroundImage: `linear-gradient(90deg, ${stops[0]}, ${stops[1]}, ${stops[2]})`,
  backgroundClip: "text",
  color: "transparent",
});

export const OgCard = (route: OgRoute) => {
  const [g1, g2] = route.gradient;
  const [s1] = route.subGradient;

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        position: "relative",
        fontFamily: FONT_OUTFIT,
        overflow: "hidden",
      }}
    >
      {/* Ambient radial glows — mimic Hero's molecule-blob + molecular-glow */}
      <div
        style={{
          position: "absolute",
          top: "-180px",
          left: "-180px",
          width: "680px",
          height: "680px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${g1}33 0%, ${g1}00 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-220px",
          right: "-180px",
          width: "720px",
          height: "720px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${s1}2e 0%, ${s1}00 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "45%",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${g2}22 0%, ${g2}00 70%)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          padding: "0 80px",
        }}
      >
        {/* Kicker — Playfair italic, subtitle-gradient colored */}
        <div
          style={{
            fontFamily: FONT_PLAYFAIR,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: 44,
            marginBottom: 28,
            ...gradientText(route.subGradient),
          }}
        >
          {route.kicker}
        </div>

        {/* Title — Outfit extrabold, title gradient */}
        <div
          style={{
            fontFamily: FONT_OUTFIT,
            fontWeight: 700,
            fontSize: 188,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            marginBottom: 32,
            ...gradientText(route.gradient),
          }}
        >
          {route.title}
        </div>

        {/* Subtitle — uppercase, tracking-wide, subtitle gradient */}
        <div
          style={{
            fontFamily: FONT_OUTFIT,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: 980,
            ...gradientText(route.subGradient),
          }}
        >
          {route.subtitle}
        </div>
      </div>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 60px 44px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: FONT_OUTFIT,
            fontWeight: 600,
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#e4e4e7",
          }}
        >
          MolCrafts
        </div>
        <div
          style={{
            fontFamily: FONT_OUTFIT,
            fontWeight: 400,
            fontSize: 20,
            color: "#71717a",
          }}
        >
          molcrafts.org
        </div>
      </div>
    </div>
  );
};
