import React from "react";
import { fmt } from "../utils";

export default function TimelineCard({ title, months, gap, color, bg, border }) {
  const years = Math.ceil(months / 12);
  return (
    <div
      style={{
        flex: "1 1 200px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: bg,
        border: `1px solid ${border}`,
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: "700",
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      {months === 0 ? (
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#16A34A" }}>
          Ready Now!
        </div>
      ) : (
        <>
          <div style={{ fontSize: "34px", fontWeight: "800", color }}>
            {months}
            <span style={{ fontSize: "16px", fontWeight: "600" }}> mo</span>
          </div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "4px" }}>
            ~{years} year{years !== 1 ? "s" : ""} · need {fmt(gap)} more
          </div>
        </>
      )}
    </div>
  );
}
