"use client";

import { useState } from "react";
import {
  CheckSquare,
  Download,
  FileText,
  Calendar,
  ShoppingBag,
  Users,
  Store,
  CreditCard,
  Square,
} from "lucide-react";
import { cn } from "@/lib/utils";

const dataTypes = [
  { id: "orders", name: "Orders", description: "Export all customer orders and details.", icon: ShoppingBag, color: "text-emerald-700", bg: "bg-emerald-50" },
  { id: "customers", name: "Customers", description: "Export registered customers and contact data.", icon: Users, color: "text-violet-700", bg: "bg-violet-50" },
  { id: "menu", name: "Menu Items", description: "Export menu items, categories, and pricing.", icon: FileText, color: "text-blue-700", bg: "bg-blue-50" },
  { id: "restaurant", name: "Restaurant", description: "Export restaurant profile and operating hours.", icon: Store, color: "text-orange-700", bg: "bg-orange-50" },
  { id: "payments", name: "Payments", description: "Export payment transactions and summaries.", icon: CreditCard, color: "text-rose-700", bg: "bg-rose-50" },
];

const formats = [
  { id: "csv", name: "CSV", ext: ".csv" },
  { id: "excel", name: "Excel", ext: ".xlsx" },
  { id: "pdf", name: "PDF", ext: ".pdf" },
];

const history = [
  { name: "Orders_May_2024", type: "Orders", dateRange: "01 May 2024 - 21 May 2024", format: "CSV", exportedOn: "21 May 2024, 10:30 AM" },
  { name: "Menu_Items_May_2024", type: "Menu Items", dateRange: "01 May 2024 - 21 May 2024", format: "Excel", exportedOn: "21 May 2024, 01:15 PM" },
  { name: "Payments_Apr_2024", type: "Payments", dateRange: "01 Apr 2024 - 30 Apr 2024", format: "PDF", exportedOn: "30 Apr 2024, 03:40 PM" },
];

export default function ExportDataPage() {
  const [selectedData, setSelectedData] = useState("orders");
  const [selectedFormat, setSelectedFormat] = useState("csv");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Export Data</h1>
          <p className="mt-1 text-sm text-slate-500">Export your restaurant data in the format that suits your workflow.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          <Download className="h-4 w-4" />
          Export Now
        </button>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">1. Choose Data to Export</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {dataTypes.map((item) => {
                const selected = selectedData === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedData(item.id)}
                    className={cn(
                      "relative rounded-3xl border p-4 text-left transition hover:-translate-y-0.5",
                      selected ? "border-emerald-600 bg-emerald-50/40 shadow-sm" : "border-slate-200 bg-white hover:border-emerald-200"
                    )}
                  >
                    <div className="absolute right-4 top-4">
                      {selected ? <CheckSquare className="h-5 w-5 text-emerald-600" /> : <Square className="h-5 w-5 text-slate-300" />}
                    </div>
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", item.bg)}>
                      <Icon className={cn("h-5 w-5", item.color)} />
                    </div>
                    <h3 className="mt-4 font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">2. Select Date Range</h2>
              <div className="relative mt-4">
                <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-300">
                  <option>01 May 2024 - 21 May 2024</option>
                  <option>Last 30 Days</option>
                  <option>This Year</option>
                </select>
              </div>
              <p className="mt-2 text-xs text-slate-500">Choose a time period before exporting data.</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900">3. Select Format</h2>
              <div className="mt-4 flex flex-col gap-3 md:flex-row">
                {formats.map((format) => {
                  const selected = selectedFormat === format.id;
                  return (
                    <button
                      key={format.id}
                      onClick={() => setSelectedFormat(format.id)}
                      className={cn(
                        "flex flex-1 items-center gap-3 rounded-3xl border p-4 text-left transition hover:-translate-y-0.5",
                        selected ? "border-emerald-600 bg-emerald-50/40 shadow-sm" : "border-slate-200 bg-white hover:border-emerald-200"
                      )}
                    >
                      <div className={cn("rounded-2xl px-3 py-2 text-sm font-semibold", selected ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600")}>
                        {format.name}
                      </div>
                      <div>
                        <p className={cn("text-sm font-semibold", selected ? "text-emerald-700" : "text-slate-700")}>{format.name}</p>
                        <p className="text-xs text-slate-500">{format.ext}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Export History</h2>
        <p className="mt-1 text-sm text-slate-500">Previously exported files are listed below for quick retrieval.</p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                <th className="pb-3 font-medium">Export Name</th>
                <th className="pb-3 font-medium">Data Type</th>
                <th className="pb-3 font-medium">Date Range</th>
                <th className="pb-3 font-medium">Format</th>
                <th className="pb-3 font-medium">Exported On</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((entry) => (
                <tr key={entry.name}>
                  <td className="py-4 font-medium text-slate-900">{entry.name}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{entry.type}</span>
                  </td>
                  <td className="py-4 text-slate-600">{entry.dateRange}</td>
                  <td className="py-4 text-slate-600">{entry.format}</td>
                  <td className="py-4 text-slate-500">{entry.exportedOn}</td>
                  <td className="py-4 text-right">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700">
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-slate-600">
          Large exports can take a few moments to generate. Keep the tab open until the download begins.
        </div>
      </div>
    </div>
  );
}
