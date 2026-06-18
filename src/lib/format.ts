export const fmtNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtNairaCompact = (n: number) => {
  if (Math.abs(n) >= 1_000_000_000) return `₦${(n / 1_000_000_000).toFixed(2)}B`;
  if (Math.abs(n) >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `₦${(n / 1_000).toFixed(1)}K`;
  return `₦${n.toFixed(0)}`;
};

export const fmtNum = (n: number) => new Intl.NumberFormat("en-US").format(n);

export const fmtPct = (n: number, digits = 1) => `${n.toFixed(digits)}%`;

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
