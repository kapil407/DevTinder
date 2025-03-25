import express from 'express' ;
import { UserAuth } from "../../Middleware/Authentication.js";

const requestRouter=express.Router();

requestRouter.post('/sendConnectionRequest',UserAuth,  async (req,res)=>{

    const User=req.User;
    console.log(User);
    res.send(User.firstName + " sending Connection Request");
   

 });
 export default requestRouter;
