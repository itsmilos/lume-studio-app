import { connectionDB } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server';
import Booking from '@/lib/models/Booking'
import Service from '@/lib/models/Service';

import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
    await connectionDB();

    const searchParams = req.nextUrl.searchParams;
    const data = await Booking.find().populate('service');

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);

        if (!data.firstName || !data.lastName || !data.phone || !data.service || !data.start) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
        }

        await connectionDB();

        const service = await Service.findById(data.service);

        if (!service) {
            return NextResponse.json({ message: "Service not found" }, { status: 404 });
        }

        const start = new Date(data.start);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + service.duration);

        console.log("BODY RECEIVED:", data);

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

        console.log("START:", start);
        console.log("END:", end);
        console.log("DURATION:", service.duration);

        const booking = await Booking.create({
            ...data,
            service: service._id,
            start,
            end
        })

        return NextResponse.json(booking, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}