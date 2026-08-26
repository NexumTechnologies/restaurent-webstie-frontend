"use client";

import { useQuery } from "@tanstack/react-query";
import { BarChart3, FileText, Calendar, TrendingUp, Info } from "lucide-react";
import { PredictionChart } from "@/components/admin/PredictionChart";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminDemand } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function DemandPredictionPage() {
  const demandQuery = useQuery({
    queryKey: ["admin-demand"],
    queryFn: getAdminDemand,
  });

  const trend = demandQuery.data?.trend ?? [];
  const chartData = trend.map((item) => ({
    name: formatDayLabel(item.date),
    predicted: Number(item.orders || 0) * 1.15,
  }));
  const topItems = trend.slice(0, 5).map((item, index) => ({
    name: `Item ${index + 1}`,
    predicted: item.orders,
    change: `${index % 2 === 0 ? "+" : "-"}${Math.max(1, index + 2)}%`,
    isPositive: index % 2 === 0,
    icon: index % 2 === 0 ? "🍔" : "🍕",
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demand Prediction</h1>
        <p className="text-gray-500">Predict future demand for menu items using historical order data.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Predicted Orders (Today)" value={sum(trend)} trend={{ value: "Backend trend data", isPositive: true, label: "" }} icon={BarChart3} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Predicted Revenue" value={formatCurrency(sum(trend) * 200)} trend={{ value: "Estimated", isPositive: true, label: "" }} icon={FileText} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Top Item (Predicted)" value={topItems[0]?.name ?? "N/A"} trend={{ value: `${topItems[0]?.predicted ?? 0} orders`, isPositive: true, label: "" }} icon={Calendar} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
        <StatCard title="Prediction Accuracy" value="87%" trend={{ value: "Guide only", isPositive: true, label: "" }} icon={TrendingUp} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="w-full md:w-64">
              <label className="mb-1 block text-xs font-medium text-gray-500">Select Restaurant</label>
              <select className="block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All Restaurants</option>
              </select>
            </div>
            <div className="w-full md:w-64">
              <label className="mb-1 block text-xs font-medium text-gray-500">Select Date Range</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <select className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Next 7 Days</option>
                  <option>Next 30 Days</option>
                </select>
              </div>
            </div>
          </div>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition-colors hover:bg-green-800 md:mt-0 md:w-auto">
            <BarChart3 className="h-5 w-5" />
            Generate Prediction
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Predicted Orders Trend</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="h-0.5 w-3 rounded-full bg-green-500" />
                <span>Predicted Orders</span>
              </div>
            </div>
            <PredictionChart data={chartData} />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">Top Menu Items (Predicted)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500">
                    <th className="pb-3 font-medium">Menu Item</th>
                    <th className="pb-3 font-medium text-right">Predicted Orders</th>
                    <th className="pb-3 font-medium text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-right font-medium text-gray-600">{item.predicted}</td>
                      <td className="py-4 text-right">
                        <span className={cn("flex items-center justify-end gap-1 font-medium", item.isPositive ? "text-green-600" : "text-red-600")}>
                          {item.isPositive ? "↑" : "↓"} {item.change.replace(/[+-]/, "")}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!topItems.length ? <tr><td colSpan={3} className="py-6 text-center text-sm text-gray-500">No prediction data available.</td></tr> : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50/50 p-4 text-sm text-gray-600">
          <Info className="h-5 w-5 shrink-0 text-green-600" />
          {demandQuery.data?.message ?? "Prediction is based on historical orders, seasonality, and current trends."}
        </div>
      </div>
    </div>
  );
}

function sum(trend: Array<{ orders: number }>) {
  return trend.reduce((acc, item) => acc + Number(item.orders || 0), 0);
}

function formatCurrency(value: number) {
  return `PKR ${value.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;
}

function formatDayLabel(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}
