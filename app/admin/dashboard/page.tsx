"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { ChevronRight, AlertTriangle, Info, CheckCircle2, Users, Store, ShoppingBag, DollarSign } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { getAdminDashboard } from "@/lib/api";

export default function DashboardPage() {
  const dashboardQuery = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard,
  });

  const dashboard = dashboardQuery.data;
  const stats = dashboard?.stats ?? { customers: 0, restaurants: 0, orders: 0, revenue: 0 };
  const recentOrders = dashboard?.recentOrders ?? [];
  const alerts = dashboard?.alerts?.closedRestaurants ?? 0;
  const chartData = useMemo(() => buildOrdersChart(recentOrders), [recentOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin! Here's what's happening in FoodFlow.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Customers" value={stats.customers} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Users} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Total Restaurants" value={stats.restaurants} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Store} iconBgColor="bg-orange-50" iconColor="text-orange-600" />
        <StatCard title="Total Orders" value={stats.orders} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Total Revenue" value={`PKR ${Number(stats.revenue).toLocaleString("en-PK")}`} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={DollarSign} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Orders Overview</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-0.5 w-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">This Week</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-0.5 w-3 rounded-full border-t-2 border-dashed border-gray-300 bg-transparent" />
                  <span className="text-gray-600">Last Week</span>
                </div>
              </div>
              <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
          <OrdersChart data={chartData} />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { name: "Manage Users", href: "/admin/manage-users", icon: Users },
              { name: "Manage Restaurants", href: "/admin/manage-restaurants", icon: Store },
              { name: "View Orders", href: "/admin/view-orders", icon: ShoppingBag },
              { name: "Reports", href: "/admin/reports", icon: AlertTriangle },
            ].map((action) => (
              <Link key={action.name} href={action.href} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 transition-colors hover:border-green-200 hover:bg-green-50/50 group">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                    <action.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.name}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/view-orders" className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700">
              View All Orders <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Restaurant</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-medium text-gray-900">{order.orderNumber ?? order.id}</td>
                    <td className="py-4 text-gray-600">{order.User?.name ?? "N/A"}</td>
                    <td className="py-4 text-gray-900">{order.Restaurant?.name ?? "N/A"}</td>
                    <td className="py-4 font-medium text-gray-900">{formatCurrency(order.total ?? 0)}</td>
                    <td className="py-4">
                      <StatusBadge status={prettyStatus(order.status) as any} />
                    </td>
                    <td className="py-4 text-gray-500">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
                {!recentOrders.length ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-gray-500">
                      {dashboardQuery.isLoading ? "Loading dashboard..." : "No recent orders found."}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
            <button className="text-sm font-medium text-green-600 hover:text-green-700">View All</button>
          </div>
          <div className="space-y-6">
            <AlertRow icon={AlertTriangle} color="text-orange-500" title={`${alerts} restaurants pending verification`} time="Live data" />
            <AlertRow icon={Info} color="text-blue-500" title="Database backup ready" time="Use Backup & Restore" />
            <AlertRow icon={CheckCircle2} color="text-green-500" title="System is running smoothly" time="Current status" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertRow({ icon: Icon, color, title, time }: { icon: ComponentType<{ className?: string }>; color: string; title: string; time: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

function prettyStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}

function buildOrdersChart(
  orders: Array<{ createdAt?: string }>
): Array<{ name: string; orders: number }> {
  const today = new Date();
  const keys = Array.from({ length: 7 }, (_, index) => {
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
    const bucket = keys.find((item) => item.key === key);
    if (bucket) bucket.orders += 1;
  }

  return keys.map(({ name, orders: total }) => ({ name, orders: total }));
}
