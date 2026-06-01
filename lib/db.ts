import mongoose from "mongoose";

let cached = (global as any).mongoose || {
    conn: null,
    promise: null,
};

export async function connectionDB() {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("MONGODB_URI not defined");
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI);
    }

    cached.conn = await cached.promise;

    (global as any).mongoose = cached;

    return cached.conn;
}
