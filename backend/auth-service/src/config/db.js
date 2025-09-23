import mongoose from "mongoose";

export default function connectDB(uri) {
    mongoose.connect(uri)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.error("MongoDB connection error:", err));
}
