import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async()=>
{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DataBase Connected")
    } catch (error) {
        console.log(error)
    }
}
export default connectDb
