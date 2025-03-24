import express from "express";
import { connectDb } from "./config/database.js";
import {user} from "./Models/User.js";
import bcrypt from "bcrypt";
import {validateSignUpData} from './Utils/Validation.js'

const app=express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
   try{
    // validation SignUp data   
    validateSignUpData(req);
    const {firstName,lastName,emailId,passward} = req.body;
    // bcrypt passward
    const hashPassward=await bcrypt.hash(passward,10); // convert the plain text passward into the cipher text
        
    const User=new user({
        firstName,
        lastName,
        emailId,
        passward:hashPassward
    });  
                       

   
   await User.save();
    res.send("data is save successfully");
    }
    catch(err){
        res.status(400).send("ERROR "+ err.message);
    }
});

app.get('/user',async (req,res)=>{    // fetch data by emailId 
        const userId=req.body._id;
        try{
        const User=await user.findById({_id:userId});  // it return an array of object
        if(User.length===0){
            res.status(404).send("user not found");
        }    
        else{
              res.send(User);
        } 
      
        }
        catch(err){
            res.status(404).send("somtthing went wrong");
        }
});

// fetch all user from data base
// app.use('/user',async (req,res)=>{

//     try{
//        const users=await user.find({});   // fetch all users's data from dataBase
//        if(!users.length){
//         res.status(404).send("users not found");

//        }
//        else res.send(users);
//     }
//     catch(err){
//         res.status(404).send("something went wrong ");
//     }
// })

app.delete('/user',async (req,res)=>{
     const userId=req.body._id;
     try{
            const UserId=await user.findByIdAndDelete({_id:userId});
            res.send("user successfully delete");
     }
     catch(err){
        res.status(404).send("something went wrong");
     }

})

app.patch('/user/:userId',async (req,res)=>{
        const userid=req.params?.userId;
        console.log(userid);
        const data=req.body;
        try{

         const ALLOWED_DATA=["age","skills","gender"]; // data jo update ke liye allow hai
        
         const isUpdateAllowed=Object.keys(data).every((k)=>{   // pure js code for validation on updatesData for user
                  return  ALLOWED_DATA.includes(k)
                });
        
                if(!isUpdateAllowed){
                    throw new Error("update is not allow");
                }
               if(data?.skills.length > 10){
                    throw new Error("skills can not be more than 10");
                    
               }

            const Userdata= await user.findByIdAndUpdate({_id:userid},data,{ runValidators:true});
            console.log(data);
           
         
           res.send("data update successfully");
        }
        catch(err){
            res.status(404).send("something went wrong "+err.message);
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
