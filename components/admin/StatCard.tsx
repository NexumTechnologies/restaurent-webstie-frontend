import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  trend,
  icon: Icon,
  iconBgColor = "bg-purple-50",
  iconColor = "text-purple-600",
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", iconBgColor)}>
        <Icon className={cn("w-6 h-6", iconColor)} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        {trend && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
            <span className="text-gray-400">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
