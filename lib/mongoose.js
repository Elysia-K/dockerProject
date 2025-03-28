import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("The MONGO_URI environment variable is not set.");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI); 
    console.log(`✅ MongoDB connection successful: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failure: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
