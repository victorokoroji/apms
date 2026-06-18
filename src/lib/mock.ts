export interface Team {
  id: string;
  name: string;
  leader: string;
  members: number;
  revenue: number;
  amountLoaded: number;
  ordersReceived: number;
  ordersConfirmed: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "CEO" | "Team Leader" | "Call Representative";
  team: string;
  teamId: string;
  status: "Active" | "Inactive" | "Pending";
  lastActivity: string;
  revenue: number;
  ordersReceived: number;
  ordersConfirmed: number;
}

export const teams: Team[] = [
  { id: "t-1", name: "Eagles", leader: "Tunde Bello", members: 8, revenue: 12_450_000, amountLoaded: 4_200_000, ordersReceived: 1320, ordersConfirmed: 1042 },
  { id: "t-2", name: "Lions", leader: "Funmi Adekunle", members: 7, revenue: 10_980_000, amountLoaded: 3_900_000, ordersReceived: 1180, ordersConfirmed: 902 },
  { id: "t-3", name: "Falcons", leader: "Ibrahim Musa", members: 6, revenue: 8_720_000, amountLoaded: 3_100_000, ordersReceived: 960, ordersConfirmed: 712 },
  { id: "t-4", name: "Panthers", leader: "Grace Olawale", members: 9, revenue: 14_300_000, amountLoaded: 4_800_000, ordersReceived: 1510, ordersConfirmed: 1198 },
  { id: "t-5", name: "Sharks", leader: "Kelechi Nwosu", members: 5, revenue: 7_140_000, amountLoaded: 2_400_000, ordersReceived: 820, ordersConfirmed: 588 },
];

const firstNames = ["Chioma","Emeka","Aisha","Bola","Ngozi","Tobi","Yusuf","Halima","Kunle","Zainab","Ifeanyi","Folake","David","Sade","Ahmed","Blessing","Peter","Amaka","John","Ruth"];
const lastNames = ["Eze","Okoro","Mohammed","Adewale","Obi","Bello","Ibrahim","Yusuf","Nwosu","Adeyemi","Olawale","Bakare","Onyeka","Garba","Okafor","Lawal"];

export const employees: Employee[] = Array.from({ length: 28 }).map((_, i) => {
  const team = teams[i % teams.length];
  const ordersReceived = 90 + Math.floor(Math.random() * 180);
  const ordersConfirmed = Math.floor(ordersReceived * (0.55 + Math.random() * 0.35));
  const revenue = ordersConfirmed * (8000 + Math.floor(Math.random() * 6000));
  const fn = firstNames[i % firstNames.length];
  const ln = lastNames[(i * 3) % lastNames.length];
  return {
    id: `e-${i + 1}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@admordglobal.com`,
    role: i === 0 ? "CEO" : i % 6 === 0 ? "Team Leader" : "Call Representative",
    team: team.name,
    teamId: team.id,
    status: i % 11 === 0 ? "Pending" : i % 9 === 0 ? "Inactive" : "Active",
    lastActivity: ["2 min ago","12 min ago","1 h ago","3 h ago","Yesterday","2 days ago"][i % 6],
    revenue,
    ordersReceived,
    ordersConfirmed,
  };
});

// time-series for charts (last 30 days)
export const revenueTrend = Array.from({ length: 30 }).map((_, i) => {
  const day = i + 1;
  const base = 1_400_000 + Math.sin(i / 3) * 280_000 + i * 22_000;
  const noise = (Math.random() - 0.5) * 180_000;
  return {
    date: `D${day}`,
    revenue: Math.round(base + noise),
    loaded: Math.round((base + noise) * 0.34),
    orders: Math.round(120 + Math.sin(i / 4) * 25 + Math.random() * 18),
  };
});

export const confirmTrend = Array.from({ length: 12 }).map((_, i) => ({
  week: `W${i + 1}`,
  rate: Math.round((68 + Math.sin(i / 2) * 6 + Math.random() * 4) * 10) / 10,
}));

export const notifications = [
  { id: "n1", type: "success", title: "Report submitted", body: "Your daily report for today was submitted successfully.", time: "2 min ago", read: false },
  { id: "n2", type: "info", title: "Weekly summary available", body: "Your Week 24 performance summary is ready to view.", time: "1 h ago", read: false },
  { id: "n3", type: "warning", title: "Missing daily report", body: "Reminder: 3 reps on Eagles haven't submitted today's report.", time: "3 h ago", read: false },
  { id: "n4", type: "info", title: "Monthly summary available", body: "May performance summary is ready.", time: "Yesterday", read: true },
  { id: "n5", type: "success", title: "New team record", body: "Panthers set a new monthly confirmation record at 81.4%.", time: "2 days ago", read: true },
] as const;

export const dailyReports = Array.from({ length: 24 }).map((_, i) => {
  const r = 40 + Math.floor(Math.random() * 120);
  const c = Math.floor(r * (0.55 + Math.random() * 0.3));
  const rev = c * (8000 + Math.floor(Math.random() * 6000));
  return {
    id: `r-${i + 1}`,
    date: `2026-06-${String(18 - (i % 18)).padStart(2, "0")}`,
    employee: employees[i % employees.length].name,
    team: employees[i % employees.length].team,
    received: r,
    confirmed: c,
    revenue: rev,
    loaded: Math.round(rev * 0.32),
    status: i % 7 === 0 ? "Draft" : "Submitted",
  };
});
