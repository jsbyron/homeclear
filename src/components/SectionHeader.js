import React from "react";
import { KW_RED } from "../utils";

export default function SectionHeader({ title }) {
  return (
    <h2
      style={{
        fontSize: "20px",
        color: "#111827",
        fontWeight: "700",
        paddingBottom: "12px",
        borderBottom: `3px solid ${KW_RED}`,
        marginBottom: "24px",
        marginTop: "52px",
      }}
    >
      {title}
    </h2>
  );
}
