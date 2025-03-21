import express from "express";
const app=express();
// app.use('/user',(req,res)=>{
//     res.send("test is runing...");
// })
app.get('/user/:name/:id',(req,res)=>{
    console.log(req.params);
    res.send("getting data successfully!");
})
// app.post('/user',(req,res)=>{
//     // save the data in data base successfully;

//     res.send("data save succesfully!");
// });
// app.delete('/user',(req,res)=>{
//     res.send("delete the data successfully!");
// })


app.listen(4000,()=>{
    console.log("Server is runing sucessful......");
});