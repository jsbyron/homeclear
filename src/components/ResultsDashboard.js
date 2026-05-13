import React, { useState } from "react";
import MetricCard from "./MetricCard";
import CostRow from "./CostRow";
import TimelineCard from "./TimelineCard";
import { fmt, KW_RED, card } from "../utils";

function formatRateDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ResultsDashboard({ results, aiSummary, aiLoading, aiError, rateInfo }) {
  const [includeHoa, setIncludeHoa] = useState(true);

  const displayTotal = includeHoa
    ? results.totalMonthly
    : (parseFloat(results.totalMonthly) - parseFloat(results.hoa)).toFixed(0);

  const rateLabel = `${results.annualRate != null ? (results.annualRate * 100).toFixed(2) : "N/A"}%`;
  const rateNote =
    rateInfo?.source === "fred" && rateInfo.asOf
      ? `${rateLabel} 30-yr fixed (live · FRED, as of ${formatRateDate(rateInfo.asOf)})`
      : `${rateLabel} 30-yr fixed (estimated — live rate unavailable)`;

  return (
    <div id="results-section" style={{ marginTop: "44px" }}>
      <h2
        style={{
          fontSize: "20px",
          color: "#111827",
          fontWeight: "700",
          paddingBottom: "12px",
          borderBottom: `3px solid ${KW_RED}`,
          marginBottom: "24px",
        }}
      >
        Your Readiness Results
      </h2>

      {/* Three metric cards */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "16px" }}>
        <MetricCard
          label="Readiness Score"
          value={results.readinessScore}
          unit=" / 100"
          status={results.scoreStatus}
          progress={results.readinessScore}
          detail={
            results.scoreStatus === "green"
              ? "Strong position — great shape!"
              : results.scoreStatus === "yellow"
              ? "Making progress — keep saving"
              : "Needs improvement — see timeline below"
          }
        />
        <MetricCard
          label="DTI Ratio"
          value={results.dti}
          unit="%"
          status={results.dtiStatus}
          detail="(debts + mortgage) ÷ income · target < 36%"
        />
        <MetricCard
          label="Down Payment Saved"
          value={results.savedDpPct}
          unit="%"
          status={results.dpStatus}
          detail={
            results.dpStatus === "green"
              ? "20%+ saved — no PMI needed"
              : results.dpStatus === "yellow"
              ? `FHA-eligible · ${fmt(results.gap20)} short of 20%`
              : `Need ${fmt(results.gap35)} more for FHA (3.5%)`
          }
        />
      </div>

      {/* DTI plain-English explanation */}
      <div
        style={{
          ...card,
          padding: "14px 18px",
          marginBottom: "24px",
          backgroundColor: "#F9FAFB",
          borderLeft: `3px solid #D1D5DB`,
        }}
      >
        <p style={{ margin: 0, fontSize: "13px", color: "#374151", lineHeight: "1.65" }}>
          <strong>What is DTI?</strong> Your Debt-to-Income ratio compares your total monthly debt payments — including your estimated mortgage — to your gross monthly income. Lenders use it to measure how much of your paycheck is already committed to debt. A DTI below 36% signals financial breathing room; most conventional lenders cap approval at 43–45%. The lower your DTI, the less risk a lender sees, which can mean easier approval and better interest rates.
        </p>
      </div>

      {/* AI Summary */}
      <div
        style={{
          ...card,
          backgroundColor: aiError ? "#FEF2F2" : "#FFF8F8",
          border: `1px solid ${aiError ? "#FCA5A5" : aiLoading ? "#E5E7EB" : "#FECACA"}`,
          borderLeft: `4px solid ${aiError ? "#DC2626" : aiLoading ? "#D1D5DB" : KW_RED}`,
          padding: "22px 26px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: aiLoading ? "#D1D5DB" : aiError ? "#FCA5A5" : KW_RED,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            ✦
          </div>
          <h3 style={{ margin: 0, fontSize: "16px", color: "#111827", fontWeight: "700" }}>
            AI Advisor Summary
          </h3>
        </div>

        {aiLoading && (
          <p className="hc-loading" style={{ margin: 0, color: "#9CA3AF", fontSize: "14px", fontStyle: "italic" }}>
            Generating your personalized summary...
          </p>
        )}
        {aiSummary && (
          <p style={{ margin: 0, color: "#374151", fontSize: "15px", lineHeight: "1.75" }}>
            {aiSummary}
          </p>
        )}
        {aiError && (
          <p style={{ margin: 0, color: "#DC2626", fontSize: "13px" }}>{aiError}</p>
        )}
      </div>

      {/* Monthly cost breakdown */}
      <div style={{ ...card, padding: "24px 28px", marginBottom: "24px" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "17px", color: "#111827", fontWeight: "700" }}>
          True Monthly Cost Breakdown
        </h3>
        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#9CA3AF" }}>
          Based on {results.dpPct}% down ({fmt(results.actualDP)}), {rateNote}, 30-year loan
        </p>
        <p style={{ margin: "0 0 16px", fontSize: "11px", color: "#B0B8C5", fontStyle: "italic" }}>
          Estimates are based on general assumptions and will vary by location and property type.
        </p>

        <CostRow label="Principal & Interest" amount={results.mortgage} />
        <CostRow label="Property Taxes" sub="est. 1.2% annually" amount={results.taxes} />
        <CostRow label="Homeowner's Insurance" sub="est. 0.5% annually" amount={results.insurance} />
        {parseFloat(results.pmi) > 0 && (
          <CostRow label="PMI" sub="est. 0.8% · drops at 20% equity" amount={results.pmi} />
        )}

        {/* HOA toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 0",
            borderBottom: "1px solid #F3F4F6",
            marginBottom: "2px",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "13px", color: "#6B7280", userSelect: "none" }}>
            <input
              type="checkbox"
              checked={includeHoa}
              onChange={(e) => setIncludeHoa(e.target.checked)}
              style={{ accentColor: KW_RED, width: "14px", height: "14px", cursor: "pointer" }}
            />
            My target property has an HOA
          </label>
        </div>
        {includeHoa && (
          <CostRow label="HOA Fees" sub="estimated" amount={results.hoa} />
        )}

        <CostRow label="Maintenance Reserve" sub="est. 1% annually" amount={results.maintenance} />
        <CostRow label="Total Monthly Housing Cost" amount={displayTotal} isTotal />
      </div>

      {/* Savings timeline */}
      <div style={{ ...card, padding: "24px 28px" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: "17px", color: "#111827", fontWeight: "700" }}>
          Savings Timeline
        </h3>
        <p style={{ margin: "0 0 18px", fontSize: "12px", color: "#9CA3AF" }}>
          Estimated at {fmt(results.monthlySavings)}/month saved (15% of gross income)
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <TimelineCard
            title="FHA Loan — 3.5% Down"
            months={results.monthsTo35}
            gap={results.gap35Num}
            color="#D97706"
            bg="#FFFBEB"
            border="#FCD34D"
          />
          <TimelineCard
            title="Conventional — 20% Down"
            months={results.monthsTo20}
            gap={results.gap20Num}
            color="#2563EB"
            bg="#EFF6FF"
            border="#BFDBFE"
          />
        </div>
      </div>
    </div>
  );
}
