"use client";

import { useState } from "react";
import { Users, Store, ShoppingBag, FileText, CreditCard, Download, Calendar, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";

const dataTypes = [
  { id: "orders", name: "Orders", description: "Export all customer orders and details.", icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50", border: "border-green-600" },
  { id: "users", name: "Users", description: "Export all registered users and details.", icon: Users, color: "text-purple-600", bg: "bg-purple-50", border: "border-gray-200" },
  { id: "restaurants", name: "Restaurants", description: "Export all restaurants and information.", icon: Store, color: "text-orange-600", bg: "bg-orange-50", border: "border-gray-200" },
  { id: "menu", name: "Menu Items", description: "Export all menu items and categories.", icon: FileText, color: "text-blue-600", bg: "bg-blue-50", border: "border-gray-200" },
  { id: "payments", name: "Payments", description: "Export all payment transactions.", icon: CreditCard, color: "text-red-600", bg: "bg-red-50", border: "border-gray-200" },
];

const formats = [
  { id: "csv", name: "CSV", ext: ".csv file", icon: FileText, selected: true },
  { id: "excel", name: "Excel", ext: ".xlsx file", icon: FileText, selected: false },
  { id: "pdf", name: "PDF", ext: ".pdf file", icon: FileText, selected: false },
];

const exportHistory = [
  { name: "Orders_May_2024", type: "Orders", typeColor: "text-green-600 bg-green-50", dateRange: "01 May 2024 - 21 May 2024", format: "CSV", formatColor: "text-green-600 bg-green-50", exportedOn: "21 May 2024, 10:30 AM" },
  { name: "Users_April_2024", type: "Users", typeColor: "text-purple-600 bg-purple-50", dateRange: "01 Apr 2024 - 30 Apr 2024", format: "Excel", formatColor: "text-green-600 bg-green-50", exportedOn: "30 Apr 2024, 03:15 PM" },
  { name: "Restaurants_Apr_2024", type: "Restaurants", typeColor: "text-orange-600 bg-orange-50", dateRange: "01 Apr 2024 - 30 Apr 2024", format: "CSV", formatColor: "text-green-600 bg-green-50", exportedOn: "30 Apr 2024, 11:05 AM" },
  { name: "Payments_March_2024", type: "Payments", typeColor: "text-red-600 bg-red-50", dateRange: "01 Mar 2024 - 31 Mar 2024", format: "Excel", formatColor: "text-green-600 bg-green-50", exportedOn: "31 Mar 2024, 09:20 AM" },
];

export default function ExportDataPage() {
  const [selectedData, setSelectedData] = useState<string>("orders");
  const [selectedFormat, setSelectedFormat] = useState<string>("csv");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
        <p className="text-gray-500">Export system data in your preferred format.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Choose Data to Export</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dataTypes.map((item) => {
              const isSelected = selectedData === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedData(item.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all",
                    isSelected ? "border-green-600 bg-green-50/10" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="absolute top-3 right-3">
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-3", item.bg)}>
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Select Date Range</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none">
                <option>01 May 2024 - 21 May 2024</option>
                <option>Last 30 Days</option>
                <option>This Year</option>
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-2">You can export data for a specific date range.</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Select Format</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-3">
                {formats.map((format) => {
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all",
                        isSelected ? "border-green-600 bg-green-50/10" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <format.icon className={cn("w-5 h-5", isSelected ? "text-green-600" : "text-gray-400")} />
                      <div className="text-left">
                        <div className={cn("text-sm font-semibold", isSelected ? "text-green-700" : "text-gray-700")}>{format.name}</div>
                        <div className="text-xs text-gray-500">{format.ext}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors">
                <Download className="w-5 h-5" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Export History</h2>
        <p className="text-sm text-gray-500 mb-6">View and download your previously exported data.</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Export Name</th>
                <th className="pb-3 font-medium">Data Type</th>
                <th className="pb-3 font-medium">Date Range</th>
                <th className="pb-3 font-medium">Format</th>
                <th className="pb-3 font-medium">Exported On</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {exportHistory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 font-medium text-gray-900">{item.name}</td>
                  <td className="py-4">
                    <span className={cn("px-2.5 py-1 rounded-md text-xs font-medium", item.typeColor)}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600">{item.dateRange}</td>
                  <td className="py-4">
                    <span className={cn("px-2.5 py-1 rounded-md text-xs font-medium", item.formatColor)}>
                      {item.format}
                    </span>
                  </td>
                  <td className="py-4 text-gray-500">{item.exportedOn}</td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-3 text-sm text-gray-600">
          <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold">i</span>
          </div>
          Exports may contain large amounts of data and might take a few moments to prepare.
        </div>
      </div>
    </div>
  );
}
