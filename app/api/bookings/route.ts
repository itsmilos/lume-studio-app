import { connectionDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    await connectionDB();

    const Booking = (await import('@/lib/models/Booking')).default;

    const data = await Booking.find().populate('service');

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.firstName || !data.lastName || !data.phone || !data.service || !data.start) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
        }

        await connectionDB();

        const Service = (await import('@/lib/models/Service')).default;
        const Booking = (await import('@/lib/models/Booking')).default;

        const service = await Service.findById(data.service);

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        const start = new Date(data.start);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + service.duration);

        const conflict = await Booking.findOne({
            $or: [
                {
                    start: { $lt: end },
                    end: { $gt: start }
                }
            ]
        });

        if (conflict) {
            return NextResponse.json(
                { message: "Term is already booked" },
                { status: 409 }
            );
        }

        const booking = await Booking.create({
            ...data,
            service: service._id,
            start,
            end
        });

        return NextResponse.json(booking, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}