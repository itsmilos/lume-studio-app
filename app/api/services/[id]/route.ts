import { revalidatePath } from 'next/cache';
import { connectionDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await connectionDB();
    const Service = (await import("@/lib/models/Service")).default;
    await Service.findByIdAndDelete(id);
    revalidatePath("/admin");
    return NextResponse.json({ message: 'Service deleted!' });
}