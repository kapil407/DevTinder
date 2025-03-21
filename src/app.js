import express from "express";
const app=express();

app.use('/user',(req,res,next)=>{
    console.log("first Handler!!");
    next();

},
(req,res,next)=>{
    console.log("second Handler!!");
    next();
    // res.send("second Handler is here!!"); //  getting error 
},
(req,res,next)=>{
    console.log("third Handler");
    next(); // if next Handler is available then go to next handler otherwise go to the next line ;
    res.send("third Handler is here .");
}
)


app.listen(4000,()=>{
    console.log("Server is runing sucessful......");
});