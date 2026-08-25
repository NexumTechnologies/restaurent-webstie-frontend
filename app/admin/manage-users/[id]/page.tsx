"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, ShoppingBag, DollarSign, Star, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

const recentOrders = [
  { id: "ORD-1001", restaurant: "Burger House", amount: "₹450.00", date: "16 May 2025", status: "Delivered" },
  { id: "ORD-0998", restaurant: "Pizza Point", amount: "₹620.00", date: "14 May 2025", status: "Delivered" },
  { id: "ORD-0985", restaurant: "Spice Hub", amount: "₹380.00", date: "11 May 2025", status: "Cancelled" },
  { id: "ORD-0972", restaurant: "Healthy Bites", amount: "₹350.00", date: "08 May 2025", status: "Delivered" },
];

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = {
    id: params.id,
    name: "Ali Khan",
    email: "ali.khan@example.com",
    phone: "+91 98765 43210",
    role: "Customer",
    joined: "12 May 2024",
    status: "Active",
    lastLogin: "25 Aug 2026, 10:30 AM",
    totalOrders: 42,
    totalSpent: "₹18,540",
    avgOrderValue: "₹441",
    favoriteRestaurant: "Burger House",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/manage-users" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500">View detailed profile and activity information.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 text-3xl font-bold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">{user.role}</span>
              <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {user.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">Member since {user.joined} · Last login: {user.lastLogin}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              Suspend Account
            </button>
            <button className="px-4 py-2 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
              Edit Details
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-900">{user.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm font-medium text-gray-900">{user.joined}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={user.totalOrders}
          trend={{ value: "All time orders", isPositive: true, label: "" }}
          icon={ShoppingBag}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Spent"
          value={user.totalSpent}
          trend={{ value: "All time spending", isPositive: true, label: "" }}
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Avg. Order Value"
          value={user.avgOrderValue}
          trend={{ value: "Per order average", isPositive: true, label: "" }}
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Favorite Restaurant"
          value={user.favoriteRestaurant}
          trend={{ value: "Most ordered from", isPositive: true, label: "" }}
          icon={Star}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.restaurant}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status as any} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <button className="text-sm font-medium text-green-700 hover:underline">View All Orders</button>
        </div>
      </div>
    </div>
  );
}
