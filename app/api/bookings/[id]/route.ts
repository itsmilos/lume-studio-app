export const dynamic = "force-dynamic";

import { connectionDB } from '@/lib/db'
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
    await connectionDB();
    const Review = (await import('@/lib/models/Review')).default;
    const data = await Review.find().populate('service');
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        if (!data.firstName || !data.lastName || !data.email || !data.text || !data.service) {
            return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
        }

        await connectionDB();
        const Review = (await import('@/lib/models/Review')).default;
        await Review.create({
            ...data,
            service: new mongoose.Types.ObjectId(data.service)
        })
        return NextResponse.json({ message: 'Success!', received: data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }
}