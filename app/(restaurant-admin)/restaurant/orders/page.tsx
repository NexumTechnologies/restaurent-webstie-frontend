"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, Eye, Filter, Search, ShoppingBag, Clock3, Truck, BadgeCheck, XCircle } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { restaurantOrders } from "./order-data";

export default function RestaurantOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = useMemo(() => {
    return restaurantOrders.filter((order) => {
      const matchesSearch =
        `${order.orderNumber} ${order.customer} ${order.items}`.toLowerCase().includes(search.toLowerCase().trim());
      const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Orders</h1>
          <p className="mt-1 text-sm text-slate-500">Track live orders, payments, and fulfillment status.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          <Download className="h-4 w-4" />
          Export Orders
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Orders" value={restaurantOrders.length} trend={{ value: "Today", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Preparing" value={restaurantOrders.filter((order) => order.status === "Preparing").length} trend={{ value: "Orders", isPositive: true, label: "" }} icon={Clock3} iconBgColor="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="On The Way" value={restaurantOrders.filter((order) => order.status === "On The Way").length} trend={{ value: "Orders", isPositive: true, label: "" }} icon={Truck} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Delivered" value={restaurantOrders.filter((order) => order.status === "Delivered").length} trend={{ value: "Today", isPositive: true, label: "" }} icon={BadgeCheck} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-lg">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order ID or customer name..."
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
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="on the way">On The Way</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
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
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Payment</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50/70">
                  <td className="py-4 font-semibold text-emerald-900">{order.orderNumber}</td>
                  <td className="py-4 text-slate-700">{order.customer}</td>
                  <td className="py-4 text-slate-600">{order.items}</td>
                  <td className="py-4 font-medium text-slate-900">{order.amount}</td>
                  <td className="py-4 text-slate-600">{order.paymentMethod}</td>
                  <td className="py-4">
                    <StatusBadge status={order.status as any} />
                  </td>
                  <td className="py-4 text-slate-500">{order.time}</td>
                  <td className="py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/restaurant/orders/${order.id}`} className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-emerald-200 hover:text-emerald-700" aria-label="View order details">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <div>Showing 1 to {filteredOrders.length} of {restaurantOrders.length} orders</div>
          <div className="flex items-center gap-1">
            <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white font-semibold">1</button>
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
