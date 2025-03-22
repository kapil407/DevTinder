import express from "express";
import { connectDb } from "./config/database.js";
import {user} from "./Models/User.js";


const app=express();


app.post("/signup",async (req,res)=>{
    const userObj={
        firstName:"kapil",
        lastName:"kumar",
        emailId:"kapil@gmail.com",
        passward:"japil1235"
    }
    const User=new user(userObj);
   await User.save();
    res.send("data is save successfully");
});

 
 

connectDb().then(()=>{
    console.log("db connect sucessfully");
    app.listen(4000,()=>{
        console.log("Server is runing sucessful......");
    });
 }).catch((err)=>{
    console.error("db is not connected");
 })
