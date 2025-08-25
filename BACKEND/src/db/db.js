import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



const URL = `${process.env.DB_URL}/${process.env.DB_NAME}`;
async function databaseConnection(){
    try {
        await mongoose.connect(URL)
        console.log("DB Connected!!");
        
    } catch (error) {
        console.log(error);
        
    }

}

export default databaseConnection