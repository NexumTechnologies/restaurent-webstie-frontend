import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowLeft, CalendarDays, CreditCard, MapPin, Package2, Phone, Sparkles, Truck } from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getRestaurantOrderById } from "../order-data";

export default function RestaurantOrderDetailsPage({ params }: { params: { id: string } }) {
  const order = getRestaurantOrderById(params.id);

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <Link href="/restaurant/orders" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800">
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">Order not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            We could not find an order matching <span className="font-semibold text-slate-700">{params.id}</span>. The route is working, but the id does not match one of the current sample records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link href="/restaurant/orders" className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800">
            <ArrowLeft className="h-4 w-4" />
            Back to orders
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-slate-500">Order details, status history, and customer contact information.</p>
        </div>
        <div className="inline-flex items-center gap-3">
          <StatusBadge status={order.status as any} />
          <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            {order.total} total
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Items in this order</h2>
              <Package2 className="h-5 w-5 text-emerald-700" />
            </div>

            <div className="mt-4 space-y-3">
              {order.OrderItems?.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.quantity} item(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">PKR {item.lineTotal}</p>
                    <p className="text-xs text-slate-500">Unit: PKR {item.unitPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Order Timeline</h2>
              <Sparkles className="h-5 w-5 text-emerald-700" />
            </div>

            <div className="mt-4 space-y-4">
              {[
                { title: "Order placed", text: "Customer placed the order", time: "10:30 AM", done: true },
                { title: "Preparing", text: "Kitchen is preparing the meal", time: "10:38 AM", done: order.status !== "New" },
                { title: "Out for delivery", text: "Courier picked up the order", time: "Pending", done: order.status === "On The Way" || order.status === "Delivered" },
                { title: "Delivered", text: "Order delivered to customer", time: "Pending", done: order.status === "Delivered" },
              ].map((entry) => (
                <div key={entry.title} className="flex items-start gap-4">
                  <div className={`mt-1 h-4 w-4 rounded-full ring-4 ring-white ${entry.done ? "bg-emerald-600" : "bg-slate-300"}`} />
                  <div className="flex-1 rounded-2xl border border-slate-100 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">{entry.title}</p>
                      <span className="text-xs text-slate-500">{entry.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Customer Info</h2>
            <div className="mt-4 space-y-4">
              <InfoRow label="Customer" value={order.customer} />
              <InfoRow label="Phone" value={order.User?.phone || "+92 300 1234567"} icon={Phone} />
              <InfoRow label="Email" value={order.User?.email || "customer@example.com"} />
              <InfoRow label="Placed On" value={new Date(order.createdAt).toLocaleString()} icon={CalendarDays} />
              <InfoRow label="Payment" value={order.paymentMethod} icon={CreditCard} />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Delivery & Billing</h2>
            <div className="mt-4 space-y-4">
              <InfoRow label="Delivery Address" value="123 Main Street, Gulberg, Lahore" icon={MapPin} />
              <InfoRow label="Delivery Fee" value={`PKR ${order.deliveryFee}`} />
              <InfoRow label="Service Fee" value={`PKR ${order.serviceFee}`} />
              <InfoRow label="Discount" value={`PKR ${order.discount}`} />
              <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-emerald-700">Grand Total</p>
                <p className="text-2xl font-semibold text-slate-900">PKR {order.total}</p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <ActionButton label="Mark Preparing" />
              <ActionButton label="Mark Delivered" />
              <ActionButton label="Call Customer" />
              <ActionButton label="Print Receipt" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        {Icon ? <Icon className="h-4 w-4 text-emerald-700" /> : null}
        {label}
      </div>
      <div className="max-w-[60%] text-right text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-700">
      {label}
    </button>
  );
}
