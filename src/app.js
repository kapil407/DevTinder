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

app.use('/admin',auth);

app.get('/admin/getdata',(req,res,next)=>{
        console.log("Admin");
        res.send("get data ");
});
app.get('/admin/DeleteAllData',(req,res)=>{
    res.send("delete all data");
})
app.use('/user/logging',(req,res)=>{  // we do not need authenticate for logging 
        res.send("logging succesfully!!");
});

app.use('/user/getdata',UserAuth,(req,res)=>{
    console.log("getting data");
    res.send("sent data");
});

app.use('/',(req,res)=>{
    try{
    throw new Error("Something went wrong!");
    res.send("data fetch sucessfully!!");
    }
    catch(err){
        res.send("went wrong ");
    }


});
app.use('/',(err,req,res,next)=>{
    res.status(500).send("some thing went wrong");
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