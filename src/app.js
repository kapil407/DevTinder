import express from "express";
const app=express();
app.use('/Home',(req,res)=>{
    res.send("kapil kumar is here and u also know me ");
})
app.use('/test',(req,res)=>{
    res.send("test is runing...");
})
app.use('/k',(req,res)=>{
    res.send("kkkkk....");
})
app.listen(4000,()=>{
    console.log("Server is runing sucessful......");
});