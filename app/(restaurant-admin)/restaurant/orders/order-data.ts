import type { RestaurantOrder } from "@/lib/api";

export const restaurantOrders: Array<RestaurantOrder & { customer: string; items: string }> = [
  { id: "ord-1028", orderNumber: "#ORD-1028", customer: "Ali Khan", items: "2 items", amount: "PKR 780", paymentMethod: "Cash on Delivery", paymentStatus: "pending", subtotal: "720", deliveryFee: "60", serviceFee: "0", discount: "0", total: "780", status: "New", time: "10:30 AM", createdAt: "2026-08-25T10:30:00.000Z", User: { id: "1", name: "Ali Khan", phone: "+92 300 1234567", email: "ali@example.com" }, OrderItems: [{ id: "1", name: "Zinger Burger", quantity: 2, unitPrice: "360", lineTotal: "720" }] },
  { id: "ord-1027", orderNumber: "#ORD-1027", customer: "Sara Ahmed", items: "3 items", amount: "PKR 1,250", paymentMethod: "JazzCash", paymentStatus: "paid", subtotal: "1,250", deliveryFee: "0", serviceFee: "0", discount: "0", total: "1,250", status: "Preparing", time: "10:15 AM", createdAt: "2026-08-25T10:15:00.000Z", User: { id: "2", name: "Sara Ahmed", phone: "+92 311 9876543", email: "sara@example.com" }, OrderItems: [{ id: "2", name: "Pizza", quantity: 1, unitPrice: "1250", lineTotal: "1250" }] },
  { id: "ord-1026", orderNumber: "#ORD-1026", customer: "Usman Shah", items: "1 item", amount: "PKR 420", paymentMethod: "Easypaisa", paymentStatus: "paid", subtotal: "420", deliveryFee: "0", serviceFee: "0", discount: "0", total: "420", status: "Preparing", time: "09:50 AM", createdAt: "2026-08-25T09:50:00.000Z", User: { id: "3", name: "Usman Shah", phone: "+92 332 1237890", email: "usman@example.com" }, OrderItems: [{ id: "3", name: "Burger", quantity: 1, unitPrice: "420", lineTotal: "420" }] },
  { id: "ord-1025", orderNumber: "#ORD-1025", customer: "Hira Malik", items: "4 items", amount: "PKR 1,890", paymentMethod: "Cash on Delivery", paymentStatus: "pending", subtotal: "1,890", deliveryFee: "0", serviceFee: "0", discount: "0", total: "1,890", status: "On The Way", time: "09:25 AM", createdAt: "2026-08-25T09:25:00.000Z", User: { id: "4", name: "Hira Malik", phone: "+92 345 4445555", email: "hira@example.com" }, OrderItems: [{ id: "4", name: "Burger, Fries, Drink", quantity: 4, unitPrice: "1890", lineTotal: "1890" }] },
  { id: "ord-1024", orderNumber: "#ORD-1024", customer: "Bilal Hassan", items: "2 items", amount: "PKR 650", paymentMethod: "JazzCash", paymentStatus: "paid", subtotal: "650", deliveryFee: "0", serviceFee: "0", discount: "0", total: "650", status: "Delivered", time: "08:45 AM", createdAt: "2026-08-25T08:45:00.000Z", User: { id: "5", name: "Bilal Hassan", phone: "+92 345 6667777", email: "bilal@example.com" }, OrderItems: [{ id: "5", name: "Burger, Drink", quantity: 2, unitPrice: "650", lineTotal: "650" }] },
  { id: "ord-1023", orderNumber: "#ORD-1023", customer: "Ayesha Noor", items: "3 items", amount: "PKR 1,550", paymentMethod: "Easypaisa", paymentStatus: "paid", subtotal: "1,550", deliveryFee: "0", serviceFee: "0", discount: "0", total: "1,550", status: "Delivered", time: "08:30 AM", createdAt: "2026-08-25T08:30:00.000Z", User: { id: "6", name: "Ayesha Noor", phone: "+92 300 0011223", email: "ayesha@example.com" }, OrderItems: [{ id: "6", name: "Pizza, Wings, Drink", quantity: 3, unitPrice: "1550", lineTotal: "1550" }] },
  { id: "ord-1022", orderNumber: "#ORD-1022", customer: "Hamza Raza", items: "2 items", amount: "PKR 730", paymentMethod: "Cash on Delivery", paymentStatus: "pending", subtotal: "730", deliveryFee: "0", serviceFee: "0", discount: "0", total: "730", status: "Cancelled", time: "08:10 AM", createdAt: "2026-08-25T08:10:00.000Z", User: { id: "7", name: "Hamza Raza", phone: "+92 300 9080706", email: "hamza@example.com" }, OrderItems: [{ id: "7", name: "Zinger Burger, Fries", quantity: 2, unitPrice: "730", lineTotal: "730" }] },
];

export function getRestaurantOrderById(id: string) {
  if (!id) return null;

  const normalizedId = id.toLowerCase();
  return (
    restaurantOrders.find((order) => {
      const orderId = order.orderNumber.replace("#", "").toLowerCase();
      return order.id === id || orderId === normalizedId;
    }) || null
  );
}
