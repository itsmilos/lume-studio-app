export const dynamic = "force-dynamic";

import { connectionDB } from '@/lib/db'
import { NextResponse } from 'next/server';

export async function GET() {
    await connectionDB();
    const Service = (await import('@/lib/models/Service')).default;
    const data = await Service.find();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const data = await request.json();
    await connectionDB();
    const Service = (await import('@/lib/models/Service')).default;
    await Service.create(data);
    return NextResponse.json({ message: 'Success!', received: data }, { status: 201 });
}