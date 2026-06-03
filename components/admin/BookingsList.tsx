export const dynamic = 'force-dynamic'

import BookingsListClient from "./Client/BookingListClient";
import { connectionDB } from "@/lib/db";

export default async function BookingsList() {
    await connectionDB();
    const Booking = (await import('@/lib/models/Booking')).default;
    const Service = (await import('@/lib/models/Service')).default;
    const data = await Booking.find().populate('service').lean();
    const serialized = JSON.parse(JSON.stringify(data));

    return <BookingsListClient data={serialized} />
}