"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download, Calendar, Sparkles, TrendingUp, Wallet, ShoppingBag } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 62000 },
  { month: "May", revenue: 78000 },
  { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 85000 },
  { month: "Aug", revenue: 92000 },
];

const statusData = [
  { name: "Delivered", value: 84, color: "#0f766e" },
  { name: "On The Way", value: 18, color: "#2563eb" },
  { name: "Preparing", value: 16, color: "#f59e0b" },
  { name: "Cancelled", value: 10, color: "#ef4444" },
];

const topItems = [
  { name: "Zinger Burger", quantity: 48, revenue: "PKR 28,560" },
  { name: "French Fries", quantity: 42, revenue: "PKR 8,358" },
  { name: "Pizza (Regular)", quantity: 36, revenue: "PKR 10,800" },
  { name: "Chicken Wings", quantity: 30, revenue: "PKR 8,970" },
  { name: "Coca Cola", quantity: 28, revenue: "PKR 3,080" },
];

const paymentData = [
  { name: "Cash on Delivery", value: 65 },
  { name: "JazzCash", value: 20 },
  { name: "Easypaisa", value: 10 },
  { name: "Card / Other", value: 5 },
];

export default function RestaurantReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">Review performance trends, top sellers, and payment breakdowns.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>14 May 2024 - 21 May 2024</span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value="PKR 95,420" trend={{ value: "+12%", isPositive: true, label: "vs last week" }} icon={Wallet} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Total Orders" value="128" trend={{ value: "+14%", isPositive: true, label: "vs last week" }} icon={ShoppingBag} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Total Customers" value="96" trend={{ value: "+8%", isPositive: true, label: "vs last week" }} icon={TrendingUp} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
        <StatCard title="Average Rating" value="4.6" trend={{ value: "+5%", isPositive: true, label: "vs last week" }} icon={Sparkles} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Sales Overview</h2>
            <select className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-emerald-300">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="mt-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="reportRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                <Tooltip formatter={(value: number) => [`PKR ${value.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 40px -12px rgb(15 23 42 / 0.25)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#047857" strokeWidth={2.5} fill="url(#reportRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Total Sales</p>
              <p className="text-xl font-semibold text-slate-900">PKR 95,420</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-emerald-700">+14%</div>
              <p className="text-xs text-slate-500">vs last week</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Orders by Status</h2>
          <div className="mt-4 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" innerRadius={85} outerRadius={120} paddingAngle={3}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Top Selling Items</h2>
            <select className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none transition focus:border-emerald-300">
              <option>By Quantity</option>
              <option>By Revenue</option>
            </select>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Item Name</th>
                  <th className="pb-3 font-medium">Quantity Sold</th>
                  <th className="pb-3 font-medium text-right">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topItems.map((item, index) => (
                  <tr key={item.name}>
                    <td className="py-4 font-medium text-slate-400">{index + 1}</td>
                    <td className="py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="py-4 text-slate-600">{item.quantity}</td>
                    <td className="py-4 text-right font-medium text-slate-900">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Revenue Summary</h2>
          <div className="mt-5 space-y-4">
            <SummaryRow label="Total Revenue" value="PKR 95,420" valueClass="text-emerald-700" />
            <SummaryRow label="Delivery Charges" value="PKR 9,820" />
            <SummaryRow label="Discounts" value="- PKR 5,320" valueClass="text-rose-600" />
            <div className="border-t border-slate-100 pt-4">
              <SummaryRow label="Net Revenue" value="PKR 99,920" valueClass="text-slate-900" />
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Payment Methods</p>
            <div className="mt-4 space-y-3">
              {paymentData.map((item) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600">{item.name}</span>
                    <span className="font-semibold text-slate-900">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueClass = "text-slate-700" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      <span className={`text-sm font-semibold ${valueClass}`}>{value}</span>
    </div>
  );
}
