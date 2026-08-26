"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Cloud, Download, List, Trash2, UploadCloud, Info, FileText, FileUp } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { createAdminBackup, restoreAdminBackup } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

const backupHistory = [
  { name: "Backup_21_May_2024", date: "21 May 2024, 09:30 AM", size: "125.6 MB", records: "24,532", status: "Completed" },
  { name: "Backup_19_May_2024", date: "19 May 2024, 11:45 AM", size: "118.3 MB", records: "24,120", status: "Completed" },
  { name: "Backup_17_May_2024", date: "17 May 2024, 10:20 AM", size: "115.8 MB", records: "23,890", status: "Completed" },
  { name: "Backup_15_May_2024", date: "15 May 2024, 09:15 AM", size: "112.7 MB", records: "23,650", status: "Failed" },
];

export default function BackupRestorePage() {
  const [restoreFileName, setRestoreFileName] = useState("");
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);
  const [restorePayload, setRestorePayload] = useState<{
    users: unknown[];
    restaurants: unknown[];
    orders: unknown[];
    orderItems?: unknown[];
    categories?: unknown[];
    addresses?: unknown[];
    menuItems: unknown[];
  } | null>(null);
  const { success, error, info } = useToast();

  const backupMutation = useMutation({
    mutationFn: createAdminBackup,
    onSuccess: (data) => {
      const payload = JSON.stringify(data, null, 2);
      const blob = new Blob([payload], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `foodflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setRestoreStatus("Backup file downloaded successfully.");
      success("Backup created", "A JSON snapshot has been downloaded.");
    },
    onError: (mutationError: Error) => error("Backup failed", mutationError.message),
  });

  const restoreMutation = useMutation({
    mutationFn: restoreAdminBackup,
    onSuccess: () => {
      success("Backup restored", "The selected backup was restored successfully.");
      setRestoreFileName("");
      setRestorePayload(null);
      setRestoreStatus("Backup restored successfully.");
    },
    onError: (mutationError: Error) => error("Restore failed", mutationError.message),
  });

  async function handleRestore() {
    if (!restorePayload) {
      setRestoreStatus("Upload a valid backup JSON file before restoring.");
      info("Restore not ready", "Upload a backup JSON file first.");
      return;
    }
    setRestoreStatus(null);
    restoreMutation.mutate(restorePayload);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Backup & Restore</h1>
        <p className="text-gray-500">Manage system backups to protect your data and restore when needed.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Create New Backup</h2>
        <div className="flex flex-col gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
              <Cloud className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Create a complete backup of your system data including users, orders, restaurants, and settings.</p>
              <p className="mt-1 text-sm text-gray-500">Last Backup: 19 May 2024, 11:45 AM</p>
            </div>
          </div>
          <button type="button" onClick={() => backupMutation.mutate()} className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-3 font-medium text-white transition-colors hover:bg-green-800">
            <Cloud className="h-5 w-5" />
            {backupMutation.isPending ? "Creating..." : "Create Backup Now"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">Backup History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
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
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.status === "Completed" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
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
                      <button className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600">
                        <List className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg border border-gray-200 p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Restore Backup</h2>
        <div className="flex flex-col gap-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <UploadCloud className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Restore your system data from a previous backup.</p>
              <p className="mt-1 font-medium text-red-500">This will replace current data. Proceed with caution.</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-center">
            <div className="w-full md:w-72">
              <label className="mb-1 block text-xs font-medium text-gray-700">Backup JSON File</label>
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-purple-300 hover:text-purple-700">
                  <FileUp className="h-4 w-4" />
                  {restoreFileName || "Choose a backup file"}
                <input
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setRestoreFileName(file.name);
                    setRestoreStatus(`Selected ${file.name}.`);
                    try {
                      const text = await file.text();
                      const parsed = JSON.parse(text);
                      setRestorePayload(parsed?.data ?? parsed);
                    } catch {
                      setRestorePayload(null);
                      setRestoreStatus("The selected file is not a valid backup JSON file.");
                      error("Invalid file", "Please upload a valid backup JSON file.");
                    }
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                {restorePayload ? "Backup payload is ready to restore." : "No backup file loaded yet."}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRestore}
              disabled={restoreMutation.isPending || !restorePayload}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70 md:mt-0"
            >
              <UploadCloud className="h-5 w-5" />
              {restoreMutation.isPending ? "Restoring..." : "Restore Now"}
            </button>
          </div>
        </div>

        {restoreStatus && (
          <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            {restoreStatus}
          </div>
        )}

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-gray-600">
          <Info className="h-5 w-5 shrink-0 text-blue-500" />
          Backups are stored securely. We recommend creating regular backups to keep your data safe.
        </div>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
