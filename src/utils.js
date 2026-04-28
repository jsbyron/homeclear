export const KW_RED = "#CC0000";

export function getColor(status) {
  if (status === "green") return "#16A34A";
  if (status === "yellow") return "#D97706";
  return "#DC2626";
}

export function getBg(status) {
  if (status === "green") return "#F0FDF4";
  if (status === "yellow") return "#FFFBEB";
  return "#FEF2F2";
}

export function getBorder(status) {
  if (status === "green") return "#86EFAC";
  if (status === "yellow") return "#FCD34D";
  return "#FCA5A5";
}

export const fmt = (n) =>
  Number(n).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  marginTop: "6px",
  border: "1px solid #D1D5DB",
  borderRadius: "6px",
  fontSize: "15px",
};

export const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
};

export const card = {
  backgroundColor: "#fff",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};
