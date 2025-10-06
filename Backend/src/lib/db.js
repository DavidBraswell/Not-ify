import mongoos from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoos.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`); // successful connecti
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
            