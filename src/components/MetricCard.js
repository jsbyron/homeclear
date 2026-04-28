import React from "react";
import { getColor, getBg, getBorder } from "../utils";

export default function MetricCard({ label, value, unit, status, detail, progress }) {
  return (
    <div
      style={{
        flex: "1 1 180px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: getBg(status),
        border: `2px solid ${getBorder(status)}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: "700",
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "38px",
          fontWeight: "800",
          color: getColor(status),
          lineHeight: 1,
        }}
      >
        {value}
        <span style={{ fontSize: "16px", fontWeight: "600" }}>{unit}</span>
      </div>
      {progress !== undefined && (
        <div className="hc-progress-track">
          <div
            className="hc-progress-fill"
            style={{
              width: `${Math.min(100, progress)}%`,
              backgroundColor: getColor(status),
            }}
          />
        </div>
      )}
      {detail && (
        <div style={{ fontSize: "12px", color: "#6B7280", marginTop: "10px" }}>
          {detail}
        </div>
      )}
    </div>
  );
}
