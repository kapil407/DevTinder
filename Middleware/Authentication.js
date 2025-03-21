 // authentication
 export const auth=(req,res,next)=>{
    const token='abc';
    const authentication=token==='abc';
    if(!authentication){
        res.status(401).send("unauthorized admin");
    }
    else next();
}
