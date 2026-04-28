import React from "react";
import { KW_RED } from "../utils";

export default function Header() {
  return (
    <div style={{ borderBottom: `4px solid ${KW_RED}`, paddingBottom: "18px", marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            backgroundColor: KW_RED,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "900",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          H
        </div>
        <div>
          <h1 style={{ margin: 0, color: KW_RED, fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px" }}>
            Homeclear
          </h1>
          <p style={{ margin: 0, color: "#6B7280", fontSize: "14px" }}>
            First-Time Homebuyer Readiness Portal
          </p>
        </div>
      </div>
    </div>
  );
}
