import express from "express";
import dotenv from "dotenv";
import connectDB from "./module/db.js";
import Auth from "./route/Auth.js";
 


dotenv.config();
const app = express();

// auth route
app.use('/api/auth',Auth);



app.get("/",(req,res)=>{
    res.send("Hello World");
});
app.listen(3000,()=>{
    connectDB();
    console.log("Server is running on port 3000");
});