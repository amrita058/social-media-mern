import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    content:String,
    photo:String,
},{
    versionKey: false, 
  },
  )

module.exports = mongoose.model("Post",postSchema)