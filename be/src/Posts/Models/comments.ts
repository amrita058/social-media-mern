import mongoose, { Schema } from "mongoose"

const commentSchema = new mongoose.Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'User'},
    postId: {type: Schema.Types.ObjectId, ref:'Post'},
    comment: {type: String, required:true},
},{
    versionKey: false, 
  },
  )

module.exports = mongoose.model("Comments",commentSchema)