"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User, Lock, Bell, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/lib/api";
import { changeAdminPassword, getCurrentUser, updateAdminProfile } from "@/lib/api";
import { useToast } from "@/components/providers/toast-provider";

type NotificationPrefs = {
  emailNotifications: boolean;
  systemAlerts: boolean;
};

const notificationKey = "foodflow_admin_notification_prefs";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem("foodflow_user");
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  } catch {
    return null;
  }
}

function updateStoredUser(user: AuthUser) {
  if (typeof window === "undefined") return;

  const current = readStoredUser();
  const merged = { ...(current ?? {}), ...user };
  window.localStorage.setItem("foodflow_user", JSON.stringify(merged));
  window.dispatchEvent(new Event("foodflow-user-updated"));
}

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { success, error, info } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [profileForm, setProfileForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPrefs>({ emailNotifications: true, systemAlerts: true });

  const profileQuery = useQuery({
    queryKey: ["admin-profile"],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (profileQuery.data) {
      setProfileForm({
        name: profileQuery.data.name ?? "",
        email: profileQuery.data.email ?? "",
        phone: profileQuery.data.phone ?? "",
        address: profileQuery.data.address ?? "",
      });
    }
  }, [profileQuery.data]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(notificationKey);
      if (stored) setNotificationPrefs(JSON.parse(stored));
    } catch {
      // ignore storage issues
    }
  }, []);

  const profileMutation = useMutation({
    mutationFn: updateAdminProfile,
    onSuccess: (updated) => {
      success("Profile updated", updated.name);
      const mergedUser = { ...(profileQuery.data ?? {}), ...updated };
      queryClient.setQueryData(["admin-profile"], mergedUser);
      queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      updateStoredUser(mergedUser as AuthUser);
    },
    onError: (mutationError: Error) => error("Profile update failed", mutationError.message),
  });

  const passwordMutation = useMutation({
    mutationFn: changeAdminPassword,
    onSuccess: () => {
      success("Password updated", "Your admin password was changed successfully.");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    },
    onError: (mutationError: Error) => error("Password update failed", mutationError.message),
  });

  function saveNotificationPrefs() {
    try {
      window.localStorage.setItem(notificationKey, JSON.stringify(notificationPrefs));
      success("Preferences saved", "Notification settings were updated locally.");
    } catch (storageError) {
      info("Could not save locally", "Your browser blocked local storage.");
    }
  }

  function submitProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    profileMutation.mutate(profileForm);
  }

  function submitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      error("Passwords do not match", "Please confirm the same new password.");
      return;
    }
    passwordMutation.mutate({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex border-b border-gray-100">
          <TabButton active={activeTab === "general"} onClick={() => setActiveTab("general")} icon={User} label="General" />
          <TabButton active={activeTab === "security"} onClick={() => setActiveTab("security")} icon={Lock} label="Security" />
          <TabButton active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} icon={Bell} label="Notifications" />
        </div>

        <div className="p-6">
          {activeTab === "general" && (
            <form onSubmit={submitProfile} className="max-w-2xl space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Profile Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name" value={profileForm.name} onChange={(value) => setProfileForm((current) => ({ ...current, name: value }))} />
                  <Field label="Email Address" type="email" value={profileForm.email} onChange={(value) => setProfileForm((current) => ({ ...current, email: value }))} />
                  <Field label="Phone Number" value={profileForm.phone} onChange={(value) => setProfileForm((current) => ({ ...current, phone: value }))} />
                  <Field label="Address" value={profileForm.address} onChange={(value) => setProfileForm((current) => ({ ...current, address: value }))} />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <button type="submit" disabled={profileMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70">
                  <Save className="h-4 w-4" />
                  {profileMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={submitPassword} className="max-w-2xl space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Change Password</h3>
                <div className="space-y-4">
                  <Field label="Current Password" type="password" value={passwordForm.currentPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, currentPassword: value }))} />
                  <Field label="New Password" type="password" value={passwordForm.newPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, newPassword: value }))} />
                  <Field label="Confirm New Password" type="password" value={passwordForm.confirmNewPassword} onChange={(value) => setPasswordForm((current) => ({ ...current, confirmNewPassword: value }))} />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <button type="submit" disabled={passwordMutation.isPending} className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70">
                  <Save className="h-4 w-4" />
                  {passwordMutation.isPending ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Notification Preferences</h3>
                <div className="space-y-4">
                  <ToggleRow
                    title="Email Notifications"
                    description="Receive daily summary emails."
                    checked={notificationPrefs.emailNotifications}
                    onChange={(checked) => setNotificationPrefs((current) => ({ ...current, emailNotifications: checked }))}
                  />
                  <ToggleRow
                    title="System Alerts"
                    description="Get notified about critical system events."
                    checked={notificationPrefs.systemAlerts}
                    onChange={(checked) => setNotificationPrefs((current) => ({ ...current, systemAlerts: checked }))}
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <button onClick={saveNotificationPrefs} type="button" className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-6 py-2.5 font-medium text-white transition-colors hover:bg-green-800">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors",
        active ? "border-b-2 border-green-600 bg-green-50/30 text-green-700" : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />
    </div>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-4">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white" />
      </label>
    </div>
  );
}
