
import express from "express";
const app=express();
import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path: './.env'
})


connectDB()
// iffies
// ;(async ()=>{
//     try{
//         await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error while connecting to the database",error);
//             throw error
//         })
//         app.listen(3000,()=>console.log(`Server is running on port 3000`));
//     }catch(error){
//         console.error("Error:",error)
//         throw error
//     }
// })()