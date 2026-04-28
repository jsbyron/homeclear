import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import ResultsDashboard from "./components/ResultsDashboard";
import AssistancePrograms from "./components/AssistancePrograms";
import ResourcesSection from "./components/ResourcesSection";
import { calculate } from "./calculator";

export default function App() {
  const [formData, setFormData] = useState({
    grossIncome: "",
    savings: "",
    monthlyDebts: "",
    targetPrice: "",
  });
  const [results, setResults] = useState(null);
  const [aiSummary, setAiSummary] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const calcResults = calculate(formData);
    setResults(calcResults);
    setAiSummary(null);
    setAiError(null);
    setAiLoading(true);

    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    try {
      const res = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, results: calcResults }),
      });
      if (!res.ok) throw new Error("server error");
      const data = await res.json();
      setAiSummary(data.summary);
    } catch {
      setAiError("AI summary unavailable — make sure the server is running with a valid API key.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="hc-page" style={{ maxWidth: "820px", margin: "0 auto" }}>
      <Header />
      <InputForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
      {results && (
        <ResultsDashboard
          results={results}
          aiSummary={aiSummary}
          aiLoading={aiLoading}
          aiError={aiError}
        />
      )}
      <AssistancePrograms results={results} />
      <ResourcesSection />
      <div
        style={{
          marginTop: "52px",
          paddingTop: "20px",
          borderTop: "1px solid #E5E7EB",
          textAlign: "center",
          fontSize: "12px",
          color: "#9CA3AF",
        }}
      >
        Homeclear · Estimates are for educational purposes only and do not constitute financial or legal advice.
      </div>
    </div>
  );
}
