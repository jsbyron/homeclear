import React from "react";
import ProgramCard from "./ProgramCard";
import SectionHeader from "./SectionHeader";
import { PROGRAMS } from "../data";
import { KW_RED } from "../utils";

export default function AssistancePrograms({ results }) {
  return (
    <div>
      <SectionHeader title="Assistance Programs" />
      <p style={{ margin: "-12px 0 12px", fontSize: "13px", color: "#6B7280" }}>
        First-time buyers often qualify for programs that dramatically reduce upfront costs.
        {results && results.scoreStatus !== "green" && (
          <span style={{ color: KW_RED, fontWeight: "600" }}>
            {" "}Based on your numbers, one or more programs below may help you close the gap.
          </span>
        )}
      </p>
      <p style={{ margin: "0 0 20px", fontSize: "12px", color: "#9CA3AF", fontStyle: "italic" }}>
        Eligibility rules vary by program and location. Speak with a{" "}
        <strong style={{ color: "#6B7280", fontStyle: "normal" }}>HUD-approved housing counselor</strong>{" "}
        to determine which program best fits your specific situation — counseling is free or low-cost and can be found at hud.gov.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {PROGRAMS.map((p) => {
          const highlighted =
            results &&
            ((p.id === "fha" && results.dpStatus === "yellow") ||
              (p.id === "state" && results.readinessScore < 80));
          return <ProgramCard key={p.id} program={p} highlighted={!!highlighted} />;
        })}
      </div>
    </div>
  );
}
