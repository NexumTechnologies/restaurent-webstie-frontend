"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Phone, Mail, Star, TrendingUp, ShoppingBag, DollarSign } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the restaurant
  const restaurant = {
    id: params.id,
    name: "Burger House",
    owner: "John Smith",
    email: "john.smith@burgerhouse.com",
    phone: "+91 98765 43210",
    location: "123 Main St, City Center",
    openingTime: "10:00 AM",
    closingTime: "10:00 PM",
    description: "The best burgers in town, made with fresh ingredients and love.",
    joined: "12 May 2024",
    approval: "Approved",
    status: "Active",
    rating: 4.8,
    reviews: 124,
    coverImage: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
    logo: "🍔"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/manage-restaurants" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Restaurant Details</h1>
          <p className="text-gray-500">View detailed information and performance metrics.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-48 w-full bg-gray-200 relative">
          <img src={restaurant.coverImage} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl shrink-0 z-10">
              {restaurant.logo}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{restaurant.name}</h2>
                <StatusBadge status={restaurant.status as any} />
                <StatusBadge status={restaurant.approval as any} />
              </div>
              <p className="text-gray-500">{restaurant.description}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Suspend Account
              </button>
              <button className="px-4 py-2 bg-green-700 text-white rounded-xl font-medium hover:bg-green-800 transition-colors">
                Edit Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-500">{restaurant.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Timings</p>
                <p className="text-sm text-gray-500">{restaurant.openingTime} - {restaurant.closingTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Contact</p>
                <p className="text-sm text-gray-500">{restaurant.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-500">{restaurant.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Performance Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="1,248"
          trend={{ value: "12% from last month", isPositive: true, label: "" }}
          icon={ShoppingBag}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Total Revenue"
          value="PKR 450,000"
          trend={{ value: "8% from last month", isPositive: true, label: "" }}
          icon={DollarSign}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Average Rating"
          value={restaurant.rating}
          trend={{ value: `${restaurant.reviews} reviews`, isPositive: true, label: "" }}
          icon={Star}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Growth"
          value="+15%"
          trend={{ value: "Steady growth", isPositive: true, label: "" }}
          icon={TrendingUp}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>
    </div>
  );
}
