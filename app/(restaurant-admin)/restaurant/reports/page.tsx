"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { getRestaurantDashboard, getRestaurantOrders } from "@/lib/api";

export default function RestaurantReportsPage() {
  const dashboardQuery = useQuery({
    queryKey: ["restaurant-dashboard"],
    queryFn: getRestaurantDashboard,
  });

  const ordersQuery = useQuery({
    queryKey: ["restaurant-orders"],
    queryFn: getRestaurantOrders,
  });

  const stats = dashboardQuery.data?.stats ?? { orders: 0, revenue: 0, customers: 0, rating: null };
  const orders = ordersQuery.data ?? [];
  const revenueData = useMemo(() => buildRevenueData(orders), [orders]);
  const statusData = useMemo(() => buildStatusData(orders), [orders]);
  const topItems = useMemo(() => buildTopItems(orders), [orders]);
  const paymentData = useMemo(() => buildPaymentData(orders), [orders]);
  const totalRevenue = useMemo(() => sumOrderTotals(orders), [orders]);
  const netRevenue = useMemo(() => totalRevenue - sumFees(orders), [orders, totalRevenue]);

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
            <span>{formatRangeLabel()}</span>
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(stats.revenue)} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Wallet} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Total Orders" value={stats.orders} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Total Customers" value={stats.customers} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={TrendingUp} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
        <StatCard title="Average Rating" value={stats.rating ?? 0} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Sparkles} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
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
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(value) => `${Number(value) / 1000}k`} />
                <Tooltip formatter={(value: number) => [`PKR ${value.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 40px -12px rgb(15 23 42 / 0.25)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#047857" strokeWidth={2.5} fill="url(#reportRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Total Sales</p>
              <p className="text-xl font-semibold text-slate-900">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-emerald-700">Live</div>
              <p className="text-xs text-slate-500">backend totals</p>
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
                    <td className="py-4 text-right font-medium text-slate-900">{formatCurrency(item.revenue)}</td>
                  </tr>
                ))}
                {!topItems.length ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-sm text-slate-500">
                      {ordersQuery.isLoading ? "Loading items..." : "No items found yet."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Revenue Summary</h2>
          <div className="mt-5 space-y-4">
            <SummaryRow label="Total Revenue" value={formatCurrency(totalRevenue)} valueClass="text-emerald-700" />
            <SummaryRow label="Delivery Charges" value={formatCurrency(sumFees(orders, "deliveryFee"))} />
            <SummaryRow label="Discounts" value={`- ${formatCurrency(sumFees(orders, "discount"))}`} valueClass="text-rose-600" />
            <div className="border-t border-slate-100 pt-4">
              <SummaryRow label="Net Revenue" value={formatCurrency(netRevenue)} valueClass="text-slate-900" />
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

function buildRevenueData(orders: Array<{ createdAt: string; total: string | number }>) {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);
    return {
      key: date.toISOString().slice(0, 10),
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      revenue: 0,
    };
  });

  for (const order of orders) {
    const date = new Date(order.createdAt);
    if (Number.isNaN(date.getTime())) continue;
    const key = date.toISOString().slice(0, 10);
    const bucket = days.find((day) => day.key === key);
    if (bucket) bucket.revenue += Number(order.total || 0);
  }

  return days.map(({ name, revenue }) => ({ name, revenue }));
}

function buildStatusData(orders: Array<{ status: string }>) {
  const statuses = [
    { name: "Delivered", value: 0, color: "#0f766e", match: "delivered" },
    { name: "On The Way", value: 0, color: "#2563eb", match: "on_the_way" },
    { name: "Preparing", value: 0, color: "#f59e0b", match: "preparing" },
    { name: "Cancelled", value: 0, color: "#ef4444", match: "cancelled" },
  ];

  for (const order of orders) {
    const bucket = statuses.find((item) => item.match === order.status);
    if (bucket) bucket.value += 1;
  }

  return statuses.map(({ name, value, color }) => ({ name, value, color }));
}

function buildTopItems(
  orders: Array<{ OrderItems?: Array<{ name: string; quantity: number; lineTotal: string | number }> }>
) {
  const map = new Map<string, { name: string; quantity: number; revenue: number }>();

  for (const order of orders) {
    for (const item of order.OrderItems ?? []) {
      const current = map.get(item.name) ?? { name: item.name, quantity: 0, revenue: 0 };
      current.quantity += Number(item.quantity || 0);
      current.revenue += Number(item.lineTotal || 0);
      map.set(item.name, current);
    }
  }

  return Array.from(map.values())
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5)
    .map((item) => ({
      ...item,
      revenue: item.revenue,
    }));
}

function buildPaymentData(orders: Array<{ paymentMethod: string }>) {
  const total = Math.max(orders.length, 1);
  const counts = new Map<string, number>();

  for (const order of orders) {
    counts.set(order.paymentMethod, (counts.get(order.paymentMethod) ?? 0) + 1);
  }

  const labels = [
    ["cash", "Cash on Delivery"],
    ["jazzcash", "JazzCash"],
    ["easypaisa", "Easypaisa"],
    ["card", "Card / Other"],
  ] as const;

  return labels.map(([key, name]) => ({
    name,
    value: Math.round(((counts.get(key) ?? 0) / total) * 100),
  }));
}

function sumOrderTotals(orders: Array<{ total: string | number }>) {
  return orders.reduce((total, order) => total + Number(order.total || 0), 0);
}

function sumFees(orders: Array<Record<string, string | number>>, key: "deliveryFee" | "discount" = "deliveryFee") {
  return orders.reduce((total, order) => total + Number(order[key] || 0), 0);
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}

function formatRangeLabel() {
  const end = new Date();
  const start = new Date(end);
  start.setDate(end.getDate() - 7);
  return `${start.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} - ${end.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
}
