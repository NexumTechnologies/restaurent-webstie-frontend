"use client";

import type { ComponentType, FormEvent } from "react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { X, Upload, Image as ImageIcon, Sparkles } from "lucide-react";
import { createRestaurant } from "@/lib/api";

interface RestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: any;
}

type FormState = {
  restaurantName: string;
  ownerName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  openingTime: string;
  closingTime: string;
};

const initialState: FormState = {
  restaurantName: "",
  ownerName: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  city: "",
  description: "",
  openingTime: "",
  closingTime: "",
};

export function RestaurantModal({ isOpen, onClose, mode, initialData }: RestaurantModalProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setMessage("");
    if (mode === "edit" && initialData) {
      setForm({
        restaurantName: initialData.name ?? "",
        ownerName: initialData.owner ?? "",
        email: initialData.email ?? "",
        password: "",
        phone: initialData.phone ?? "",
        address: initialData.location ?? "",
        city: initialData.city ?? "",
        description: initialData.description ?? "",
        openingTime: initialData.openingTime ?? "",
        closingTime: initialData.closingTime ?? "",
      });
    } else {
      setForm(initialState);
    }
  }, [initialData, isOpen, mode]);

  const createMutation = useMutation({
    mutationFn: createRestaurant,
    onSuccess: (result) => {
      const createdName = result.restaurant.name;
      setMessage(`Created ${createdName} successfully.`);
      window.localStorage.setItem(
        "foodflow_last_restaurant_credentials",
        JSON.stringify({
          restaurantName: createdName,
          email: result.credentials.email,
        })
      );
      setTimeout(() => onClose(), 650);
    },
  });

  if (!isOpen) return null;

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (mode === "edit") {
      onClose();
      return;
    }

    createMutation.mutate({
      name: form.restaurantName,
      ownerName: form.ownerName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      address: form.address,
      city: form.city,
      description: form.description,
      openingTime: form.openingTime,
      closingTime: form.closingTime,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {mode === "add" ? "Add New Restaurant" : "Edit Restaurant"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "add"
                ? "Create the restaurant account and assign its login credentials."
                : "Update restaurant profile information."}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-96px)] overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-5">
              <SectionTitle title="Basic Information" />
              <Field label="Restaurant Name" value={form.restaurantName} onChange={(value) => updateField("restaurantName", value)} placeholder="e.g. Burger House" />
              <Field label="Owner Name" value={form.ownerName} onChange={(value) => updateField("ownerName", value)} placeholder="Restaurant owner full name" />
              <Field label="Description" value={form.description} onChange={(value) => updateField("description", value)} as="textarea" placeholder="Short description of the restaurant" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Opening Time" value={form.openingTime} onChange={(value) => updateField("openingTime", value)} type="time" />
                <Field label="Closing Time" value={form.closingTime} onChange={(value) => updateField("closingTime", value)} type="time" />
              </div>
              <Field label="City" value={form.city} onChange={(value) => updateField("city", value)} placeholder="Lahore" />
              <Field label="Address" value={form.address} onChange={(value) => updateField("address", value)} as="textarea" placeholder="Full restaurant address" />
            </div>

            <div className="space-y-5">
              <SectionTitle title="Account Details" />
              <Field label="Email Address" value={form.email} onChange={(value) => updateField("email", value)} type="email" placeholder="restaurant@example.com" />
              <Field label="Password" value={form.password} onChange={(value) => updateField("password", value)} type="password" placeholder="Create a password for the owner" />
              <Field label="Contact Number" value={form.phone} onChange={(value) => updateField("phone", value)} type="tel" placeholder="+92 300 1234567" />

              <div className="grid gap-4 sm:grid-cols-2">
                <MediaUploadCard title="Logo Image" subtitle="PNG, JPG up to 2MB" icon={ImageIcon} />
                <MediaUploadCard title="Cover Image" subtitle="16:9 aspect ratio recommended" icon={Upload} />
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">What happens next?</p>
                    <p className="mt-1 text-sm text-slate-600">
                      The backend creates the owner account, stores the restaurant record, and keeps the login ready for the owner&apos;s first sign-in.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {message ? (
            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              {message}
            </div>
          ) : null}

          {createMutation.isError ? (
            <div className="mt-5 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {createMutation.error.message}
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createMutation.isPending ? "Creating..." : mode === "add" ? "Create Restaurant" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="border-b border-slate-100 pb-2 text-sm font-semibold text-slate-900">
      {title}
    </h3>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  as = "input",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {as === "textarea" ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
        />
      )}
    </div>
  );
}

function MediaUploadCard({
  title,
  subtitle,
  icon: Icon,
}: {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center transition hover:border-emerald-200 hover:bg-emerald-50/40">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}
