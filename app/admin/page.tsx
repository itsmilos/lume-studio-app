"use client"

import { useState } from "react"
import AdminTabs from "@/components/admin/AdminTabs"
import BookingsList from "@/components/admin/dashboard/booking/BookingsList"
import ServicesList from "@/components/admin/dashboard/service/ServicesList"
import LogoutButton from "@/components/admin/Logout"
import DashboardStats from "@/components/admin/dashboard/service/DashboardStats"
import ServiceModal from "@/components/admin/dashboard/service/ServiceModal"

export default function DashboardPage() {
    const [refreshKey, setRefreshKey] = useState(0)

    return (
        <div className="max-w-6xl mx-auto px-10 py-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="font-display text-4xl uppercase">Admin Dashboard</h1>
                <div className="flex gap-2">
                    <LogoutButton />
                    <ServiceModal />
                </div>
            </div>
            <DashboardStats refreshKey={refreshKey} />
            <AdminTabs
                bookings={<BookingsList onRefresh={() => setRefreshKey(prev => prev + 1)} />}
                services={<ServicesList />}
            />
        </div>
    )
}