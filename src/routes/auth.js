import express from "express";  
const authRouter=express.Router();

import cookieParser from 'cookie-parser'
import bcrypt from "bcrypt";
import {validateSignUpData} from '../Utils/Validation.js'
import {user} from "../Models/User.js";


authRouter.post("/signup",async (req,res)=>{  //signUp
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

authRouter.post('/login',async (req,res)=>{   //login
    try{
    const {emailId,passward}=req.body;
        const User=await user.findOne({emailId:emailId});// check that user in the database or not id yes then fetch  
        if(!User){
            throw new Error("invalid emailId"); 
        }
       const isValidePassword= await User.validatePassword(passward); // compare password with login password
       if(!isValidePassword){
            throw new Error("incorrect password");
            
       }
       
        const token=await User.getJWT(); 
        // console.log("generate token -> "+token);

       // add the token to the cookie and send back to the user
       res.cookie("token",token);  // first->name and second->value 
       res.send("login suceessfully"); // send to the user 
    }
    catch(err){
        res.status(404).send("ERROR "+err.message);
    }
});



export default  authRouter;