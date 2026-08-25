"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  TrendingUp,
  Download,
  LogOut,
  HelpCircle,
  ChefHat,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/restaurant/dashboard", icon: LayoutDashboard },
  { name: "Restaurant Profile", href: "/restaurant/profile", icon: Store },
  { name: "Menu Items", href: "/restaurant/menu-items", icon: UtensilsCrossed },
  { name: "Orders", href: "/restaurant/orders", icon: ClipboardList },
  { name: "Reports", href: "/restaurant/reports", icon: BarChart3 },
  { name: "Demand Prediction", href: "/restaurant/demand-prediction", icon: TrendingUp },
  { name: "Export Data", href: "/restaurant/export-data", icon: Download },
];

export function RestaurantSidebar() {
  const pathname = usePathname();
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
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#083528] via-[#0b3d2b] to-[#062419] text-white shadow-[0_24px_80px_rgba(5,46,22,0.24)]">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/30">
          <ChefHat className="h-5 w-5 text-emerald-200" />
        </div>
        <div>
          <p className="text-lg font-semibold leading-none">FoodFlow</p>
          <p className="mt-1 text-xs text-emerald-100/70">Restaurant Admin</p>
        </div>
      </div>

      <div className="border-b border-white/10 px-5 py-6 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/10 shadow-lg shadow-black/10">
          {profile.restaurantLogoUrl ? (
            <img src={profile.restaurantLogoUrl} alt="Restaurant logo" className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg font-bold tracking-wide text-white">BH</span>
          )}
        </div>
        <p className="text-base font-semibold">{restaurantName}</p>
        <p className="mt-1 text-xs text-emerald-100/70">Restaurant Admin</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-emerald-500/15 text-white ring-1 ring-emerald-400/20"
                  : "text-emerald-100/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-emerald-200" : "text-emerald-100/60")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
            <div>
              <p className="text-sm font-semibold text-white">Need Help?</p>
              <p className="text-xs text-emerald-100/70">Contact support for assistance.</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            window.localStorage.removeItem("foodflow_access_token");
            window.localStorage.removeItem("foodflow_user");
            window.location.href = "/login";
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-100/80 transition-all hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5 text-emerald-100/60" />
          Logout
        </button>

        <p className="pt-1 text-center text-xs text-emerald-100/45">© 2024 FoodFlow. All rights reserved.</p>
      </div>
    </aside>
  );
}
