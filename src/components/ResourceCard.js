import React from "react";

const typeStyle = {
  Guide: { bg: "#EFF6FF", color: "#1D4ED8" },
  Tool: { bg: "#F0FDF4", color: "#15803D" },
};

export default function ResourceCard({ resource }) {
  const colors = typeStyle[resource.type] || typeStyle.Guide;

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="hc-resource-link"
      style={{ flex: "1 1 220px" }}
    >
      <div
        className="hc-resource-inner"
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          padding: "16px 18px",
          backgroundColor: "#fff",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          height: "100%",
        }}
      >
        <span
          style={{
            display: "inline-block",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            padding: "2px 8px",
            borderRadius: "10px",
            backgroundColor: colors.bg,
            color: colors.color,
            marginBottom: "8px",
          }}
        >
          {resource.type}
        </span>
        <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "5px" }}>
          {resource.title}
        </div>
        <div style={{ fontSize: "12px", color: "#6B7280", lineHeight: "1.5" }}>
          {resource.description}
        </div>
      </div>
    </a>
  );
}
