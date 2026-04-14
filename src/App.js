import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    grossIncome: "",
    savings: "",
    monthlyDebts: "",
    targetPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! Calculator coming soon.");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial" }}>
      <h1 style={{ color: "#CC0000" }}>Homeclear</h1>
      <h2>First-Time Homebuyer Readiness Assessment</h2>
      <p>Enter your financial information below to find out how ready you are to buy a home.</p>

      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Gross Monthly Income ($)</strong></label>
          <br />
          <input
            type="number"
            name="grossIncome"
            value={formData.grossIncome}
            onChange={handleChange}
            placeholder="e.g. 5000"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Current Savings / Assets ($)</strong></label>
          <br />
          <input
            type="number"
            name="savings"
            value={formData.savings}
            onChange={handleChange}
            placeholder="e.g. 20000"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Total Monthly Debt Obligations ($)</strong></label>
          <br />
          <input
            type="number"
            name="monthlyDebts"
            value={formData.monthlyDebts}
            onChange={handleChange}
            placeholder="e.g. 500"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label><strong>Target Home Purchase Price ($)</strong></label>
          <br />
          <input
            type="number"
            name="targetPrice"
            value={formData.targetPrice}
            onChange={handleChange}
            placeholder="e.g. 300000"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#CC0000",
            color: "white",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Check My Readiness
        </button>

      </form>
    </div>
  );
}

export default App;