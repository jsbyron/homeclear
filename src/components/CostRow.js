import React from "react";
import { fmt, KW_RED } from "../utils";

export default function CostRow({ label, amount, sub, isTotal }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 0",
        borderBottom: isTotal ? "none" : "1px solid #F3F4F6",
        borderTop: isTotal ? "2px solid #E5E7EB" : "none",
        marginTop: isTotal ? "4px" : "0",
        fontWeight: isTotal ? "700" : "400",
        fontSize: isTotal ? "15px" : "14px",
      }}
    >
      <div>
        <span style={{ color: isTotal ? KW_RED : "#374151" }}>{label}</span>
        {sub && (
          <span style={{ fontSize: "11px", color: "#9CA3AF", marginLeft: "6px" }}>
            {sub}
          </span>
        )}
      </div>
      <span style={{ color: isTotal ? KW_RED : "#111827", fontWeight: isTotal ? "700" : "500" }}>
        {fmt(amount)}/mo
      </span>
    </div>
  );
}
