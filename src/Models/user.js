import mongoose from "mongoose";
import validator from "validator";



const UserSchema=new mongoose.Schema({
        firstName:{
            type:String,
            minLength:[4,"nameLength must be atleast 4 character"],
            required:true
        },
        lastName:{
            type:String
        },
        emailId:{
            type:String,
            required:true,
            
            // ye ek baar karne par hames ake liye parmanent ho jata hai jab tak ki ham khud manually use delete na kare
            unique:true,
            
            lowercase:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Enter valid emailId");
                    
                }
            }
        },
        passward:{
            type:String,
            required:true,
            min:5,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("Enter the strong passward");
                    
                }
            }
        },
        age:{
            min:18,
            type:Number
        },
        gender:{
            type:String,
            validate(value){
                if(!['female','male',"others"].includes(value)){
                    throw new Error("Gender data is not valid");
                }
            }
        },
        photoUrl:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJLVSOeU7rDLuzvdW8l26a3gjEsYvigQ_hg&s"
        },
        skills:{
            type:[String]
        }
    },
    {
    timestamps:true
    }
);
export const user=mongoose.model("User",UserSchema); // first document made for whom and second is its schema name 
