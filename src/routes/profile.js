import express from 'express' ;
const profileRouter=express.Router();

import { UserAuth } from "../../Middleware/Authentication.js";



//  get profile

profileRouter.get('/profile', UserAuth, async (req,res)=>{
    try{
    const User =req.User; // cookie get back from user
   
    res.json({ message:`${User.firstName} Your profile  ` ,data:User}); // send cookies by user to get profile and server identified this cookie and getback profile to the user
    }
    catch(err){
        res.status(404).send("ERROR "+err.message);
    }

 })


//  edit or udate profile 

 profileRouter.post('/profile/edit',UserAuth, async (req,res)=>{
              
            try{

            const allowedEdit=["firstName","lastName","age","skills","photoUrl"];
            const isValide=Object.keys(req.body).every(key=>allowedEdit.includes(key));
                
            if(!isValide){
                   res.status(400).json({error:"Invalid fields"});
                }

             const loginedUser=req.User;
             Object.keys(req.body).forEach((field)=>loginedUser[field]=req.body[field]);
            
            await loginedUser.save();

                res.json({ message:`${loginedUser.firstName} Your updated profile `,data:loginedUser});
            }
            catch(err){
                res.status(400).json({err: err.message});
            }    
 });

 export default profileRouter;
