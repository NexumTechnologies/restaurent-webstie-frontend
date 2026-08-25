"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";
import { Camera, Clock3, MapPin, Save, Store, Upload, CheckCircle2, XCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateRestaurantBranding } from "@/lib/api";

type Preview = {
  src: string;
  file?: File;
};

export default function RestaurantProfilePage() {
  const [restaurantName, setRestaurantName] = useState("Burger House");
  const [logoPreview, setLogoPreview] = useState<Preview>({ src: "" });
  const [coverPreview, setCoverPreview] = useState<Preview>({ src: "" });
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [status, setStatus] = useState("Open");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("foodflow_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setRestaurantName(parsed?.restaurantName || parsed?.name || "Burger House");
        if (parsed?.restaurantLogoUrl) setLogoPreview({ src: parsed.restaurantLogoUrl });
      }
    } catch {
      setRestaurantName("Burger House");
    }
  }, []);

  const uploadMutation = useMutation({
    mutationFn: updateRestaurantBranding,
    onSuccess: (updatedUser) => {
      const stored = window.localStorage.getItem("foodflow_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          window.localStorage.setItem(
            "foodflow_user",
            JSON.stringify({
              ...parsed,
              restaurantLogoUrl: updatedUser.logoUrl || parsed.restaurantLogoUrl,
              restaurantCoverUrl: updatedUser.coverUrl || parsed.restaurantCoverUrl,
              restaurantName: updatedUser.name || parsed.restaurantName || parsed.name,
            })
          );
        } catch {
          // ignore storage parse errors
        }
      }

      setUploadMessage("Branding uploaded successfully.");
      setUploadError("");
    },
    onError: (error) => {
      setUploadError(error.message);
      setUploadMessage("");
    },
  });

  const canUpload = useMemo(
    () => Boolean(logoPreview.file || coverPreview.file),
    [coverPreview.file, logoPreview.file]
  );

  async function handleUpload() {
    const formData = new FormData();
    if (logoPreview.file) formData.append("logo", logoPreview.file);
    if (coverPreview.file) formData.append("cover", coverPreview.file);
    uploadMutation.mutate(formData);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Restaurant Profile</h1>
        <p className="mt-1 text-sm text-slate-500">Keep your restaurant information, branding, and timing accurate.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">1. Cover Image</h2>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">16:9 recommended</span>
          </div>

          <div className="mt-4 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100">
            {coverPreview.src ? (
              <img src={coverPreview.src} alt="Restaurant cover preview" className="h-[220px] w-full object-cover" />
            ) : (
              <div className="flex min-h-[220px] items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.35),_transparent_38%),linear-gradient(135deg,#0f172a_0%,#1f2937_32%,#14532d_100%)] p-6 text-center text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-100/70">FoodFlow restaurant cover</p>
                  <h3 className="mt-3 text-3xl font-semibold">{restaurantName}</h3>
                  <p className="mt-2 max-w-xl text-sm text-white/75">Upload a polished hero image for your restaurant profile.</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <FileButton
              label="Replace Cover Image"
              onChange={(file) => setCoverPreview({ src: URL.createObjectURL(file), file })}
              accept="image/*"
              icon={Upload}
            />
            <FileButton
              label="Upload Logo"
              onChange={(file) => setLogoPreview({ src: URL.createObjectURL(file), file })}
              accept="image/*"
              icon={Camera}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">2. Logo</h2>
          <div className="mt-4 flex flex-col items-center rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
              {logoPreview.src ? (
                <img src={logoPreview.src} alt="Restaurant logo preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-5xl font-bold text-emerald-700">BH</span>
              )}
            </div>
            <div className="mt-4 text-sm text-slate-600">
              Upload a logo to make the profile and sidebar feel branded.
            </div>
            <p className="mt-2 text-xs text-slate-500">JPG, PNG, or WEBP. Max size 2MB.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">3. Basic Information</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Restaurant Name" defaultValue={restaurantName} icon={Store} />
            <Field
              label="Description"
              as="textarea"
              defaultValue="Burger House serves delicious burgers made with fresh ingredients. We focus on quality, taste, and fast service."
            />
            <Field label="Email Address" defaultValue="info@burgerhouse.com" />
            <Field label="Contact Number" defaultValue="+92 300 1234567" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">4. Location & Timing</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Address" as="textarea" defaultValue="123 Main Street, Gulberg, Lahore, Punjab, Pakistan" icon={MapPin} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Opening Time" defaultValue="10:00 AM" icon={Clock3} />
              <Field label="Closing Time" defaultValue="11:00 PM" icon={Clock3} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Availability Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300">
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button
            onClick={handleUpload}
            disabled={!canUpload || uploadMutation.isPending}
            className="inline-flex items-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save className="h-4 w-4" />
            {uploadMutation.isPending ? "Uploading..." : "Save Changes"}
          </button>

          <div className="flex items-center gap-3 text-sm">
            <StatusChip tone={status === "Open" ? "success" : "danger"} label={status === "Open" ? "Restaurant is open" : "Restaurant is closed"} icon={status === "Open" ? CheckCircle2 : XCircle} />
          </div>
        </div>

        {uploadMessage ? <p className="mt-4 text-sm font-medium text-emerald-700">{uploadMessage}</p> : null}
        {uploadError ? <p className="mt-4 text-sm font-medium text-rose-600">{uploadError}</p> : null}
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  icon: Icon,
  as = "input",
}: {
  label: string;
  defaultValue?: string;
  icon?: ComponentType<{ className?: string }>;
  as?: "input" | "textarea";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon ? <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /> : null}
        {as === "textarea" ? (
          <textarea rows={4} defaultValue={defaultValue} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300" />
        ) : (
          <input defaultValue={defaultValue} className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300 ${Icon ? "pl-10" : ""}`} />
        )}
      </div>
    </div>
  );
}

function FileButton({
  label,
  onChange,
  accept,
  icon: Icon,
}: {
  label: string;
  onChange: (file: File) => void;
  accept: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700">
      <Icon className="h-4 w-4" />
      {label}
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onChange(file);
        }}
      />
    </label>
  );
}

function StatusChip({
  tone,
  label,
  icon: Icon,
}: {
  tone: "success" | "danger";
  label: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${tone === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
  );
}
