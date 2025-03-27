import express from 'express' ;
import { UserAuth } from "../../Middleware/Authentication.js";
import {user} from '../Models/User.js'
import { requestModel} from '../Models/connectionRequest.js';
const requestRouter=express.Router();

requestRouter.post('/request/send/:status/:UserId',UserAuth,  async (req,res)=>{
      try{
         const fromUser=req.User;
         const fromUserId=req.User._id;
        const toUserId=req.params.UserId;
        const status=req.params.status;
      const allowedStatus=['interested','ignored']
      if(!allowedStatus.includes(status)){
         throw new Error("Status not found");
         
      }
        
       const toUser=await user.findById(toUserId);
                if(!toUser){
                 throw new Error("user not found");
                }
     
                const exitstanceRequest= await requestModel.findOne({
                 $or:[
                    {toUserId,fromUserId},
                    {toUserId:fromUserId,fromUserId:toUserId}
                 ]
                })
                if(exitstanceRequest){
                    res.json({message:"request already made "})
                }
               //  console.log(status);
                const connectionRequest=new requestModel({      // create connection request
                    toUserId:toUserId,
                    fromUserId:fromUserId,
                    status:status
                });
                
            const data=  await connectionRequest.save();
             
         res.json({message:"connection request sent succesfully",
           data
         });
      }
      catch(err){
         res.status(400).json({err:err.message});
      }
   

 
   });

requestRouter.post('/request/review/:status/:requestId',UserAuth,async (req,res)=>{
            try{

                  const allowedStatus=["accepted","rejected"];
                  const loggedInUserId=req.User._id;
                  const {requestId,status}=req.params;//

                  console.log(status);
              
                 

                     if(!allowedStatus.includes(status)){
                        throw new Error("status not found");
                     }
                     // console.log("from-> "+ requestId);
                     // console.log("to-> "+loggedInUserId);

                    
              const connectionRequest = await requestModel.findOne({           // Find the connection request
                        fromUserId: requestId,  // 
                        toUserId: loggedInUserId,
                        status: 'interested'         
                  });
                

                     if(!connectionRequest){
                        // console.log("After");
                        // console.log("from-> "+ requestId);
                        // console.log("to-> "+loggedInUserId);
                        throw new Error(" Connection request not found");
                        
                     }
                     connectionRequest.status = status;
                     const data =await connectionRequest.save();

                     res.json({message:"Connection request "+status ,data})

            }
            catch(err){
               res.status(400).json({err:err.message});
            }
});


 export default requestRouter;
