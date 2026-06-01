import mongoose from "mongoose";
import "./models/Service";
import "./models/Booking";

const MONGODB_URI = process.env.MONGODB_URL ?? (() => { throw new Error('MONGODB_URI not defined') })()

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectionDB() {
    if (cached.conn) return cached.conn

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI)
    cached.conn = await cached.promise
    return cached.conn
}