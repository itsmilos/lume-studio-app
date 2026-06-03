import { connectionDB } from "@/lib/db";
import Service from "@/lib/models/Service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await connectionDB();

        await Service.findByIdAndDelete(id);

        return NextResponse.json({
            message: "Successfully deleted service!",
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting service" },
            { status: 500 }
        );
    }
}