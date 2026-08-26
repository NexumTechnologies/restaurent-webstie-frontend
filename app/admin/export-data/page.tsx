"use client";

import { useState } from "react";
import { Users, Store, ShoppingBag, FileText, CreditCard, Download, Calendar, CheckSquare, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadAdminExport, type AdminExportType } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

const dataTypes: Array<{ id: AdminExportType; name: string; description: string; icon: any; color: string; bg: string }> = [
  { id: "orders", name: "Orders", description: "Export all customer orders and details.", icon: ShoppingBag, color: "text-green-600", bg: "bg-green-50" },
  { id: "users", name: "Users", description: "Export all registered users and details.", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
  { id: "restaurants", name: "Restaurants", description: "Export all restaurants and information.", icon: Store, color: "text-orange-600", bg: "bg-orange-50" },
  { id: "menu", name: "Menu Items", description: "Export all menu items and categories.", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "payments", name: "Payments", description: "Export all payment records from orders.", icon: CreditCard, color: "text-red-600", bg: "bg-red-50" },
];

const formats = [
  { id: "csv", name: "CSV", ext: ".csv file", icon: FileText },
  { id: "excel", name: "Excel", ext: ".xlsx file", icon: FileText },
  { id: "pdf", name: "PDF", ext: ".pdf file", icon: FileText },
];

export default function ExportDataPage() {
  const [selectedData, setSelectedData] = useState<AdminExportType>("orders");
  const [selectedFormat, setSelectedFormat] = useState<string>("csv");
  const { success, error } = useToast();

  async function handleExport() {
    if (selectedFormat !== "csv") {
      error("Format not available", "The backend currently exports CSV files only.");
      return;
    }
    try {
      await downloadAdminExport(selectedData);
      success("Export ready", `${selectedData} CSV downloaded successfully.`);
    } catch (err) {
      error("Export failed", err instanceof Error ? err.message : "Could not export data.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Export Data</h1>
        <p className="text-gray-500">Export system data in your preferred format.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">1. Choose Data to Export</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {dataTypes.map((item) => {
              const isSelected = selectedData === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedData(item.id)}
                  className={cn(
                    "relative rounded-xl border-2 p-4 text-left transition-all",
                    isSelected ? "border-green-600 bg-green-50/10" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="absolute right-3 top-3">
                    {isSelected ? <CheckSquare className="h-5 w-5 text-green-600" /> : <Square className="h-5 w-5 text-gray-300" />}
                  </div>
                  <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-full", item.bg)}>
                    <item.icon className={cn("h-5 w-5", item.color)} />
                  </div>
                  <h3 className="mb-1 font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">2. Select Date Range</h2>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <select className="block w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Last 30 Days</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            <p className="mt-2 text-xs text-gray-500">You can export data for a specific date range.</p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">3. Select Format</h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                {formats.map((format) => {
                  const isSelected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => setSelectedFormat(format.id)}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 transition-all",
                        isSelected ? "border-green-600 bg-green-50/10" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <format.icon className={cn("h-5 w-5", isSelected ? "text-green-600" : "text-gray-400")} />
                      <div className="text-left">
                        <div className={cn("text-sm font-semibold", isSelected ? "text-green-700" : "text-gray-700")}>{format.name}</div>
                        <div className="text-xs text-gray-500">{format.ext}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <button onClick={handleExport} className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition-colors hover:bg-green-800">
                <Download className="h-5 w-5" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">Export History</h2>
        <p className="mb-6 text-sm text-gray-500">View and download your previously exported data.</p>
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-6 text-sm text-gray-500">
          Export history will appear here once generated exports are tracked by the backend.
        </div>
      </div>
    </div>
  );
}
