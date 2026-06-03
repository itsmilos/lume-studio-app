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
    const data = await Booking.find().populate('service').lean();
    const serialized = JSON.parse(JSON.stringify(data));

    const total = serialized.length
    const pending = serialized.filter((b: any) => b.status === 'pending').length
    const confirmed = serialized.filter((b: any) => b.status === 'confirmed').length
    const today = serialized.filter((b: any) => new Date(b.start).toDateString() === new Date().toDateString()).length

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
            <AdminTabs bookings={<BookingsList />} services={<ServicesList />} />
        </div>
    )
}