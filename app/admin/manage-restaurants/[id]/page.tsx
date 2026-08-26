"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star, TrendingUp, ShoppingBag, DollarSign, CheckCircle2, XCircle } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { RestaurantModal } from "@/components/admin/modals/RestaurantModal";
import { activateAdminRestaurant, approveAdminRestaurant, deactivateAdminRestaurant, deleteAdminRestaurant, getAdminRestaurant, rejectAdminRestaurant, type AdminRestaurant } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const restaurantQuery = useQuery({
    queryKey: ["admin-restaurant", params.id],
    queryFn: () => getAdminRestaurant(params.id),
  });

  const restaurant = restaurantQuery.data;

  const actionMutation = useMutation({
    mutationFn: async (input: { action: "approve" | "reject" | "activate" | "deactivate" | "delete"; reason?: string }) => {
      switch (input.action) {
        case "approve":
          return approveAdminRestaurant(params.id);
        case "reject":
          return rejectAdminRestaurant(params.id, input.reason || "Not specified");
        case "activate":
          return activateAdminRestaurant(params.id);
        case "deactivate":
          return deactivateAdminRestaurant(params.id);
        case "delete":
          return deleteAdminRestaurant(params.id);
      }
    },
    onSuccess: (_, input) => {
      const messages = {
        approve: "Restaurant approved",
        reject: "Restaurant rejected",
        activate: "Restaurant activated",
        deactivate: "Restaurant deactivated",
        delete: "Restaurant deleted",
      } as const;
      success(messages[input.action], restaurant?.name ?? "Restaurant");
      queryClient.invalidateQueries({ queryKey: ["admin-restaurant", params.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (mutationError: Error) => error("Restaurant action failed", mutationError.message),
  });

  if (restaurantQuery.isLoading) {
    return <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Loading restaurant...</div>;
  }

  if (!restaurant) {
    return (
      <div className="space-y-4">
        <Link href="/admin/manage-restaurants" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800">
          <ArrowLeft className="h-4 w-4" />
          Back to restaurants
        </Link>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Restaurant not found.</div>
      </div>
    );
  }

  const owner = restaurant.owner;
  const isOpen = restaurant.isOpen !== false;
  const approval = restaurant.approvalStatus ?? "pending";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/manage-restaurants" className="rounded-xl border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Details</h1>
          <p className="text-gray-500">View detailed information and performance metrics.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="relative h-56 w-full bg-gray-200">
          {restaurant.coverUrl ? <img src={restaurant.coverUrl} alt={restaurant.name} className="h-full w-full object-cover" /> : null}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative px-8 pb-8">
          <div className="mt-[-3rem] flex flex-col gap-6 md:flex-row md:items-end">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
              {restaurant.logoUrl ? <img src={restaurant.logoUrl} alt={restaurant.name} className="h-full w-full object-cover" /> : <span className="text-4xl font-bold text-green-700">{restaurant.name.charAt(0)}</span>}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
                <Pill tone={approval === "approved" ? "success" : approval === "rejected" ? "danger" : "warning"} label={approval} />
                <Pill tone={isOpen ? "success" : "danger"} label={isOpen ? "active" : "inactive"} />
              </div>
              <p className="text-gray-500">{restaurant.description ?? "No description available."}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => actionMutation.mutate({ action: isOpen ? "deactivate" : "activate" })} className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                {isOpen ? "Deactivate" : "Activate"}
              </button>
              <button onClick={() => setIsModalOpen(true)} className="rounded-xl bg-green-700 px-4 py-2 font-medium text-white transition-colors hover:bg-green-800">
                Edit Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 border-t border-gray-100 py-6 pt-6 md:grid-cols-2 lg:grid-cols-4">
            <InfoBlock icon={MapPin} label="Location" value={`${restaurant.address ?? "N/A"}${restaurant.city ? `, ${restaurant.city}` : ""}`} />
            <InfoBlock icon={Clock} label="Timings" value={`${fmtTime(restaurant.openingTime)} - ${fmtTime(restaurant.closingTime)}`} />
            <InfoBlock icon={Phone} label="Contact" value={owner?.phone ?? "N/A"} />
            <InfoBlock icon={Mail} label="Email" value={owner?.email ?? "N/A"} />
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 pt-5">
            {approval === "pending" ? (
              <>
                <button onClick={() => actionMutation.mutate({ action: "approve" })} className="rounded-xl bg-green-700 px-4 py-2 font-medium text-white transition-colors hover:bg-green-800">
                  Approve
                </button>
                <button
                  onClick={() => {
                    const reason = window.prompt(`Why is ${restaurant.name} being rejected?`, "Incomplete details");
                    if (reason) actionMutation.mutate({ action: "reject", reason });
                  }}
                  className="rounded-xl border border-red-200 bg-white px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Reject
                </button>
              </>
            ) : null}
            <button onClick={() => actionMutation.mutate({ action: "delete" })} className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600">
              Delete Restaurant
            </button>
          </div>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-lg font-bold text-gray-900">Performance Metrics</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value="0" trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Total Revenue" value="PKR 0" trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={DollarSign} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Average Rating" value="0.0" trend={{ value: "No reviews yet", isPositive: true, label: "" }} icon={Star} iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
        <StatCard title="Growth" value="0%" trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={TrendingUp} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
      </div>

      <RestaurantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode="edit" initialData={restaurant as AdminRestaurant} />
    </div>
  );
}

function InfoBlock({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 text-gray-400" />
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{value}</p>
      </div>
    </div>
  );
}

function Pill({ tone, label }: { tone: "success" | "warning" | "danger"; label: string }) {
  const classes = tone === "success" ? "bg-green-50 text-green-700" : tone === "warning" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700";
  return <span className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${classes}`}>{label}</span>;
}

function fmtTime(value?: string | null) {
  if (!value) return "N/A";
  return value.length <= 5 ? value : value;
}
