import mongoose from "mongoose";

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI);
      console.log("Woohhoo! MongoDB connected successfully");
    }

    
   catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("MongoDB connection failed");
  }
}
export default connectDB;