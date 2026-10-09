"use client";

import { useState } from "react";
import AdminTabs from "@/components/admin/AdminTabs";
import BookingsList from "@/components/admin/dashboard/booking/BookingsList";
import ServicesList from "@/components/admin/dashboard/service/ServicesList";
import LogoutButton from "@/components/admin/Logout";
import DashboardStats from "@/components/admin/dashboard/service/DashboardStats";
import ServiceModal from "@/components/admin/dashboard/service/ServiceModal";

export default function DashboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
      <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl uppercase leading-tight sm:text-4xl">
          Admin Dashboard
        </h1>

        <div className="flex flex-wrap items-center gap-2">
          <LogoutButton />
          <ServiceModal />
        </div>
      </header>

      <div className="mb-8 sm:mb-10">
        <DashboardStats refreshKey={refreshKey} />
      </div>

      <AdminTabs
        bookings={
          <BookingsList onRefresh={() => setRefreshKey((prev) => prev + 1)} />
        }
        services={<ServicesList />}
      />
    </main>
  );
}
