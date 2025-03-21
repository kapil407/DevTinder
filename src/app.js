import express from "express";
const app=express();
import { auth,UserAuth } from "../Middleware/Authentication.js";

// in express , firstly request comes and match the route from top to bottom and send response 
// app.use('/user',(req,res,next)=>{
//     console.log("first Handler!!");
//     next();
// });
// app.get('/user',(req,res,next)=>{
//     console.log("1 Handler");
//     next();
//     res.send("first handler");
// });

// AUTHENTICATION USING MIDDLEWARE FUNCTION

app.use('/admin',auth,(req,res,next)=>{

    console.log("success");
    next();  // pass the  control of the request to the next request handler
    // res.send("authenticate");
});
app.use('/admin',(req,res,next)=>{
        console.log("Admin");
        res.send("Authenticated the admin ");
});
app.use('/user',UserAuth,(req,res,next)=>{
        console.log("User");
        next();
})
app.use('/user',(rq,res)=>{
    console.log("second");
    res.send("authentic user");
})




// },
// (req,res,next)=>{
//     console.log("second Handler!!");
//     next();
//     // res.send("second Handler is here!!"); //  getting error 
// },
// (req,res,next)=>{
//     console.log("third Handler");
//     next(); // if next Handler is available then go to next handler otherwise go to the next line ;
//     res.send("second Handler is here!!");
// }
// )


app.listen(4000,()=>{
    console.log("Server is runing sucessful......");
});