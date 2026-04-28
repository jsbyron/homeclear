import React from "react";
import { KW_RED } from "../utils";

export default function ProgramCard({ program, highlighted }) {
  return (
    <div
      style={{
        flex: "1 1 260px",
        border: `1px solid ${highlighted ? KW_RED : "#E5E7EB"}`,
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: highlighted
          ? "0 0 0 2px rgba(204,0,0,0.15)"
          : "0 1px 3px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {highlighted && (
        <div
          style={{
            position: "absolute",
            top: "-11px",
            right: "14px",
            backgroundColor: KW_RED,
            color: "white",
            fontSize: "10px",
            fontWeight: "700",
            padding: "3px 10px",
            borderRadius: "10px",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
          }}
        >
          May apply to you
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#111827" }}>
          {program.name}
        </h4>
        <span
          style={{
            fontSize: "11px",
            fontWeight: "700",
            padding: "3px 10px",
            borderRadius: "20px",
            backgroundColor: program.badgeBg,
            color: program.badgeColor,
            whiteSpace: "nowrap",
            marginLeft: "10px",
            flexShrink: 0,
          }}
        >
          {program.badge}
        </span>
      </div>
      <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6B7280", lineHeight: "1.55" }}>
        {program.description}
      </p>
      <ul style={{ margin: "0 0 14px", paddingLeft: "18px" }}>
        {program.eligibility.map((item, i) => (
          <li key={i} style={{ fontSize: "12px", color: "#374151", marginBottom: "5px" }}>
            {item}
          </li>
        ))}
      </ul>
      <a
        href={program.link}
        target="_blank"
        rel="noopener noreferrer"
        className="hc-program-link"
      >
        {program.linkLabel} →
      </a>
    </div>
  );
}
