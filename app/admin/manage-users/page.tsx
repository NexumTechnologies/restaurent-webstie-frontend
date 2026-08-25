"use client";

import Link from "next/link";
import { StatCard } from "@/components/admin/StatCard";
import { Users, CheckCircle2, Clock, XCircle, Search, Download, Eye, Trash2, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const users = [
  { id: 1, name: "Ali Khan", email: "ali.khan@example.com", phone: "+91 98765 43210", role: "Customer", joined: "12 May 2024", status: "Active" },
  { id: 2, name: "Sara Malik", email: "sara.malik@example.com", phone: "+91 91234 56789", role: "Customer", joined: "18 May 2024", status: "Active" },
  { id: 3, name: "Usman Ahmad", email: "usman.ahmad@example.com", phone: "+91 99887 66554", role: "Restaurant Owner", joined: "24 May 2024", status: "Pending" },
  { id: 4, name: "Hira Butt", email: "hira.butt@example.com", phone: "+91 90909 11223", role: "Customer", joined: "02 Jun 2024", status: "Inactive" },
  { id: 5, name: "Zainab Ali", email: "zainab.ali@example.com", phone: "+91 87654 32109", role: "Admin", joined: "10 Jun 2024", status: "Active" },
];

export default function ManageUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <p className="text-gray-500">View and manage all registered users on the platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="3,782"
          trend={{ value: "All registered users", isPositive: true, label: "" }}
          icon={Users}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Active Users"
          value="3,450"
          trend={{ value: "Currently active users", isPositive: true, label: "" }}
          icon={CheckCircle2}
          iconBgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Verification"
          value="120"
          trend={{ value: "Awaiting email verification", isPositive: true, label: "" }}
          icon={Clock}
          iconBgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <StatCard
          title="Inactive Users"
          value="212"
          trend={{ value: "Currently inactive users", isPositive: false, label: "" }}
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
              placeholder="Search users by name, email..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex-1 md:w-auto">
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <select className="block w-full px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
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
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-gray-600">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      user.status === 'Active' ? 'bg-green-50 text-green-700' : 
                      user.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' : 
                      'bg-red-50 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/manage-users/${user.id}`} className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-gray-200">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <div>Showing 1 to 5 of 3,782 entries</div>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-700 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">3</button>
            <div className="px-1"><MoreHorizontal className="w-4 h-4 text-gray-400" /></div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">757</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
