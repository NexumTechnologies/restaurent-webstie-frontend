"use client";

import { StatCard } from "@/components/admin/StatCard";
import { PredictionChart } from "@/components/admin/PredictionChart";
import { BarChart3, FileText, Calendar, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const topMenuItems = [
  { name: "Chicken Burger", predicted: 232, change: "+15.4%", isPositive: true, icon: "🍔" },
  { name: "Chicken Pizza", predicted: 198, change: "+10.2%", isPositive: true, icon: "🍕" },
  { name: "French Fries", predicted: 156, change: "+8.7%", isPositive: true, icon: "🍟" },
  { name: "Chicken Biryani", predicted: 132, change: "+7.1%", isPositive: true, icon: "🥘" },
  { name: "Coke (500ml)", predicted: 98, change: "-2.3%", isPositive: false, icon: "🥤" },
];

export default function DemandPredictionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Demand Prediction</h1>
        <p className="text-gray-500">Predict future demand for menu items using historical order data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Predicted Orders (Today)"
          value="1,245"
          trend={{ value: "12.6%", isPositive: true, label: "from yesterday" }}
          icon={BarChart3}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Predicted Revenue"
          value="PKR 248,600"
          trend={{ value: "9.8%", isPositive: true, label: "from yesterday" }}
          icon={FileText}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Top Item (Predicted)"
          value="Chicken Burger"
          trend={{ value: "232 orders", isPositive: true, label: "" }}
          icon={Calendar}
          iconBgColor="bg-orange-50"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Prediction Accuracy"
          value="87%"
          trend={{ value: "Good accuracy", isPositive: true, label: "" }}
          icon={TrendingUp}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="w-full md:w-64">
            <label className="block text-xs font-medium text-gray-500 mb-1">Select Restaurant</label>
            <select className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>All Restaurants</option>
              <option>Burger House</option>
              <option>Pizza Point</option>
            </select>
          </div>
          <div className="w-full md:w-64">
            <label className="block text-xs font-medium text-gray-500 mb-1">Select Date Range</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                <option>18 May 2024 - 24 May 2024</option>
                <option>Next 7 Days</option>
                <option>Next 30 Days</option>
              </select>
            </div>
          </div>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors mt-5 md:mt-0">
          <BarChart3 className="w-5 h-5" />
          Generate Prediction
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Predicted Orders Trend</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-0.5 bg-green-500 rounded-full"></div>
              <span>Predicted Orders</span>
            </div>
          </div>
          <PredictionChart />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Menu Items (Predicted)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="pb-3 font-medium">Menu Item</th>
                  <th className="pb-3 font-medium text-right">Predicted Orders</th>
                  <th className="pb-3 font-medium text-right">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topMenuItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right text-gray-600 font-medium">{item.predicted}</td>
                    <td className="py-4 text-right">
                      <span className={cn("font-medium flex items-center justify-end gap-1", item.isPositive ? "text-green-600" : "text-red-600")}>
                        {item.isPositive ? "↑" : "↓"} {item.change.replace(/[+-]/, '')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 bg-green-50/50 rounded-xl border border-green-100 flex items-center gap-3 text-sm text-gray-600">
        <Info className="w-5 h-5 text-green-600 shrink-0" />
        Prediction is based on historical orders, seasonality, and current trends.
      </div>
    </div>
  );
}
