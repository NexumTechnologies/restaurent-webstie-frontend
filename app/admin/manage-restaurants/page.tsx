"use client";

import { useState } from "react";
import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { RestaurantModal } from "@/components/admin/modals/RestaurantModal";
import { Store, CheckCircle2, Clock, XCircle, Search, Download, Eye, Edit2, Check, X, Plus, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const restaurants = [
  { id: 1, name: "Burger House", owner: "John Smith", email: "john.smith@burgerhouse.com", phone: "+91 98765 43210", joined: "12 May 2024", approval: "Approved", status: "Active", icon: "🍔", location: "123 Main St, City", openingTime: "10:00", closingTime: "22:00", description: "Best burgers in town." },
  { id: 2, name: "Pizza Point", owner: "Sarah Johnson", email: "sarah.johnson@pizzapoint.com", phone: "+91 91234 56789", joined: "18 May 2024", approval: "Approved", status: "Active", icon: "🍕", location: "456 Oak Ave, City", openingTime: "11:00", closingTime: "23:00", description: "Authentic Italian pizza." },
  { id: 3, name: "Spice Hub", owner: "Ravi Kumar", email: "ravi.kumar@spicehub.com", phone: "+91 99887 66554", joined: "24 May 2024", approval: "Pending", status: "Active", icon: "🥘", location: "789 Pine Rd, City", openingTime: "12:00", closingTime: "23:30", description: "Spicy Indian cuisine." },
  { id: 4, name: "Healthy Bites", owner: "Emily Davis", email: "emily.davis@healthybites.com", phone: "+91 90909 11223", joined: "02 Jun 2024", approval: "Approved", status: "Inactive", icon: "🥗", location: "321 Elm St, City", openingTime: "08:00", closingTime: "20:00", description: "Healthy salads and bowls." },
  { id: 5, name: "Pasta Express", owner: "Michael Brown", email: "michael.brown@pastaexpress.com", phone: "+91 87654 32109", joined: "10 Jun 2024", approval: "Pending", status: "Active", icon: "🍝", location: "654 Maple Dr, City", openingTime: "11:30", closingTime: "22:30", description: "Quick and delicious pasta." },
];

export default function ManageRestaurantsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const handleAddRestaurant = () => {
    setModalMode("add");
    setSelectedRestaurant(null);
    setIsModalOpen(true);
  };

  const handleEditRestaurant = (restaurant: any) => {
    setModalMode("edit");
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Restaurants</h1>
          <p className="text-gray-500">View, approve, and manage all restaurants on the platform.</p>
        </div>
        <button 
          onClick={handleAddRestaurant}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Restaurant
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Restaurants"
          value="128"
          trend={{ value: "All registered restaurants", isPositive: true, label: "" }}
          icon={Store}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Active Restaurants"
          value="94"
          trend={{ value: "Currently active restaurants", isPositive: true, label: "" }}
          icon={CheckCircle2}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Approval"
          value="12"
          trend={{ value: "Awaiting admin approval", isPositive: true, label: "" }}
          icon={Clock}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Inactive Restaurants"
          value="22"
          trend={{ value: "Currently inactive restaurants", isPositive: false, label: "" }}
          icon={XCircle}
          iconBgColor="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants, owner, email..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-auto">
              <label className="block text-xs font-medium text-gray-500 mb-1">Approval Status</label>
              <select className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All</option>
                <option>Approved</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="flex-1 md:w-auto">
              <label className="block text-xs font-medium text-gray-500 mb-1">Availability Status</label>
              <select className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-green-600 text-green-700 hover:bg-green-50 rounded-xl text-sm font-medium transition-colors shrink-0 mt-5">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-4 font-medium">Restaurant</th>
                <th className="px-6 py-4 font-medium">Owner</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Approval Status</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shrink-0">
                        {restaurant.icon}
                      </div>
                      <span className="font-medium text-gray-900">{restaurant.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.owner}</td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.email}</td>
                  <td className="px-6 py-4 text-gray-600">{restaurant.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{restaurant.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${restaurant.approval === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                      {restaurant.approval}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${restaurant.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {restaurant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/manage-restaurants/${restaurant.id}`} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {restaurant.approval === 'Pending' && (
                        <>
                          <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-200">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleEditRestaurant(restaurant)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 128 entries</div>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-700 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">3</button>
            <div className="px-1"><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">26</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <RestaurantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        mode={modalMode} 
        initialData={selectedRestaurant} 
      />
    </div>
  );
}
