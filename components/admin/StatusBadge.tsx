import { cn } from "@/lib/utils";

type StatusType = "Delivered" | "On The Way" | "Preparing" | "Pending" | "Cancelled" | "Completed" | "Failed" | "New";

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<StatusType, string> = {
    "Delivered": "bg-green-50 text-green-700",
    "On The Way": "bg-blue-50 text-blue-700",
    "Preparing": "bg-orange-50 text-orange-700",
    "Pending": "bg-yellow-50 text-yellow-700",
    "Cancelled": "bg-red-50 text-red-700",
    "Completed": "bg-green-50 text-green-700",
    "Failed": "bg-red-50 text-red-700",
    "New": "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-md text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
}
