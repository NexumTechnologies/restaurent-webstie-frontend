"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Download, Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminReports } from "@/lib/api";

export default function ReportsPage() {
  const reportsQuery = useQuery({
    queryKey: ["admin-reports"],
    queryFn: getAdminReports,
  });

  const report = reportsQuery.data;
  const topRestaurants = (report?.topItems ?? []).slice(0, 5).map((item, index) => ({
    name: item.name,
    orders: item.quantitySold ?? 0,
    revenue: formatCurrency(item.revenue ?? Number(item.price) * Number(item.quantitySold ?? 0)),
    growth: `${index % 2 === 0 ? "+" : "-"}${(index + 5) * 1.5}%`,
  }));

  const revenueData = report?.revenueTrend ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">View platform analytics and generate detailed reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select className="block appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Last 8 Months</option>
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 font-medium text-white transition-colors hover:bg-green-800">
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={formatCurrency(report?.totals?.revenue ?? 0)} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={DollarSign} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Total Orders" value={sum(report?.status ?? [], "count")} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Avg. Order Value" value={formatCurrency(report?.totals?.averageOrderValue ?? 0)} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={TrendingUp} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Growth Rate" value="+0%" trend={{ value: reportsQuery.data ? "Backend connected" : "Loading data", isPositive: true, label: "" }} icon={BarChart3} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="h-0.5 w-3 rounded-full bg-green-500" />
              <span>Backend sample trend</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData} margin={{ top: 16, right: 20, left: 8, bottom: 18 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" interval={0} stroke="#d1d5db" tickMargin={10} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis width={56} stroke="#d1d5db" tickMargin={8} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} domain={[0, (dataMax: number) => Math.max(dataMax, 1)]} />
                <Tooltip formatter={(v: any) => [formatCurrency(v), "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} fill="url(#revenueGrad)" activeDot={{ r: 6, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }} />
                <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: "#16a34a" }} activeDot={{ r: 6, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Items</h2>
          <div className="space-y-4">
            {topRestaurants.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">{index + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.orders} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{item.revenue}</p>
                  <p className={`text-xs font-medium ${item.growth.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{item.growth}</p>
                </div>
              </div>
            ))}
            {!topRestaurants.length ? <p className="text-sm text-gray-500">No report data yet.</p> : null}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
          <button className="text-sm font-medium text-green-700 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
                <th className="px-6 py-4 font-medium">Report Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Generated On</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(report?.status ?? []).map((item, index) => (
                <tr key={`${item.status}-${index}`} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{prettyStatus(item.status)} Summary</td>
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">Orders</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">Live</td>
                  <td className="px-6 py-4 text-gray-500">{item.count} rows</td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:bg-green-50 hover:text-green-600">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!report?.status?.length ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                    {reportsQuery.isLoading ? "Loading reports..." : "No report data available."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 p-4 text-sm text-gray-500">
          <div>Showing 1 to {report?.status?.length ?? 0} of {report?.status?.length ?? 0} reports</div>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 font-medium text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">3</button>
            <div className="px-1">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">5</button>
            <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function sum(items: Array<Record<string, any>>, key: string) {
  return items.reduce((acc, item) => acc + Number(item[key] ?? 0), 0);
}

function avg(items: Array<Record<string, any>>, key: string) {
  if (!items.length) return 0;
  return sum(items, key) / items.length;
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}

function prettyStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
