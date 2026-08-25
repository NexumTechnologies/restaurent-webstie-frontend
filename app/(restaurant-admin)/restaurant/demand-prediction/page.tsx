"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, Calendar, Sparkles, TrendingUp, Zap } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";

const data = [
  { day: "18 May", predicted: 950 },
  { day: "19 May", predicted: 1050 },
  { day: "20 May", predicted: 1110 },
  { day: "21 May", predicted: 1245 },
  { day: "22 May", predicted: 1180 },
  { day: "23 May", predicted: 1090 },
  { day: "24 May", predicted: 1160 },
];

const predictedItems = [
  { name: "Chicken Burger", predicted: 232, change: "+15.4%", positive: true },
  { name: "Chicken Pizza", predicted: 198, change: "+10.2%", positive: true },
  { name: "French Fries", predicted: 156, change: "+8.7%", positive: true },
  { name: "Chicken Biryani", predicted: 132, change: "+7.1%", positive: true },
  { name: "Coke (500ml)", predicted: 98, change: "-2.3%", positive: false },
];

export default function DemandPredictionPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Demand Prediction</h1>
          <p className="mt-1 text-sm text-slate-500">Forecast tomorrow&apos;s demand so you can prep inventory before the rush hits.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          <BarChart3 className="h-4 w-4" />
          Generate Prediction
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Predicted Orders (Today)" value="1,245" trend={{ value: "+12.6%", isPositive: true, label: "from yesterday" }} icon={TrendingUp} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Predicted Revenue" value="PKR 248,600" trend={{ value: "+9.8%", isPositive: true, label: "from yesterday" }} icon={Sparkles} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
        <StatCard title="Top Item (Predicted)" value="Chicken Burger" trend={{ value: "232 orders", isPositive: true, label: "" }} icon={Calendar} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
        <StatCard title="Forecast Confidence" value="87%" trend={{ value: "Good accuracy", isPositive: true, label: "" }} icon={Zap} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">Predicted Orders Trend</h2>
            <div className="mt-4 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#047857" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                  <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 40px -12px rgb(15 23 42 / 0.25)" }} />
                  <Area type="monotone" dataKey="predicted" stroke="#047857" fill="url(#predictionGradient)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Top Menu Items</h2>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Sparkles className="h-3.5 w-3.5" />
                Forecasted
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-4 py-3 font-medium">Menu Item</th>
                    <th className="px-4 py-3 font-medium text-right">Predicted</th>
                    <th className="px-4 py-3 font-medium text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {predictedItems.map((item) => (
                    <tr key={item.name}>
                      <td className="px-4 py-4 font-medium text-slate-900">{item.name}</td>
                      <td className="px-4 py-4 text-right text-slate-600">{item.predicted}</td>
                      <td className={`px-4 py-4 text-right font-semibold ${item.positive ? "text-emerald-700" : "text-rose-600"}`}>{item.change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-slate-600">
        Prediction is based on historical orders, seasonality, and current order velocity. Use it as a planning guide, not a guarantee.
      </div>
    </div>
  );
}
