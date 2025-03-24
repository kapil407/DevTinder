 // authentication

 import jwt from "jsonwebtoken";
 import cookies from "cookie-parser";
 import { user } from "../src/Models/User.js";

export const UserAuth=async (req,res,next)=>{
   try{
    const cookies =req.cookies;    // extract the cookies
    const {token}=cookies;  // extract the token from cookies
    if(!token){
        throw new Error("token is not valid ");
    }
    const decodedObj=await jwt.verify(token,"hdfsaidf#@$jd"); // vaditation the token or verify the token

   const {_id}=decodedObj;                 
    const User=await user.findById(_id); // find the user 
    if(!User){
        throw new Error("user not found");
    }
    req.User=User;   // add the User in request 
    next();   // pass the control to request handler 
   }
   catch(err){
        res.status(400).send("ERROR "+err.message);
   }
}