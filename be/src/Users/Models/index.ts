import mongoose, { Schema } from "mongoose"

const userSchema = new mongoose.Schema({
    email:String,
    userName:String,
    fullName:String,
    password:String,
    url: {
      type: String,
      default:'https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg',
      required: false,
    },
    friends: {
      type: [{type: Schema.Types.ObjectId, ref:'User'}],
      default:[]
    }
},{
    versionKey: false, 
  }
  )

module.exports = mongoose.model("User",userSchema)