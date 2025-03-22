import express from "express";
import { connectDb } from "./config/database.js";
import {user} from "./Models/User.js";


const app=express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const User=new user(req.body);  
    console.log(req.body);                         /*
                                                    {
                                                        firstName:"kapil",
                                                        lastName:"kumar",
                                                        emailId:"kapil@gmail.com",
                                                        passward:"japil1235"
                                                    }
                                                      */
    try{
   await User.save();
    res.send("data is save successfully");
    }
    catch(err){
        res.status(400).send("Error is "+ err.message);
    }
});

 
 

connectDb().then(()=>{
    console.log("db connect sucessfully");
    app.listen(4000,()=>{
        console.log("Server is runing sucessful......");
    });
 }).catch((err)=>{
    console.error("db is not connected");
 })
