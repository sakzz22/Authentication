import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATA BASE CONNECTED");
  } catch (error) {
    console.log("DB ERROR", error)
  }
};

export default connectDB;
