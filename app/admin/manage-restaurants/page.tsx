"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, Clock, Download, Edit2, Eye, MoreHorizontal, Plus, Search, Store, Trash2, X, XCircle, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { RestaurantModal } from "@/components/admin/modals/RestaurantModal";
import { approveAdminRestaurant, deactivateAdminRestaurant, deleteAdminRestaurant, getAdminRestaurants, rejectAdminRestaurant, activateAdminRestaurant, type AdminRestaurant } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";
import { cn } from "@/lib/utils";

const approvalFilters = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
];

const availabilityFilters = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

export default function ManageRestaurantsPage() {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedRestaurant, setSelectedRestaurant] = useState<AdminRestaurant | null>(null);
  const [search, setSearch] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const restaurantsQuery = useQuery({
    queryKey: ["admin-restaurants", search, approvalFilter, availabilityFilter],
    queryFn: () =>
      getAdminRestaurants({
        search: search.trim() || undefined,
        approvalStatus: approvalFilter === "all" ? undefined : approvalFilter,
        isOpen: availabilityFilter === "all" ? undefined : availabilityFilter === "active",
      }),
  });

  const restaurants = restaurantsQuery.data ?? [];

  const stats = useMemo(() => {
    const total = restaurants.length;
    const active = restaurants.filter((restaurant) => restaurant.isOpen).length;
    const pending = restaurants.filter((restaurant) => restaurant.approvalStatus === "pending").length;
    const inactive = total - active;
    return { total, active, pending, inactive };
  }, [restaurants]);

  const actionMutation = useMutation({
    mutationFn: async (input: { action: "approve" | "reject" | "activate" | "deactivate" | "delete"; restaurant: AdminRestaurant; reason?: string }) => {
      switch (input.action) {
        case "approve":
          return approveAdminRestaurant(input.restaurant.id);
        case "reject":
          return rejectAdminRestaurant(input.restaurant.id, input.reason || "Not specified");
        case "activate":
          return activateAdminRestaurant(input.restaurant.id);
        case "deactivate":
          return deactivateAdminRestaurant(input.restaurant.id);
        case "delete":
          return deleteAdminRestaurant(input.restaurant.id);
      }
    },
    onSuccess: (_, input) => {
      const labels = {
        approve: "Restaurant approved",
        reject: "Restaurant rejected",
        activate: "Restaurant activated",
        deactivate: "Restaurant deactivated",
        delete: "Restaurant deleted",
      } as const;
      success(labels[input.action], input.restaurant.name);
      queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (mutationError: Error) => {
      error("Restaurant action failed", mutationError.message);
    },
  });

  function openAddRestaurant() {
    setModalMode("add");
    setSelectedRestaurant(null);
    setIsModalOpen(true);
  }

  function openEditRestaurant(restaurant: AdminRestaurant) {
    setModalMode("edit");
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  }

  function handleAction(action: "approve" | "reject" | "activate" | "deactivate" | "delete", restaurant: AdminRestaurant) {
    if (action === "delete" && !window.confirm(`Delete ${restaurant.name}?`)) return;
    if (action === "reject") {
      const reason = window.prompt(`Why is ${restaurant.name} being rejected?`, "Incomplete details");
      if (!reason) return;
      actionMutation.mutate({ action, restaurant, reason });
      return;
    }
    actionMutation.mutate({ action, restaurant });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Restaurants</h1>
          <p className="text-gray-500">View, approve, and manage all restaurants on the platform.</p>
        </div>
        <button onClick={openAddRestaurant} className="flex items-center gap-2 rounded-xl bg-green-700 px-4 py-2.5 font-medium text-white transition-colors hover:bg-green-800">
          <Plus className="h-5 w-5" />
          Add New Restaurant
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Restaurants" value={stats.total} trend={{ value: "Live from backend", isPositive: true, label: "" }} icon={Store} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Active Restaurants" value={stats.active} trend={{ value: "Currently open", isPositive: true, label: "" }} icon={CheckCircle2} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Pending Approval" value={stats.pending} trend={{ value: "Awaiting review", isPositive: true, label: "" }} icon={Clock} iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
        <StatCard title="Inactive Restaurants" value={stats.inactive} trend={{ value: "Currently closed", isPositive: false, label: "" }} icon={XCircle} iconBgColor="bg-red-50" iconColor="text-red-600" />
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search restaurants, owner, email..."
              className="block w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SelectFilter label="Approval Status" value={approvalFilter} onChange={setApprovalFilter} options={approvalFilters} />
            <SelectFilter label="Availability Status" value={availabilityFilter} onChange={setAvailabilityFilter} options={availabilityFilters} />
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
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Approval Status</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="transition-colors hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xl">
                        {restaurant.logoUrl ? <img src={restaurant.logoUrl} alt={restaurant.name} className="h-full w-full object-cover" /> : restaurant.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{restaurant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.owner?.name ?? "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.owner?.email ?? "N/A"}</td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.owner?.phone ?? "N/A"}</td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(restaurant.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Pill tone={restaurant.approvalStatus === "approved" ? "success" : restaurant.approvalStatus === "rejected" ? "danger" : "warning"} label={restaurant.approvalStatus ?? "pending"} />
                  </td>
                  <td className="px-6 py-4">
                    <Pill tone={restaurant.isOpen ? "success" : "danger"} label={restaurant.isOpen ? "active" : "inactive"} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/manage-restaurants/${restaurant.id}`} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-green-200 hover:bg-green-50 hover:text-green-600">
                        <Eye className="h-4 w-4" />
                      </Link>
                      {restaurant.approvalStatus === "pending" ? (
                        <>
                          <button onClick={() => handleAction("approve", restaurant)} className="rounded-lg border border-green-200 p-1.5 text-green-600 transition-colors hover:bg-green-50">
                            <Check className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleAction("reject", restaurant)} className="rounded-lg border border-red-200 p-1.5 text-red-600 transition-colors hover:bg-red-50">
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : null}
                      <button onClick={() => handleAction(restaurant.isOpen ? "deactivate" : "activate", restaurant)} className={cn("rounded-lg border p-1.5 transition-colors", restaurant.isOpen ? "border-amber-200 text-amber-600 hover:bg-amber-50" : "border-green-200 text-green-600 hover:bg-green-50")}>
                        {restaurant.isOpen ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                      </button>
                      <button onClick={() => openEditRestaurant(restaurant)} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleAction("delete", restaurant)} className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!restaurants.length ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500">
                    {restaurantsQuery.isLoading ? "Loading restaurants..." : "No restaurants match your filters."}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 p-4 text-sm text-gray-500">
          <div>Showing 1 to {restaurants.length} of {restaurants.length} entries</div>
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
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-50">26</button>
            <button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <RestaurantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} initialData={selectedRestaurant} />
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

function Pill({ tone, label }: { tone: "success" | "warning" | "danger"; label: string }) {
  const classes =
    tone === "success"
      ? "bg-green-50 text-green-700"
      : tone === "warning"
        ? "bg-yellow-50 text-yellow-700"
        : "bg-red-50 text-red-700";
  return <span className={cn("rounded-md px-2.5 py-1 text-xs font-medium capitalize", classes)}>{label}</span>;
}

function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
