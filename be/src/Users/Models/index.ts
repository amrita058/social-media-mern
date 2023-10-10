const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:String,
    userName:String,
    fullName:String,
    password:String
},{
    versionKey: false, 
  })

module.exports = mongoose.model("User",userSchema)