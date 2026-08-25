"use client";

import { Bell, Calendar } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div>
        {/* Optional title or breadcrumbs could go here */}
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <Calendar className="w-4 h-4" />
          <span>21 May 2024, Tuesday</span>
        </div>
        
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center text-white font-semibold">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 leading-none">Admin</span>
            <span className="text-xs text-gray-500 mt-1">System Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
}
