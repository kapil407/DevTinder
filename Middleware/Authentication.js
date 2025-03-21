 // authentication
 export const auth=(req,res,next)=>{
    const token='abc';
    const authentication=token==='abc';
    if(!authentication){
        res.status(401).send("unauthorized admin");
    }
    else next();
}
export const UserAuth=(req,res,next)=>{
            const token="xyz";
            const authenticate=token==='xyz';
            if(!authenticate){
                res.status.send(401);
            }
            else next();
}