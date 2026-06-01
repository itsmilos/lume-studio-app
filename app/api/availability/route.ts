import { connectionDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';
import Booking from '@/lib/models/Booking'
import Service from '@/lib/models/Service';

export async function GET(req: NextRequest) {
    type BookingType = {
        start: string | Date;
        end: string | Date;
    }
    await connectionDB();

    const searchParams = req.nextUrl.searchParams;

    const date = searchParams.get('date');

    if (!date) {
        return NextResponse.json({ message: 'Missing Date' }, { status: 400 })
    }

    const day = new Date(date);

    const dayStart = new Date(day);
    dayStart.setHours(9, 0, 0, 0);

    const dayEnd = new Date(day);
    dayEnd.setHours(17, 0, 0, 0);

    const serviceId = searchParams.get("serviceId");

    const service = await Service.findById(serviceId);

    if (!service) {
        return NextResponse.json({ message: "Service not found" }, { status: 404 });
    }

    const bookings = await Booking.find({
        start: { $gte: dayStart, $lte: dayEnd }
    }).select("start end").lean();

    const slots = [];

    const duration = service.duration;

    let current = new Date(dayStart);

    function isOverlapping(slotStart: any, slotEnd: any, bookings: any) {
        return bookings.some((b: BookingType) => {
            return (
                new Date(b.start) < slotEnd && new Date(b.end) > slotStart
            )
        })
    }

    while (current < dayEnd) {
        const slotStart = new Date(current);
        const slotEnd = new Date(current);
        slotEnd.setMinutes(slotEnd.getMinutes() + duration);

        if (slotEnd > dayEnd) break;

        const taken = isOverlapping(slotStart, slotEnd, bookings);

        slots.push({
            start: slotStart,
            end: slotEnd,
            available: !taken
        })

        current.setMinutes(current.getMinutes() + 15);
    }

    return NextResponse.json(slots);
}