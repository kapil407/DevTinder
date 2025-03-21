import express from "express";
import { connectDb } from "./config/database.js";
import {user} from "./Models/User.js";


const app=express();

app.use(express.json());

// app.post("/signup",async (req,res)=>{
//     const User=new user(req.body);  
//     console.log(req.body);                         /*
//                                                     {
//                                                         firstName:"kapil",
//                                                         lastName:"kumar",
//                                                         emailId:"kapil@gmail.com",
//                                                         passward:"japil1235"
//                                                     }
//                                                       */
//     try{
//    await User.save();
//     res.send("data is save successfully");
//     }
//     catch(err){
//         res.status(400).send("Error is "+ err.message);
//     }
// });

// app.get('/user',async (req,res)=>{    // fetch data by emailId 
//         const userEmail=req.body.emailId;
//         try{
//         const User=await user.find({emailId:userEmail});
//         if(User.length===0){
//             res.status(404).send("user not found");
//         }    
//         else{
//               res.send(User);
//         } 
      
//         }
//         catch(err){
//             res.status(404).send("somtthing went wrong");
//         }
// });

// fetch all user from data base
app.use('/user',async (req,res)=>{

    try{
       const users=await user.find({});   // fetch all users's data from dataBase
       if(!users.length){
        res.status(404).send("users not found");

       }
       else res.send(users);
    }
    catch(err){
        res.status(404).send("something went wrong ");
    }
})
 
 

connectDb().then(()=>{
    console.log("db connect sucessfully");
    app.listen(4000,()=>{
        console.log("Server is runing sucessful......");
    });
 }).catch((err)=>{
    console.error("db is not connected");
 })
