"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "18 May", predicted: 950 },
  { name: "19 May", predicted: 1050 },
  { name: "20 May", predicted: 1110 },
  { name: "21 May", predicted: 1245 },
  { name: "22 May", predicted: 1180 },
  { name: "23 May", predicted: 1090 },
  { name: "24 May", predicted: 1160 },
];

export function PredictionChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
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
            domain={[0, 1400]}
            ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400]}
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
          />
          <Area
            type="linear"
            dataKey="predicted"
            stroke="#22c55e"
            fillOpacity={1}
            fill="url(#colorPredicted)"
            strokeWidth={2}
            activeDot={{ r: 6, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
