const LOAN_TERM = 360;

function calcMortgage(loanAmount, rateMonthly) {
  return (
    (loanAmount * (rateMonthly * Math.pow(1 + rateMonthly, LOAN_TERM))) /
    (Math.pow(1 + rateMonthly, LOAN_TERM) - 1)
  );
}

export function calculate({ grossIncome, savings, monthlyDebts, targetPrice, annualRate = 0.07 }) {
  const income = parseFloat(grossIncome);
  const saved = parseFloat(savings);
  const debts = parseFloat(monthlyDebts);
  const price = parseFloat(targetPrice);
  const rateMonthly = annualRate / 12;

  const dp20 = price * 0.2;
  const dp35 = price * 0.035;

  const actualDP = Math.min(saved, dp20);
  const loanAmount = price - actualDP;
  const dpPct = (actualDP / price) * 100;

  const mortgage = calcMortgage(loanAmount, rateMonthly);
  const taxes = (price * 0.012) / 12;
  const insurance = (price * 0.005) / 12;
  const pmi = dpPct < 20 ? (loanAmount * 0.008) / 12 : 0;
  const hoa = 150;
  const maintenance = (price * 0.01) / 12;
  const totalMonthly = mortgage + taxes + insurance + pmi + hoa + maintenance;

  const dti = ((debts + mortgage) / income) * 100;
  const dtiStatus = dti < 36 ? "green" : dti <= 43 ? "yellow" : "red";

  const savedDpPct = (saved / price) * 100;
  const dpStatus = saved >= dp20 ? "green" : saved >= dp35 ? "yellow" : "red";
  const gap20 = Math.max(0, dp20 - saved);
  const gap35 = Math.max(0, dp35 - saved);

  const dtiScore = Math.max(0, 50 * (1 - Math.max(0, (dti - 28) / 22)));
  const dpScore = Math.min(50, 50 * (saved / dp20));
  const readinessScore = Math.round(dtiScore + dpScore);
  const scoreStatus = readinessScore >= 70 ? "green" : readinessScore >= 45 ? "yellow" : "red";

  const monthlySavings = income * 0.15;
  const monthsTo35 = gap35 <= 0 ? 0 : Math.ceil(gap35 / monthlySavings);
  const monthsTo20 = gap20 <= 0 ? 0 : Math.ceil(gap20 / monthlySavings);

  return {
    dti: dti.toFixed(1),
    dtiStatus,
    savedDpPct: savedDpPct.toFixed(1),
    dpStatus,
    gap20: gap20.toFixed(0),
    gap35: gap35.toFixed(0),
    readinessScore,
    scoreStatus,
    mortgage: mortgage.toFixed(0),
    taxes: taxes.toFixed(0),
    insurance: insurance.toFixed(0),
    pmi: pmi.toFixed(0),
    hoa: hoa.toFixed(0),
    maintenance: maintenance.toFixed(0),
    totalMonthly: totalMonthly.toFixed(0),
    dpPct: dpPct.toFixed(1),
    actualDP: actualDP.toFixed(0),
    monthsTo35,
    monthsTo20,
    monthlySavings: monthlySavings.toFixed(0),
    gap20Num: gap20,
    gap35Num: gap35,
    annualRate,
  };
}
