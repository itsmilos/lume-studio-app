import { connectionDB } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectionDB();

    const Booking = (await import('@/lib/models/Booking')).default;

    const { id } = params;

    await Booking.deleteOne({ _id: id });

    return NextResponse.json({ message: 'Booking deleted!' });
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    await connectionDB();

    const Booking = (await import('@/lib/models/Booking')).default;

    const { id } = params;
    const { status } = await request.json();

    await Booking.findOneAndUpdate({ _id: id }, { status });

    return NextResponse.json({ message: 'Succesfully changed status!' });
}