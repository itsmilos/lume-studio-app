export const dynamic = "force-dynamic"

import AdminTabs from "@/components/admin/Client/AdminTabs";
import BookingsList from "@/components/admin/BookingsList";
import ServicesList from "@/components/admin/ServicesList";
import LogoutButton from "@/components/admin/Client/Logout";
import DashboardStats from "@/components/admin/Client/DashboardStats";
import ServiceModal from "@/components/admin/ServiceModal";
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
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const today = await Booking.countDocuments({
        start: { $gte: startOfToday, $lte: endOfToday }
    });

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