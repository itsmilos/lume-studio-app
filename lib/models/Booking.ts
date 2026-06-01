import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    status: { type: String, default: 'pending' },
    start: Date,
    end: Date
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;