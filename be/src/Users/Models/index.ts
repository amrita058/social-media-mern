const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
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
  },{
    strict: false
  }
  )

module.exports = mongoose.model("User",userSchema)