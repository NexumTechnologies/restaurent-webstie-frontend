"use client";

import { StatCard } from "@/components/admin/StatCard";
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Download, Calendar, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 55000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 62000 },
  { month: "May", revenue: 78000 },
  { month: "Jun", revenue: 71000 },
  { month: "Jul", revenue: 85000 },
  { month: "Aug", revenue: 92000 },
];

const topRestaurants = [
  { name: "Burger House", orders: 1248, revenue: "PKR 312,000", growth: "+15%" },
  { name: "Pizza Point", orders: 980, revenue: "PKR 245,000", growth: "+10%" },
  { name: "Spice Hub", orders: 756, revenue: "PKR 189,000", growth: "+8%" },
  { name: "Healthy Bites", orders: 612, revenue: "PKR 153,000", growth: "+5%" },
  { name: "Pasta Express", orders: 524, revenue: "PKR 131,000", growth: "-2%" },
];

const recentReports = [
  { name: "Monthly Revenue Report - Aug 2024", generated: "25 Aug 2024", type: "Revenue", size: "1.2 MB" },
  { name: "Order Summary Report - Aug 2024", generated: "25 Aug 2024", type: "Orders", size: "980 KB" },
  { name: "Restaurant Performance - Jul 2024", generated: "01 Aug 2024", type: "Performance", size: "2.4 MB" },
  { name: "User Activity Report - Jul 2024", generated: "01 Aug 2024", type: "Users", size: "756 KB" },
  { name: "Monthly Revenue Report - Jul 2024", generated: "01 Aug 2024", type: "Revenue", size: "1.1 MB" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500">View platform analytics and generate detailed reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select className="block pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
              <option>Last 8 Months</option>
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="PKR 533K"
          trend={{ value: "12.5%", isPositive: true, label: "from last month" }}
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Orders"
          value="5,120"
          trend={{ value: "8.3%", isPositive: true, label: "from last month" }}
          icon={ShoppingBag}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Avg. Order Value"
          value="PKR 104"
          trend={{ value: "3.8%", isPositive: true, label: "from last month" }}
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Growth Rate"
          value="+15.2%"
          trend={{ value: "Vs. same period last year", isPositive: true, label: "" }}
          icon={BarChart3}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip formatter={(v: any) => [`PKR ${v.toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revenueGrad)" activeDot={{ r: 6, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Restaurants */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Restaurants</h2>
          <div className="space-y-4">
            {topRestaurants.map((r, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{r.revenue}</p>
                  <p className={`text-xs font-medium ${r.growth.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{r.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Reports Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Generated Reports</h2>
          <button className="text-sm font-medium text-green-700 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 font-medium">Report Name</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Generated On</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentReports.map((report, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">{report.type}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{report.generated}</td>
                  <td className="px-6 py-4 text-gray-500">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 24 reports</div>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-700 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">3</button>
            <div className="px-1"><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">5</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
