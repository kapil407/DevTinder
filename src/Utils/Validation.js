
import validator from 'validator'
export const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,passward}=req.body;
    if(!firstName){
        throw new Error("Enter the firstName");
        
    }
    if(!lastName){
        throw new Error("Enter the lastName");
        
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Enter the valid email");
    }
    else if(!validator.isStrongPassword(passward)){
        throw new Error("Enter the strong passward");
        
    }

}