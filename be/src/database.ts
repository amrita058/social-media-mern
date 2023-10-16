import mongoose from "mongoose";
import { env } from "./config";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  export const connectDB =()=>{
    if(env.URI!=undefined){
      mongoose.connect(env.URI)
      mongoose.connection.on('open',()=>{
        console.log("connected")
      })
    }
  }
