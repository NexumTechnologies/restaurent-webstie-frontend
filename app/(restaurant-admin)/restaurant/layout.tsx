import { RestaurantSidebar } from "@/components/restaurant/Sidebar";
import { RestaurantTopbar } from "@/components/restaurant/Topbar";

export default function RestaurantAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <RestaurantSidebar />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <RestaurantTopbar />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
