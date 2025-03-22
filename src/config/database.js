import mongoose from "mongoose";

export const connectDb= async ()=>{
   await mongoose.connect("mongodb+srv://kapilkeer1998:smtbKlczVkp3rIxM@kapildb.pc7gf.mongodb.net/DevTinder");
 };

//  smtbKlczVkp3rIxM -> passward of mongo Db atlas of user name if kapilkeer1998