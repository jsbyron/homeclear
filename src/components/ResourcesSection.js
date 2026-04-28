import React from "react";
import ResourceCard from "./ResourceCard";
import SectionHeader from "./SectionHeader";
import { RESOURCES } from "../data";

export default function ResourcesSection() {
  return (
    <div>
      <SectionHeader title="First-Time Buyer Resources" />
      <p style={{ margin: "-12px 0 20px", fontSize: "13px", color: "#6B7280" }}>
        Guides and tools from trusted government and industry sources to help you through every step.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {RESOURCES.map((r) => (
          <ResourceCard key={r.title} resource={r} />
        ))}
      </div>
    </div>
  );
}
