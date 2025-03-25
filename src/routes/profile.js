import express from 'express' ;
const profileRouter=express.Router();

import { UserAuth } from "../../Middleware/Authentication.js";

//  get profile

profileRouter.get('/profile', UserAuth, async (req,res)=>{
    try{
    const User =req.User; // cookie get back from user
   
    res.send(User); // send cookies by user to get profile and server identified this cookie and getback profile to the user
    }
    catch(err){
        res.status(404).send("ERROR "+err.message);
    }

 })

 export default profileRouter;
