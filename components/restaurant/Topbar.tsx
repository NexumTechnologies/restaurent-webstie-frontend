"use client";

import { useEffect, useState } from "react";
import { Bell, ChevronDown, Menu } from "lucide-react";

export function RestaurantTopbar() {
  const [profile, setProfile] = useState<{ name?: string; restaurantName?: string; restaurantLogoUrl?: string }>({});

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("foodflow_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setProfile({
          name: parsed?.name,
          restaurantName: parsed?.restaurantName,
          restaurantLogoUrl: parsed?.restaurantLogoUrl,
        });
      }
    } catch {
      setProfile({});
    }
  }, []);

  const restaurantName = profile.restaurantName || profile.name || "Burger House";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700 lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">Restaurant Dashboard</h1>
            <p className="text-xs text-slate-500">Operate orders, menu, and reporting from one place.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 shadow-sm transition hover:border-emerald-200 hover:text-emerald-700">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </button>

          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm sm:flex">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-slate-900 text-sm font-semibold text-white">
              {profile.restaurantLogoUrl ? (
                <img src={profile.restaurantLogoUrl} alt="Restaurant logo" className="h-full w-full object-cover" />
              ) : (
                (restaurantName || "B").charAt(0)
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold leading-none text-slate-900">{restaurantName}</p>
              <p className="mt-1 text-xs text-slate-500">{profile.name || "Restaurant Admin"}</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
