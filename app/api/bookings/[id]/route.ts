import { connectionDB } from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { NextResponse } from "next/server";
import Service from '@/lib/models/Service';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectionDB();
    await Booking.deleteOne({ _id: id });
    return NextResponse.json({ message: 'Booking deleted!' });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { status } = await request.json();
    await connectionDB();
    await Booking.findOneAndUpdate({ _id: id }, { status });
    return NextResponse.json({ message: 'Succesfully changed status!' })
}
