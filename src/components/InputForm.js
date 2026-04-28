import React, { useState } from "react";
import { KW_RED, inputStyle, labelStyle, card } from "../utils";

function FormattedInput({ name, value, onChange, placeholder, required }) {
  const [display, setDisplay] = useState(() => {
    if (!value) return "";
    const num = parseFloat(value);
    return isNaN(num) ? "" : num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });

  function handleChange(e) {
    // Strip everything except digits and one decimal point
    let raw = e.target.value.replace(/[^0-9.]/g, "");
    const parts = raw.split(".");
    if (parts.length > 2) raw = parts[0] + "." + parts.slice(1).join("");
    // Cap at 2 decimal places while typing
    if (parts.length === 2 && parts[1].length > 2) {
      raw = parts[0] + "." + parts[1].slice(0, 2);
    }
    setDisplay(raw);
    onChange({ target: { name, value: raw } });
  }

  function handleFocus() {
    // Strip commas so the user can edit the raw digits
    setDisplay((prev) => prev.replace(/,/g, ""));
  }

  function handleBlur() {
    if (!display || display === ".") {
      setDisplay("");
      onChange({ target: { name, value: "" } });
      return;
    }
    const num = parseFloat(display);
    if (!isNaN(num)) {
      setDisplay(
        num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      );
      onChange({ target: { name, value: String(num) } });
    }
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      name={name}
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      style={inputStyle}
      className="hc-input"
      required={required}
    />
  );
}

export default function InputForm({ formData, onChange, onSubmit }) {
  return (
    <div className="hc-form-card" style={card}>
      <h2 style={{ margin: "0 0 6px", fontSize: "18px", color: "#111827", fontWeight: "700" }}>
        Your Financial Information
      </h2>
      <p style={{ margin: "0 0 24px", fontSize: "13px", color: "#6B7280" }}>
        Enter your numbers below to get a full readiness assessment.
      </p>

      <form onSubmit={onSubmit}>
        <div className="hc-input-grid">
          <div>
            <label style={labelStyle}>Gross Monthly Income ($)</label>
            <FormattedInput
              name="grossIncome"
              value={formData.grossIncome}
              onChange={onChange}
              placeholder="e.g. 5,000.00"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Current Savings / Assets ($)</label>
            <FormattedInput
              name="savings"
              value={formData.savings}
              onChange={onChange}
              placeholder="e.g. 20,000.00"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Total Monthly Debt Obligations ($)</label>
            <FormattedInput
              name="monthlyDebts"
              value={formData.monthlyDebts}
              onChange={onChange}
              placeholder="e.g. 500.00"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Target Home Purchase Price ($)</label>
            <FormattedInput
              name="targetPrice"
              value={formData.targetPrice}
              onChange={onChange}
              placeholder="e.g. 300,000.00"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="hc-btn"
          style={{
            marginTop: "24px",
            backgroundColor: KW_RED,
            color: "white",
            padding: "12px 36px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "700",
            letterSpacing: "0.3px",
          }}
        >
          Check My Readiness →
        </button>
      </form>
    </div>
  );
}
