import mongoose from "mongoose";
import "./models/Service";
import "./models/Booking";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not defined");
}

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

let cached = (global as any).mongoose as MongooseCache;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectionDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI as string);
    }

    cached.conn = await cached.promise;

    return cached.conn;
}