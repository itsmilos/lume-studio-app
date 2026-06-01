import AdminTabs from "@/components/admin/Client/AdminTabs";
import BookingsList from "@/components/admin/BookingsList";
import ServicesList from "@/components/admin/ServicesList";
import LogoutButton from "@/components/admin/Client/Logout";
import DashboardStats from "@/components/admin/Client/DashboardStats";
import ServiceModal from "@/components/admin/ServiceModal";

export default async function DashboardPage() {
    const res = await fetch("http://localhost:3000/api/bookings", { cache: 'no-store' });
    const data = await res.json();

    const total = data.length
    const pending = data.filter((b: any) => b.status === 'pending').length
    const confirmed = data.filter((b: any) => b.status === 'confirmed').length
    const today = data.filter((b: any) => new Date(b.start).toDateString() === new Date().toDateString()).length

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