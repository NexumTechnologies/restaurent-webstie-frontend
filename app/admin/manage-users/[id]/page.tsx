"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Mail, Phone, Calendar, ShoppingBag, DollarSign, Star, TrendingUp, Save, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import type { ComponentType } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminUser, updateAdminUser, changeAdminUserRole, setAdminUserActive, deleteAdminUser, type AdminUser } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  role: "customer",
};

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const [form, setForm] = useState<FormState>(initialForm);

  const userQuery = useQuery({
    queryKey: ["admin-user", params.id],
    queryFn: () => getAdminUser(params.id),
  });

  const user = userQuery.data;

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      address: user.address ?? "",
      role: user.role ?? "customer",
    });
  }, [user]);

  const saveMutation = useMutation({
    mutationFn: async () => updateAdminUser(params.id, form),
    onSuccess: () => {
      success("User updated", form.name);
      queryClient.invalidateQueries({ queryKey: ["admin-user", params.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard"] });
    },
    onError: (mutationError: Error) => error("User update failed", mutationError.message),
  });

  const toggleMutation = useMutation({
    mutationFn: async () => setAdminUserActive(params.id, user?.isActive === false),
    onSuccess: () => {
      success(user?.isActive === false ? "User activated" : "User deactivated", user?.name ?? "User");
      queryClient.invalidateQueries({ queryKey: ["admin-user", params.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (mutationError: Error) => error("Status update failed", mutationError.message),
  });

  const roleMutation = useMutation({
    mutationFn: async (nextRole: string) => changeAdminUserRole(params.id, nextRole),
    onSuccess: () => {
      success("Role updated", form.role);
      queryClient.invalidateQueries({ queryKey: ["admin-user", params.id] });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (mutationError: Error) => error("Role update failed", mutationError.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => deleteAdminUser(params.id),
    onSuccess: () => {
      success("User deleted", user?.name ?? "User");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (mutationError: Error) => error("Delete failed", mutationError.message),
  });

  if (userQuery.isLoading) {
    return <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Loading user...</div>;
  }

  if (!user) {
    return (
      <div className="space-y-4">
        <Link href="/admin/manage-users" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800">
          <ArrowLeft className="h-4 w-4" />
          Back to users
        </Link>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">User not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/manage-users" className="rounded-xl border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
          <p className="text-gray-500">View and update profile information, role, and access.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-3xl font-bold text-purple-700">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <Pill label={prettyRole(user.role)} tone="neutral" />
              <Pill label={user.isActive === false ? "inactive" : "active"} tone={user.isActive === false ? "danger" : "success"} />
            </div>
            <p className="text-sm text-gray-500">Member profile managed by the admin panel.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => toggleMutation.mutate()} className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
              {user.isActive === false ? "Activate Account" : "Deactivate Account"}
            </button>
            <button onClick={() => deleteMutation.mutate()} className="rounded-xl bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700">
              Delete User
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-gray-100 pt-6 md:grid-cols-2">
          <Field label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
          <Field label="Email" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} type="email" />
          <Field label="Phone" value={form.phone} onChange={(value) => setForm((current) => ({ ...current, phone: value }))} />
          <Field label="Address" value={form.address} onChange={(value) => setForm((current) => ({ ...current, address: value }))} />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
            <select value={form.role} onChange={(event) => {
              const nextRole = event.target.value;
              setForm((current) => ({ ...current, role: nextRole }));
              roleMutation.mutate(nextRole);
            }} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="customer">Customer</option>
              <option value="restaurant">Restaurant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <div className="flex items-center gap-3 text-sm">
            <InfoItem icon={Mail} label="Email" value={user.email} />
            <InfoItem icon={Phone} label="Phone" value={user.phone ?? "N/A"} />
            <InfoItem icon={Calendar} label="Joined" value={formatDate(user.createdAt)} />
          </div>
          <button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70">
            <Save className="h-4 w-4" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Orders" value={0} trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={ShoppingBag} iconBgColor="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Total Spent" value="PKR 0" trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={DollarSign} iconBgColor="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Avg. Order Value" value="PKR 0" trend={{ value: "Coming soon", isPositive: true, label: "" }} icon={TrendingUp} iconBgColor="bg-purple-50" iconColor="text-purple-600" />
        <StatCard title="Favorite Restaurant" value="N/A" trend={{ value: "Data not exposed yet", isPositive: true, label: "" }} icon={Star} iconBgColor="bg-yellow-50" iconColor="text-yellow-600" />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} type={type} className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-gray-900">{value}</div>
    </div>
  );
}

function Pill({ tone, label }: { tone: "neutral" | "success" | "danger"; label: string }) {
  const classes = tone === "success" ? "bg-green-50 text-green-700" : tone === "danger" ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-700";
  return <span className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize ${classes}`}>{label}</span>;
}

function prettyRole(role: string) {
  if (role === "restaurant") return "Restaurant Owner";
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatDate(value?: string) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
