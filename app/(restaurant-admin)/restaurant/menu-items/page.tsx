"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Filter,
  Plus,
  Search,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Image as ImageIcon,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/admin/StatCard";
import {
  deleteRestaurantMenuItem,
  getRestaurantCategories,
  getRestaurantMenuItems,
  toggleRestaurantMenuItem,
  type RestaurantCategory,
  type RestaurantMenuItem,
} from "@/lib/api";
import { MenuItemModal } from "@/components/restaurant/MenuItemModal";
import { cn } from "@/lib/utils";

const fallbackCategories: RestaurantCategory[] = [
  { id: "burgers", name: "Burgers" },
  { id: "pizza", name: "Pizza" },
  { id: "drinks", name: "Drinks" },
  { id: "sides", name: "Sides" },
  { id: "desserts", name: "Desserts" },
];

const fallbackItems: RestaurantMenuItem[] = [
  {
    id: "sample-1",
    restaurantId: "sample",
    categoryId: "burgers",
    name: "Zinger Burger",
    description: "Crispy zinger fillet with mayo and fresh lettuce",
    imageUrl: "/images/home/dish-zinger-burger.png",
    price: "595",
    isAvailable: true,
    Category: { id: "burgers", name: "Burgers" },
  },
  {
    id: "sample-2",
    restaurantId: "sample",
    categoryId: "pizza",
    name: "Chicken Fajita Pizza",
    description: "Grilled chicken, capsicum, onion and cheese",
    imageUrl: "/images/home/dish-fajita-pizza.png",
    price: "1250",
    isAvailable: true,
    Category: { id: "pizza", name: "Pizza" },
  },
  {
    id: "sample-3",
    restaurantId: "sample",
    categoryId: "drinks",
    name: "Coca Cola",
    description: "Chilled Coca Cola 500ml",
    imageUrl: "/images/home/dish-cold-coffee.png",
    price: "120",
    isAvailable: true,
    Category: { id: "drinks", name: "Drinks" },
  },
  {
    id: "sample-4",
    restaurantId: "sample",
    categoryId: "desserts",
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with chocolate syrup",
    imageUrl: "/images/home/dish-chicken-biryani.png",
    price: "350",
    isAvailable: false,
    Category: { id: "desserts", name: "Desserts" },
  },
];

export default function MenuItemsPage() {
  const [items, setItems] = useState<RestaurantMenuItem[]>(fallbackItems);
  const [categories, setCategories] = useState<RestaurantCategory[]>(fallbackCategories);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedItem, setSelectedItem] = useState<RestaurantMenuItem | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesQuery = useQuery({
    queryKey: ["restaurant-categories"],
    queryFn: getRestaurantCategories,
  });

  const itemsQuery = useQuery({
    queryKey: ["restaurant-menu-items"],
    queryFn: getRestaurantMenuItems,
  });

  useEffect(() => {
    if (categoriesQuery.data?.length) {
      setCategories(categoriesQuery.data);
    }
  }, [categoriesQuery.data]);

  useEffect(() => {
    if (itemsQuery.data?.length) {
      setItems(itemsQuery.data);
      return;
    }
    if (!itemsQuery.isLoading && !itemsQuery.data?.length) {
      setItems(fallbackItems);
    }
  }, [itemsQuery.data, itemsQuery.isLoading]);

  const stats = useMemo(() => {
    const total = items.length;
    const active = items.filter((item) => item.isAvailable).length;
    const inactive = total - active;
    return { total, active, inactive, categories: categories.length };
  }, [categories.length, items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryId = item.categoryId || item.Category?.id || "uncategorized";
      const categoryName = item.Category?.name || "";
      const matchesCategory =
        activeCategory === "all" || activeCategory === categoryId || activeCategory === categoryName;
      const availability =
        availabilityFilter === "all"
          ? true
          : availabilityFilter === "active"
            ? item.isAvailable
            : !item.isAvailable;
      const haystack = `${item.name} ${item.description ?? ""} ${categoryName}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase().trim());
      return matchesCategory && availability && matchesSearch;
    });
  }, [activeCategory, availabilityFilter, items, search]);

  const toggleMutation = useMutation({
    mutationFn: async (item: RestaurantMenuItem) => {
      return toggleRestaurantMenuItem(item.id, { isAvailable: !item.isAvailable });
    },
    onSuccess: (saved) => {
      setItems((current) => current.map((item) => (item.id === saved.id ? saved : item)));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (item: RestaurantMenuItem) => deleteRestaurantMenuItem(item.id),
    onSuccess: (_, item) => {
      setItems((current) => current.filter((menuItem) => menuItem.id !== item.id));
    },
  });

  function openAddModal() {
    setSelectedItem(null);
    setModalMode("add");
    setIsModalOpen(true);
  }

  function openEditModal(item: RestaurantMenuItem) {
    setSelectedItem(item);
    setModalMode("edit");
    setIsModalOpen(true);
  }

  function handleSaved(saved: RestaurantMenuItem) {
    const normalized: RestaurantMenuItem = {
      ...saved,
      Category:
        saved.Category ||
        categories.find((category) => category.id === saved.categoryId) ||
        selectedCategoryFallback(saved),
    };

    setItems((current) => {
      const exists = current.some((item) => item.id === normalized.id);
      if (exists) {
        return current.map((item) => (item.id === normalized.id ? normalized : item));
      }
      return [normalized, ...current];
    });
  }

  const categoryTabs = useMemo(() => {
    return [
      { id: "all", name: "All Items", count: items.length },
      ...categories.map((category) => ({
        id: category.id,
        name: category.name,
        count: items.filter((item) => (item.categoryId || item.Category?.id) === category.id).length,
      })),
    ];
  }, [categories, items]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Menu Items</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your restaurant menu items, prices, and availability.</p>
        </div>
        <button onClick={openAddModal} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800">
          <Plus className="h-4 w-4" />
          Add New Item
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Items" value={stats.total} trend={{ value: "All menu items", isPositive: true, label: "" }} icon={ImageIcon} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Active Items" value={stats.active} trend={{ value: "Currently available", isPositive: true, label: "" }} icon={ToggleRight} iconBgColor="bg-emerald-50" iconColor="text-emerald-700" />
        <StatCard title="Inactive Items" value={stats.inactive} trend={{ value: "Currently unavailable", isPositive: false, label: "" }} icon={ToggleLeft} iconBgColor="bg-amber-50" iconColor="text-amber-600" />
        <StatCard title="Categories" value={stats.categories} trend={{ value: "Food categories", isPositive: true, label: "" }} icon={Filter} iconBgColor="bg-violet-50" iconColor="text-violet-600" />
      </div>

      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "border-emerald-700 bg-emerald-700 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:text-emerald-700"
                  )}
                >
                  {category.name}
                  <span className={cn("ml-2 text-xs", isActive ? "text-emerald-50" : "text-slate-400")}>({category.count})</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search menu items..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-300 sm:w-72"
              />
            </div>

            <div className="relative">
              <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={availabilityFilter}
                onChange={(event) => setAvailabilityFilter(event.target.value as "all" | "active" | "inactive")}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-emerald-300 sm:w-48"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400">
                <th className="pb-3 font-medium">Item</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price (PKR)</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Available</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredItems.map((item) => {
                const categoryName = item.Category?.name || categories.find((category) => category.id === item.categoryId)?.name || "Uncategorized";
                const isBusy = toggleMutation.isPending || deleteMutation.isPending;
                return (
                  <tr key={item.id} className="transition hover:bg-slate-50/70">
                    <td className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-amber-50">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{categoryName}</span>
                    </td>
                    <td className="py-4 font-medium text-slate-900">{item.price}</td>
                    <td className="py-4">
                      <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", item.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
                        {item.isAvailable ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        disabled={isBusy}
                        onClick={() => toggleMutation.mutate(item)}
                        className="text-emerald-700 transition hover:text-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label={item.isAvailable ? "Disable item" : "Enable item"}
                      >
                        {item.isAvailable ? <ToggleRight className="h-7 w-7" /> : <ToggleLeft className="h-7 w-7 text-slate-300" />}
                      </button>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
                          aria-label="Edit item"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(item)}
                          className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-rose-200 hover:text-rose-700"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500">
          <div>
            Showing 1 to {filteredItems.length} of {filteredItems.length} items
          </div>
          <div className="flex items-center gap-1">
            <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-700 text-white font-semibold">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-slate-600 transition hover:bg-slate-50">2</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-slate-600 transition hover:bg-slate-50">3</button>
            <button className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <MenuItemModal
        open={isModalOpen}
        mode={modalMode}
        item={selectedItem}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSaved={handleSaved}
      />
    </div>
  );
}

function selectedCategoryFallback(item: RestaurantMenuItem) {
  return item.Category || (item.categoryId ? { id: item.categoryId, name: item.categoryId } : null) || null;
}
