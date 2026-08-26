"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import type { ComponentType } from "react";
import { ArrowLeft, Calendar, CreditCard, FileText, MapPin, Phone, ShoppingBag, Store, User, Wallet } from "lucide-react";
import { getAdminOrder } from "@/lib/api";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const orderQuery = useQuery({
    queryKey: ["admin-order", params.id],
    queryFn: () => getAdminOrder(params.id),
  });

  const order = orderQuery.data;

  if (orderQuery.isLoading) {
    return <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Loading order...</div>;
  }

  if (!order) {
    return (
      <div className="space-y-4">
        <Link href="/admin/view-orders" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800">
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </Link>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm text-gray-500">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/view-orders" className="rounded-xl border border-gray-200 bg-white p-2 transition-colors hover:bg-gray-50">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
          <p className="text-gray-500">View payment, customer, and fulfillment details.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <h2 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h2>
              </div>
              <StatusBadge status={prettyStatus(order.status) as any} />
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <InfoItem icon={User} label="Customer" value={order.User?.name ?? "N/A"} />
              <InfoItem icon={Phone} label="Phone" value={order.User?.phone ?? "N/A"} />
              <InfoItem icon={Store} label="Restaurant" value={order.Restaurant?.name ?? "N/A"} />
              <InfoItem icon={Calendar} label="Placed" value={formatDate(order.createdAt)} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-green-700" />
              <h3 className="text-lg font-semibold text-gray-900">Ordered Items</h3>
            </div>
            <div className="space-y-3">
              {(order.OrderItems ?? []).map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty {item.quantity} × {formatCurrency(item.unitPrice)}</p>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(item.lineTotal)}</p>
                </div>
              ))}
              {!order.OrderItems?.length ? <div className="text-sm text-gray-500">No line items available.</div> : null}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <SummaryRow label="Subtotal" value={formatCurrency(order.subtotal)} />
              <SummaryRow label="Delivery Fee" value={formatCurrency(order.deliveryFee)} />
              <SummaryRow label="Service Fee" value={formatCurrency(order.serviceFee)} />
              <SummaryRow label="Discount" value={formatCurrency(order.discount)} />
              <div className="border-t border-gray-100 pt-3">
                <SummaryRow label="Total" value={formatCurrency(order.total)} strong />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Delivery & Payment</h3>
            <div className="space-y-3 text-sm">
              <InfoItem icon={Wallet} label="Payment Method" value={prettyValue(order.paymentMethod)} />
              <InfoItem icon={CreditCard} label="Payment Status" value={prettyValue(order.paymentStatus)} />
              <InfoItem icon={MapPin} label="Notes" value={order.notes ?? "No special notes"} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
            <div className="flex flex-col gap-3">
              <Link href="/admin/view-orders" className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Back to all orders
              </Link>
              <button className="rounded-xl bg-green-700 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800">
                Export order record
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3">
      <Icon className="mt-0.5 h-4 w-4 text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={strong ? "font-semibold text-gray-900" : "text-gray-600"}>{label}</span>
      <span className={strong ? "font-semibold text-green-700" : "font-medium text-gray-900"}>{value}</span>
    </div>
  );
}

function formatCurrency(value: string | number) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return String(value);
  return `PKR ${numeric.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function prettyStatus(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function prettyValue(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}
