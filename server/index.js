require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

const FALLBACK_RATE = 6.85;

app.get("/api/mortgage-rate", async (req, res) => {
  const apiKey = process.env.FRED_API_KEY;
  if (apiKey) {
    try {
      const url =
        `https://api.stlouisfed.org/fred/series/observations` +
        `?series_id=MORTGAGE30US&api_key=${apiKey}&limit=1&sort_order=desc&file_type=json`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const obs = data.observations?.[0];
        if (obs && obs.value !== "." && !isNaN(parseFloat(obs.value))) {
          return res.json({ rate: parseFloat(obs.value), source: "fred", asOf: obs.date });
        }
      }
    } catch (err) {
      console.error("FRED API error:", err.message);
    }
  }
  res.json({ rate: FALLBACK_RATE, source: "fallback" });
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPT = `You are a friendly, knowledgeable real estate advisor helping first-time homebuyers understand their financial readiness. When given a buyer's financial data and Homeclear assessment results, write a 3–4 sentence plain-English summary that: (1) states clearly whether they are ready, nearly ready, or need more preparation, (2) identifies their single biggest strength and single biggest challenge, and (3) gives one specific, actionable next step they can take this month. Write in a warm, encouraging but honest tone. Use conversational paragraph form — no bullet points, no headers, no markdown. Keep it under 120 words.`;

function fmt(n) {
  return Number(n).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

app.post("/api/summary", async (req, res) => {
  const { formData, results } = req.body;
  if (!formData || !results) {
    return res.status(400).json({ error: "Missing formData or results" });
  }

  const prompt = `Buyer profile:
- Gross monthly income: ${fmt(formData.grossIncome)}
- Current savings: ${fmt(formData.savings)}
- Monthly debt obligations: ${fmt(formData.monthlyDebts)}
- Target home price: ${fmt(formData.targetPrice)}

Homeclear assessment:
- Readiness score: ${results.readinessScore}/100 (${results.scoreStatus})
- DTI ratio: ${results.dti}% (${results.dtiStatus} — target is below 36%)
- Down payment saved: ${results.savedDpPct}% of purchase price (${results.dpStatus})
- True monthly housing cost: ${fmt(results.totalMonthly)}
- Months to FHA-eligible (3.5% down): ${results.monthsTo35 === 0 ? "Already eligible" : results.monthsTo35}
- Months to conventional (20% down): ${results.monthsTo20 === 0 ? "Already there" : results.monthsTo20}

Please write the personalized plain-English summary.`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    res.json({ summary });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Homeclear server running on http://localhost:${PORT}`);
});
