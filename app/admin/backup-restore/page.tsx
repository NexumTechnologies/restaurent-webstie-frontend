"use client";

import { Cloud, Download, List, Trash2, UploadCloud, Info } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";

const backupHistory = [
  { name: "Backup_21_May_2024", date: "21 May 2024, 09:30 AM", size: "125.6 MB", records: "24,532", status: "Completed" },
  { name: "Backup_19_May_2024", date: "19 May 2024, 11:45 AM", size: "118.3 MB", records: "24,120", status: "Completed" },
  { name: "Backup_17_May_2024", date: "17 May 2024, 10:20 AM", size: "115.8 MB", records: "23,890", status: "Completed" },
  { name: "Backup_15_May_2024", date: "15 May 2024, 09:15 AM", size: "112.7 MB", records: "23,650", status: "Failed" },
];

export default function BackupRestorePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Backup & Restore</h1>
        <p className="text-gray-500">Manage system backups to protect your data and restore when needed.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Backup</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0">
              <Cloud className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Create a complete backup of your system data including users, orders, restaurants, and settings.</p>
              <p className="text-sm text-gray-500 mt-1">Last Backup: 19 May 2024, 11:45 AM</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors shrink-0">
            <Cloud className="w-5 h-5" />
            Create Backup Now
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Backup History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Backup Name</th>
                <th className="pb-3 font-medium">Date & Time</th>
                <th className="pb-3 font-medium">Size</th>
                <th className="pb-3 font-medium">Records</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {backupHistory.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        <FileIcon />
                      </div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{item.date}</td>
                  <td className="py-4 text-gray-600">{item.size}</td>
                  <td className="py-4 text-gray-600">{item.records}</td>
                  <td className="py-4">
                    <StatusBadge status={item.status as any} />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                        <List className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            View All Backups
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Restore Backup</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-gray-100 rounded-xl bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
              <UploadCloud className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Restore your system data from a previous backup.</p>
              <p className="text-sm text-red-500 mt-1 font-medium">This will replace all current data. Please proceed with caution.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-1 md:w-64">
              <label className="block text-xs font-medium text-gray-700 mb-1">Select Backup File</label>
              <select className="block w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <option>Select a backup to restore</option>
                <option>Backup_21_May_2024</option>
                <option>Backup_19_May_2024</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors shrink-0 mt-5">
              <UploadCloud className="w-5 h-5" />
              Restore Now
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3 text-sm text-gray-600">
          <Info className="w-5 h-5 text-blue-500 shrink-0" />
          Backups are stored securely. We recommend creating regular backups to keep your data safe.
        </div>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
