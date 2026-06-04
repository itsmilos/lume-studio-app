import { connectionDB } from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectionDB();
    const Booking = (await import("@/lib/models/Booking")).default;

    const booking = await Booking.findById(id).populate("service");

    if (!booking) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectionDB();
    const Booking = (await import("@/lib/models/Booking")).default;

    const { status } = await req.json();

    if (!status) {
        return NextResponse.json({ message: "Missing status" }, { status: 400 });
    }

    const updated = await Booking.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    revalidatePath("/admin");

    if (!updated) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
}