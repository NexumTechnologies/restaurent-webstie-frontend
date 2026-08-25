"use client";

import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ShoppingBag, CheckCircle2, Clock, XCircle, Search, Filter, Download, Eye, Edit2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const orders = [
  { id: "ORD-1001", customer: "Rahul Sharma", restaurant: "Burger House", amount: "₹450.00", payment: "UPI", status: "Delivered", date: "May 16, 2025 10:30 AM" },
  { id: "ORD-1002", customer: "Priya Verma", restaurant: "Pizza Point", amount: "₹620.00", payment: "Credit Card", status: "On The Way", date: "May 16, 2025 10:45 AM" },
  { id: "ORD-1003", customer: "Amit Singh", restaurant: "Spice Hub", amount: "₹380.00", payment: "UPI", status: "Preparing", date: "May 16, 2025 11:00 AM" },
  { id: "ORD-1004", customer: "Neha Patel", restaurant: "Healthy Bites", amount: "₹350.00", payment: "Debit Card", status: "Pending", date: "May 16, 2025 11:15 AM" },
  { id: "ORD-1005", customer: "Vikram Rao", restaurant: "Pasta Express", amount: "₹510.00", payment: "Cash on Delivery", status: "Delivered", date: "May 16, 2025 11:30 AM" },
  { id: "ORD-1006", customer: "Sneha Iyer", restaurant: "Burger House", amount: "₹420.00", payment: "UPI", status: "Cancelled", date: "May 16, 2025 11:45 AM" },
  { id: "ORD-1007", customer: "Karan Mehta", restaurant: "Pizza Point", amount: "₹710.00", payment: "Credit Card", status: "Delivered", date: "May 16, 2025 12:00 PM" },
  { id: "ORD-1008", customer: "Anjali Gupta", restaurant: "Spice Hub", amount: "₹290.00", payment: "UPI", status: "Pending", date: "May 16, 2025 12:15 PM" },
  { id: "ORD-1009", customer: "Rohit Das", restaurant: "Healthy Bites", amount: "₹330.00", payment: "Cash on Delivery", status: "Preparing", date: "May 16, 2025 12:30 PM" },
  { id: "ORD-1010", customer: "Pooja Nair", restaurant: "Pasta Express", amount: "₹560.00", payment: "Debit Card", status: "Delivered", date: "May 16, 2025 12:45 PM" },
];

export default function ViewOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">View Orders</h1>
        <p className="text-gray-500">Monitor and manage all customer orders in the system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="1,248"
          trend={{ value: "All time orders", isPositive: true, label: "" }}
          icon={ShoppingBag}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Delivered"
          value="864"
          trend={{ value: "69.23% of total", isPositive: true, label: "" }}
          icon={CheckCircle2}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending"
          value="238"
          trend={{ value: "19.07% of total", isPositive: true, label: "" }}
          icon={Clock}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Cancelled"
          value="146"
          trend={{ value: "11.70% of total", isPositive: false, label: "" }}
          icon={XCircle}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Order ID, Customer or Restaurant..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select className="block w-full md:w-auto px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>All Status</option>
              <option>Delivered</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
            <select className="block w-full md:w-auto px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>All Payment Methods</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Cash on Delivery</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-green-600 text-green-700 hover:bg-green-50 rounded-xl text-sm font-medium transition-colors shrink-0">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Payment</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.restaurant}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{order.payment}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status as any} />
                  </td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 10 of 1,248 orders</div>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-600 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">5</button>
            <div className="px-1"><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">125</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
