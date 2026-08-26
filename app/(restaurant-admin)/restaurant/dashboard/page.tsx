"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRight,
  ChevronRight,
  Download,
  Plus,
  Sparkles,
  ShoppingBag,
  Users,
  Wallet,
  Star,
} from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { getRestaurantDashboard } from "@/lib/api";

const topItems = [
  { name: "Zinger Burger", orders: 85, revenue: "PKR 595" },
  { name: "French Fries", orders: 68, revenue: "PKR 199" },
  { name: "Coca Cola", orders: 62, revenue: "PKR 120" },
  { name: "Chicken Club Sandwich", orders: 48, revenue: "PKR 650" },
  { name: "Chicken Wings", orders: 40, revenue: "PKR 890" },
];

const quickActions = [
  { title: "Add New Item", icon: Plus, href: "/restaurant/menu-items" },
  { title: "View Orders", icon: Sparkles, href: "/restaurant/orders" },
  { title: "Generate Report", icon: Download, href: "/restaurant/reports" },
  { title: "Export Data", icon: Download, href: "/restaurant/export-data" },
];

export default function RestaurantDashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: ["restaurant-dashboard"],
    queryFn: getRestaurantDashboard,
  });

  const dashboard = dashboardQuery.data;
  const stats = dashboard?.stats ?? { orders: 0, revenue: 0, customers: 0, rating: null };
  const recentOrders = dashboard?.recentOrders ?? [];
  const chartData = useMemo(() => buildOrdersChart(recentOrders), [recentOrders]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={stats.orders}
          trend={{ value: "Live from backend", isPositive: true, label: "" }}
          icon={ShoppingBag}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Total Revenue"
          value={`PKR ${Number(stats.revenue).toLocaleString("en-PK")}`}
          trend={{ value: "Live from backend", isPositive: true, label: "" }}
          icon={Wallet}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Customers"
          value={stats.customers}
          trend={{ value: "Live from backend", isPositive: true, label: "" }}
          icon={Users}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Average Rating"
          value={stats.rating ?? 0}
          trend={{ value: "Live from backend", isPositive: true, label: "" }}
          icon={Star}
          iconBgColor="bg-violet-50"
          iconColor="text-violet-600"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
            <Link href="/restaurant/orders" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
              View All Orders
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Items</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-slate-50/70">
                    <td className="py-4 font-semibold text-emerald-900">{order.orderNumber}</td>
                    <td className="py-4 text-slate-700">{order.User?.name ?? "N/A"}</td>
                    <td className="py-4 text-slate-600">{(order.OrderItems?.length ?? 0) || 1} item{(order.OrderItems?.length ?? 0) === 1 ? "" : "s"}</td>
                    <td className="py-4 font-medium text-slate-900">{formatCurrency(order.total)}</td>
                    <td className="py-4">
                      <StatusBadge status={prettyStatus(order.status) as any} />
                    </td>
                  </tr>
                ))}
                {!recentOrders.length ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-sm text-slate-500">
                      {dashboardQuery.isLoading ? "Loading dashboard..." : "No recent orders found."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Order Overview</h2>
            <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>

          <OrdersChart data={chartData} />

          <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Total Sales</p>
              <p className="text-xl font-semibold text-slate-900">{formatCurrency(stats.revenue)}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                <ArrowUpRight className="h-4 w-4" />
                Live
              </div>
              <p className="text-xs text-slate-500">from backend</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_1fr_0.95fr]">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Top Selling Items</h2>
            <Link href="/restaurant/menu-items" className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
              View All Items
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {topItems.map((item, index) => (
              <div key={item.name} className="flex items-center gap-3 rounded-2xl border border-slate-100 px-3 py-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-lg">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.orders} orders</p>
                </div>
                <p className="text-sm font-semibold text-slate-900">{item.revenue}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Demand Prediction</h2>
            <Link href="/restaurant/demand-prediction" className="text-sm font-medium text-emerald-700">
              View Report
            </Link>
          </div>

          <div className="mt-4 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-900">High Demand Expected</p>
            <p className="mt-1 text-xs text-slate-600">Tomorrow (Wednesday)</p>
            <p className="mt-2 text-sm text-slate-600">Expected increase based on recent order history.</p>
          </div>

          <div className="mt-5 space-y-3">
            {[
              ["Zinger Burger", "+20%"],
              ["French Fries", "+15%"],
              ["Chicken Wings", "+12%"],
            ].map(([name, change]) => (
              <div key={name} className="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-3">
                <span className="text-sm text-slate-700">{name}</span>
                <span className="text-sm font-semibold text-emerald-700">{change}</span>
              </div>
            ))}
          </div>

          <Link href="/restaurant/demand-prediction" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
            View Full Prediction Report
          </Link>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const palette =
                action.title === "Add New Item"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : action.title === "View Orders"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : action.title === "Generate Report"
                      ? "bg-violet-50 text-violet-700 border-violet-100"
                      : "bg-amber-50 text-amber-700 border-amber-100";

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`flex min-h-28 flex-col justify-between rounded-3xl border p-4 transition hover:-translate-y-0.5 hover:shadow-md ${palette}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-semibold">{action.title}</span>
                </Link>
              );
            })}
          </div>

          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-3xl border border-rose-100 bg-rose-50/70 px-4 py-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-100">
            <Download className="h-4 w-4" />
            Backup Data
          </button>
        </div>
      </div>
    </div>
  );
}

function buildOrdersChart(
  orders: Array<{ createdAt?: string }>
): Array<{ name: string; orders: number }> {
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    date.setHours(0, 0, 0, 0);
    return {
      key: date.toISOString().slice(0, 10),
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
      orders: 0,
    };
  });

  for (const order of orders) {
    if (!order.createdAt) continue;
    const date = new Date(order.createdAt);
    if (Number.isNaN(date.getTime())) continue;
    const key = date.toISOString().slice(0, 10);
    const bucket = days.find((day) => day.key === key);
    if (bucket) bucket.orders += 1;
  }

  return days.map(({ name, orders: total }) => ({ name, orders: total }));
}

function prettyStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}
