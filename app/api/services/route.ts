import { connectionDB } from '@/lib/db'
import { NextResponse } from 'next/server';
import Service from '@/lib/models/Service'

export async function GET() {
    await connectionDB();
    const data = await Service.find();
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const data = await request.json();

    await connectionDB();
    await Service.create(data);

    return NextResponse.json({ message: 'Success!', received: data }, { status: 201 });
}