"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Download, Eye, Filter, Search, ShoppingBag, Clock, Truck, BadgeCheck, XCircle } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { downloadAdminExport, getAdminOrders } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

export default function ViewOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { success, error } = useToast();

  const ordersQuery = useQuery({
    queryKey: ["admin-orders", search, statusFilter],
    queryFn: () => getAdminOrders({ search: search.trim() || undefined, status: statusFilter }),
  });

  const orders = ordersQuery.data ?? [];

  const stats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((order) => order.status === "delivered").length;
    const pending = orders.filter((order) => order.status === "pending").length;
    const cancelled = orders.filter((order) => order.status === "cancelled").length;
    return { total, delivered, pending, cancelled };
  }, [orders]);

  async function handleExport() {
    try {
      await downloadAdminExport("orders");
      success("Export started", "Your orders CSV has been downloaded.");
    } catch (err) {
      error("Export failed", err instanceof Error ? err.message : "Unable to export orders.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">View Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor and manage all customer orders in the system.</p>
        </div>
        <button onClick={handleExport} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          <Download className="h-4 w-4" />
          Export Orders
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Orders" value={stats.total} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Delivered" value={stats.delivered} trend={{ value: "Completed orders", isPositive: true, label: "" }} icon={BadgeCheck} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Pending" value={stats.pending} trend={{ value: "Awaiting processing", isPositive: true, label: "" }} icon={Clock} iconBgColor="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Cancelled" value={stats.cancelled} trend={{ value: "Cancelled orders", isPositive: false, label: "" }} icon={XCircle} iconBgColor="bg-red-50" iconColor="text-red-600" />
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order ID, customer or restaurant..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="on_the_way">On The Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button onClick={handleExport} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
              <Download className="h-4 w-4" />
              Export Orders
            </button>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Restaurant</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50/70">
                  <td className="py-4 font-semibold text-emerald-900">{order.orderNumber}</td>
                  <td className="py-4 text-slate-700">{order.User?.name ?? "N/A"}</td>
                  <td className="py-4 text-slate-600">{order.Restaurant?.name ?? "N/A"}</td>
                  <td className="py-4 font-medium text-slate-900">{formatCurrency(order.total)}</td>
                  <td className="py-4 text-slate-600">{prettyPayment(order.paymentMethod)}</td>
                  <td className="py-4">
                    <StatusBadge status={prettyStatus(order.status) as any} />
                  </td>
                  <td className="py-4 text-slate-500">{formatDate(order.createdAt)}</td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/view-orders/${order.id}`} className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:text-emerald-700" aria-label="View order details">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {!orders.length ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sm text-slate-500">
                    {ordersQuery.isLoading ? "Loading orders..." : "No orders match your filters."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <div>
            Showing 1 to {orders.length} of {orders.length} orders
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 font-semibold text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-slate-600 transition hover:bg-slate-50">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-slate-600 transition hover:bg-slate-50">3</button>
            <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function prettyStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function prettyPayment(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
