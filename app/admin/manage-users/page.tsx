"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, ChevronLeft, ChevronRight, Download, Eye, MoreHorizontal, Search, Trash2, Users, Clock, XCircle, ToggleLeft, ToggleRight } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { deleteAdminUser, getAdminUsers, setAdminUserActive, type AdminUser } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

const roleFilters = [
  { id: "all", label: "All Roles" },
  { id: "customer", label: "Customer" },
  { id: "restaurant", label: "Restaurant" },
  { id: "admin", label: "Admin" },
];

const statusFilters = [
  { id: "all", label: "All Status" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

export default function ManageUsersPage() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const usersQuery = useQuery({
    queryKey: ["admin-users", search],
    queryFn: () => getAdminUsers(search.trim() || undefined),
  });

  const users = useMemo(() => {
    const rows = usersQuery.data ?? [];
    return rows.filter((user) => {
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || (statusFilter === "active" ? user.isActive !== false : user.isActive === false);
      return matchesRole && matchesStatus;
    });
  }, [roleFilter, statusFilter, usersQuery.data]);

  const stats = useMemo(() => {
    const total = usersQuery.data?.length ?? 0;
    const active = (usersQuery.data ?? []).filter((user) => user.isActive !== false).length;
    const inactive = total - active;
    const pending = (usersQuery.data ?? []).filter((user) => user.role === "restaurant" && user.isActive !== false).length;
    return { total, active, inactive, pending };
  }, [usersQuery.data]);

  const actionMutation = useMutation({
    mutationFn: async (input: { user: AdminUser; action: "activate" | "deactivate" | "delete" | "role"; role?: string }) => {
      switch (input.action) {
        case "activate":
          return setAdminUserActive(input.user.id, true);
        case "deactivate":
          return setAdminUserActive(input.user.id, false);
        case "delete":
          return deleteAdminUser(input.user.id);
        case "role":
          return changeAdminUserRole(input.user.id, input.role || input.user.role);
      }
    },
    onSuccess: (_, input) => {
      const labels = {
        activate: "User activated",
        deactivate: "User deactivated",
        delete: "User deleted",
        role: "Role updated",
      } as const;
      success(labels[input.action], input.user.name);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (mutationError: Error) => {
      error("User action failed", mutationError.message);
    },
  });

  function handleAction(user: AdminUser, action: "activate" | "deactivate" | "delete") {
    if (action === "delete" && !window.confirm(`Delete ${user.name}?`)) return;
    actionMutation.mutate({ user, action });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-500">View and manage all registered users on the platform.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={stats.total} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Users} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Active Users" value={stats.active} trend={{ value: "Currently active", isPositive: true, label: "" }} icon={CheckCircle2} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Pending Restaurant Users" value={stats.pending} trend={{ value: "Restaurant owners", isPositive: true, label: "" }} icon={Clock} iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
        <StatCard title="Inactive Users" value={stats.inactive} trend={{ value: "Currently inactive", isPositive: false, label: "" }} icon={XCircle} iconBgColor="bg-red-50" iconColor="text-red-600" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users by name, email..."
              className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SelectFilter label="Role" value={roleFilter} onChange={setRoleFilter} options={roleFilters} />
            <SelectFilter label="Status" value={statusFilter} onChange={setStatusFilter} options={statusFilters} />
            <button className="mt-5 flex items-center gap-2 rounded-xl border border-green-600 px-4 py-2.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-50">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-gray-500">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.phone ?? "N/A"}</td>
                  <td className="px-6 py-4">
                    <Pill tone="neutral" label={prettyRole(user.role)} />
                  </td>
                  <td className="px-6 py-4">
                    <Pill tone={user.isActive === false ? "danger" : "success"} label={user.isActive === false ? "inactive" : "active"} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/manage-users/${user.id}`} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-600">
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleAction(user, user.isActive === false ? "activate" : "deactivate")} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-600">
                        {user.isActive === false ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      </button>
                      <button onClick={() => handleAction(user, "delete")} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!users.length ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    {usersQuery.isLoading ? "Loading users..." : "No users match your filters."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 p-4 text-sm text-gray-500">
          <div>Showing 1 to {users.length} of {users.length} entries</div>
          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 font-medium text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">3</button>
            <div className="px-1">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">757</button>
            <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ id: string; label: string }>;
}) {
  return (
    <div className="min-w-36">
      <label className="mb-1 block text-xs font-medium text-gray-500">{label}</label>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="block w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Pill({ tone, label }: { tone: "neutral" | "success" | "danger"; label: string }) {
  const classes =
    tone === "success"
      ? "bg-green-50 text-green-700"
      : tone === "danger"
        ? "bg-red-50 text-red-700"
        : "bg-gray-100 text-gray-700";
  return <span className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${classes}`}>{label}</span>;
}

function prettyRole(role: string) {
  if (role === "restaurant") return "Restaurant Owner";
  return role.charAt(0).toUpperCase() + role.slice(1);
}
