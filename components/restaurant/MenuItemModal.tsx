"use client";

import { useEffect, useMemo, useState } from "react";
import type { ComponentType, FormEvent } from "react";
import { Image as ImageIcon, Upload, X, Sparkles } from "lucide-react";
import { createRestaurantMenuItem, updateRestaurantMenuItem, type RestaurantCategory, type RestaurantMenuItem } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type MenuItemDraft = {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  isAvailable: boolean;
};

const emptyDraft: MenuItemDraft = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  isAvailable: true,
};

export function MenuItemModal({
  open,
  mode,
  item,
  categories,
  onClose,
  onSaved,
}: {
  open: boolean;
  mode: "add" | "edit";
  item: RestaurantMenuItem | null;
  categories: RestaurantCategory[];
  onClose: () => void;
  onSaved: (saved: RestaurantMenuItem) => void;
}) {
  const [draft, setDraft] = useState<MenuItemDraft>(emptyDraft);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && item) {
      setDraft({
        name: item.name ?? "",
        description: item.description ?? "",
        price: String(item.price ?? ""),
        categoryId: item.categoryId ?? item.Category?.id ?? "",
        isAvailable: Boolean(item.isAvailable),
      });
      setPreview(item.imageUrl || "");
    } else {
      setDraft(emptyDraft);
      setPreview("");
      setFile(null);
    }
  }, [item, mode, open]);

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === draft.categoryId),
    [categories, draft.categoryId]
  );

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", draft.name);
      formData.append("description", draft.description);
      formData.append("price", draft.price);
      formData.append("categoryId", draft.categoryId);
      formData.append("isAvailable", String(draft.isAvailable));
      if (file) {
        formData.append("image", file);
      }

      if (mode === "edit" && item) {
        return updateRestaurantMenuItem(item.id, formData);
      }

      return createRestaurantMenuItem(formData);
    },
    onSuccess: (saved) => {
      onSaved(saved);
      onClose();
    },
  });

  if (!open) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{mode === "add" ? "Add New Item" : "Edit Item"}</h2>
            <p className="mt-1 text-sm text-slate-500">Create a polished menu entry with pricing, category, and image.</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[calc(90vh-96px)] overflow-y-auto p-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <Field label="Item Name" value={draft.name} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} placeholder="Zinger Burger" />
              <Field label="Description" value={draft.description} onChange={(value) => setDraft((current) => ({ ...current, description: value }))} as="textarea" placeholder="Describe the item" />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price (PKR)" value={draft.price} onChange={(value) => setDraft((current) => ({ ...current, price: value }))} placeholder="595" />
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
                  <select
                    value={draft.categoryId}
                    onChange={(event) => setDraft((current) => ({ ...current, categoryId: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <label className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Available for ordering</p>
                    <p className="text-xs text-slate-500">Toggle this if the item should show in the public menu.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDraft((current) => ({ ...current, isAvailable: !current.isAvailable }))}
                    className={`relative inline-flex h-9 w-16 items-center rounded-full transition ${draft.isAvailable ? "bg-emerald-600" : "bg-slate-300"}`}
                  >
                    <span className={`inline-block h-7 w-7 transform rounded-full bg-white transition ${draft.isAvailable ? "translate-x-8" : "translate-x-1"}`} />
                  </button>
                </label>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                    <ImageIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Item Image</p>
                    <p className="text-xs text-slate-500">Upload a photo for the menu card.</p>
                  </div>
                </div>

                <label className="mt-4 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-white px-4 py-6 text-center transition hover:border-emerald-200 hover:bg-emerald-50/40">
                  {preview ? (
                    <img src={preview} alt="Menu item preview" className="h-full max-h-40 w-full rounded-2xl object-cover" />
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                        <Upload className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-slate-900">Click to upload image</p>
                      <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP up to 2MB</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const nextFile = event.target.files?.[0] || null;
                      setFile(nextFile);
                    }}
                  />
                </label>
              </div>

              <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-5 w-5 text-emerald-700" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Category selected</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {selectedCategory ? selectedCategory.name : "No category selected yet."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {mutation.isError ? <p className="mt-4 text-sm font-medium text-rose-600">{mutation.error.message}</p> : null}

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={mutation.isPending} className="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70">
              {mutation.isPending ? "Saving..." : mode === "add" ? "Create Item" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  as = "input",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  as?: "input" | "textarea";
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {as === "textarea" ? (
        <textarea rows={4} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300" />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-emerald-300" />
      )}
    </div>
  );
}
