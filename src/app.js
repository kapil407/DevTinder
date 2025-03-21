import express from "express";
const app=express();

// app.get('/user/:name/:id',(req,res)=>{
//     console.log(req.params);
//     res.send("getting data successfully!");
// })
app.use('/user',(req,res,next)=>{
        console.log("1 handler!");
        
        next();
   
        // res.send("Rout 1");
},
(req,res,next)=>{
        console.log("2 handler!");
        next(); // if available otherwise go to next line and there is not handler function here ,So ..
        // res.send("Rout 2");
       
},
(req,res,next)=>{
    console.log("3 Handler!!");
    res.send("kapil is here!!!");
}
)



app.listen(4000,()=>{
    console.log("Server is runing sucessful......");
});