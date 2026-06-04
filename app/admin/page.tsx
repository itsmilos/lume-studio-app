export const dynamic = "force-dynamic"

import AdminTabs from "@/components/admin/AdminTabs";
import BookingsList from "@/components/admin/dashboard/booking/BookingsList";
import ServicesList from "@/components/admin/dashboard/service/ServicesList";
import LogoutButton from "@/components/admin/Logout";
import DashboardStats from "@/components/admin/dashboard/service/DashboardStats";
import ServiceModal from "@/components/admin/dashboard/service/ServiceModal";
import { connectionDB } from "@/lib/db";

export default async function DashboardPage() {
    await connectionDB();
    const Booking = (await import('@/lib/models/Booking')).default;
    const Service = (await import('@/lib/models/Service')).default;
    const total = await Booking.countDocuments()
    const pending = await Booking.countDocuments({
        status: "pending"
    })
    const confirmed = await Booking.countDocuments({
        status: "confirmed"
    })
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)
    const today = await Booking.countDocuments({
        start: {
            $gte: todayStart,
            $lt: todayEnd
        }
    })

    return (
        <div className="max-w-6xl mx-auto px-10 py-20">
            <div className="flex justify-between items-center mb-12">
                <h1 className="font-display text-4xl uppercase">Admin Dashboard</h1>
                <div className="flex gap-2">
                    <LogoutButton />
                    <ServiceModal />
                </div>
            </div>
            <DashboardStats total={total} today={today} pending={pending} confirmed={confirmed} />
            <AdminTabs key="dashboard-tabs" bookings={<BookingsList />} services={<ServicesList />} />
        </div>
    )
}