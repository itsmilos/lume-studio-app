import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    text: String,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' }
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;