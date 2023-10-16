import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:String,
    userName:String,
    fullName:String,
    password:String,
    url: {
      type: String,
      required: false,
  },
},{
    versionKey: false, 
  }
  )

module.exports = mongoose.model("User",userSchema)