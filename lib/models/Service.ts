import mongoose from "mongoose";
const { Schema } = mongoose;

const serviceSchema = new Schema({
    title: String,
    price: Number,
    duration: Number,
    description: String,
    category: String,
    image: String,
});

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;