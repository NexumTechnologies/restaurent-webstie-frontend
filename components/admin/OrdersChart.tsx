"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Mon", thisWeek: 180, lastWeek: 140 },
  { name: "Tue", thisWeek: 220, lastWeek: 160 },
  { name: "Wed", thisWeek: 180, lastWeek: 120 },
  { name: "Thu", thisWeek: 350, lastWeek: 220 },
  { name: "Fri", thisWeek: 220, lastWeek: 160 },
  { name: "Sat", thisWeek: 330, lastWeek: 230 },
  { name: "Sun", thisWeek: 180, lastWeek: 120 },
  { name: "Mon", thisWeek: 240, lastWeek: 140 }, // Just to match the curve in image
];

export function OrdersChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Area
            type="monotone"
            dataKey="lastWeek"
            stroke="#d1d5db"
            strokeDasharray="5 5"
            fill="none"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="thisWeek"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorThisWeek)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
