import mongoose from "mongoose";
import { config } from '../config';
mongoose.set("strictQuery", false);

// database connection
export const connectDB = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(config.MONGO_URI, (error) => {
            if (error) {
                return reject(error);
            }

            console.log("Database connected successfully");
            return resolve("successfull");
        })

    })
}
