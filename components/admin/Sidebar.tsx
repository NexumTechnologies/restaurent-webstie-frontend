"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Store,
  ClipboardList,
  FileText,
  TrendingUp,
  Download,
  Cloud,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manage Users", href: "/admin/manage-users", icon: Users },
  { name: "Manage Restaurants", href: "/admin/manage-restaurants", icon: Store },
  { name: "View Orders", href: "/admin/view-orders", icon: ClipboardList },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Demand Prediction", href: "/admin/demand-prediction", icon: TrendingUp },
  { name: "Export Data", href: "/admin/export-data", icon: Download },
  { name: "Backup & Restore", href: "/admin/backup-restore", icon: Cloud },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <span className="text-white font-bold text-xl">F</span>
        </div>
        <span className="text-xl font-bold text-gray-900">FoodFlow</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn("w-5 h-5", isActive ? "text-green-600" : "text-gray-400")}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-4 p-4 bg-green-50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-600">🎧</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Need Help?</p>
              <p className="text-xs text-gray-500">Contact support for any assistance.</p>
            </div>
          </div>
          <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Contact Support
          </button>
        </div>
        <button 
          onClick={() => {
            window.localStorage.removeItem('foodflow_access_token');
            window.localStorage.removeItem('foodflow_user');
            window.location.href = '/login';
          }}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5 text-gray-400" />
          Logout
        </button>
        <div className="mt-4 text-xs text-gray-400 text-center">
          © 2024 FoodFlow. All rights reserved.
        </div>
      </div>
    </aside>
  );
}
