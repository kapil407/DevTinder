import express from "express";
const app=express();
// in express , firstly request comes and match the route from top to bottom and send response 
app.use('/user',(req,res,next)=>{
    console.log("first Handler!!");
    next();
});
app.get('/user',(req,res,next)=>{
    console.log("1 Handler");
    next();
    res.send("first handler");
});


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