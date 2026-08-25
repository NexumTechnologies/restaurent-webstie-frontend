import { StatCard } from "@/components/admin/StatCard";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Users, Store, ShoppingBag, DollarSign, ChevronRight, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const recentOrders = [
  { id: "#ORD-10284", customer: "Ali Khan", restaurant: "Burger House", amount: "PKR 1,250", status: "Delivered", time: "Today, 11:15 AM", icon: "🍔" },
  { id: "#ORD-10283", customer: "Sara Malik", restaurant: "Pizza Point", amount: "PKR 950", status: "On The Way", time: "Today, 10:45 AM", icon: "🍕" },
  { id: "#ORD-10282", customer: "Usman Ahmad", restaurant: "Spice Hub", amount: "PKR 1,100", status: "Preparing", time: "Today, 10:20 AM", icon: "🥘" },
  { id: "#ORD-10281", customer: "Hira Butt", restaurant: "Pasta Express", amount: "PKR 850", status: "Delivered", time: "Today, 09:30 AM", icon: "🍝" },
];

const systemAlerts = [
  { id: 1, title: "Low stock alert for 5 restaurants", time: "2 minutes ago", type: "warning", icon: AlertTriangle, color: "text-red-500" },
  { id: 2, title: "3 restaurants pending verification", time: "15 minutes ago", type: "warning", icon: AlertTriangle, color: "text-orange-500" },
  { id: 3, title: "Database backup completed", time: "Today, 02:00 AM", type: "info", icon: Info, color: "text-blue-500" },
  { id: 4, title: "System is running smoothly", time: "Today, 12:00 AM", type: "success", icon: CheckCircle2, color: "text-green-500" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, Admin! Here's what's happening in FoodFlow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value="3,782"
          trend={{ value: "15.7%", isPositive: true, label: "from last week" }}
          icon={Users}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Total Restaurants"
          value="156"
          trend={{ value: "12.3%", isPositive: true, label: "from last week" }}
          icon={Store}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Total Orders"
          value="1,284"
          trend={{ value: "18.5%", isPositive: true, label: "from last week" }}
          icon={ShoppingBag}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Revenue"
          value="PKR 1,843,560"
          trend={{ value: "22.8%", isPositive: true, label: "from last week" }}
          icon={DollarSign}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Orders Overview</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">This Week</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-0.5 bg-gray-300 rounded-full border-dashed border-t-2 border-gray-300 bg-transparent"></div>
                  <span className="text-gray-600">Last Week</span>
                </div>
              </div>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white outline-none">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
          <OrdersChart />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { name: "Manage Users", icon: Users, color: "text-green-600", bg: "bg-green-50" },
              { name: "Manage Restaurants", icon: Store, color: "text-green-600", bg: "bg-green-50" },
              { name: "View Orders", icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50" },
              { name: "Reports", icon: AlertTriangle, color: "text-green-600", bg: "bg-green-50" },
            ].map((action) => (
              <button key={action.name} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center`}>
                    <action.icon className={`w-5 h-5 ${action.color}`} />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/view-orders" className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center gap-1">
              View All Orders <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
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
                    <td className="py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 text-gray-600">{order.customer}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{order.icon}</span>
                        <span className="font-medium text-gray-900">{order.restaurant}</span>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-gray-900">{order.amount}</td>
                    <td className="py-4">
                      <StatusBadge status={order.status as any} />
                    </td>
                    <td className="py-4 text-gray-500">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
            <button className="text-sm font-medium text-green-600 hover:text-green-700">View All</button>
          </div>
          <div className="space-y-6">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex gap-4">
                <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100`}>
                  <alert.icon className={`w-5 h-5 ${alert.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
