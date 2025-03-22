import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
        firstName:{
            type:string
        },
        lastName:{
            type:string
        },
        emailId:{
            type:string
        },
        passward:{
            type:string
        },
        age:{
            type:Number
        },
        gender:{
            type:string
        }



});
export const User=mongoose.model("User",UserSchema); // first document made for whom and second is its schema name 
