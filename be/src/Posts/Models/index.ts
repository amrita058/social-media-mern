import mongoose, { Schema } from "mongoose"

const postSchema = new mongoose.Schema({
    content: {type: String, required:true},
    photo: String,
    userId : {type: Schema.Types.ObjectId, ref: 'User'},
    likes: [String],
    comments: [{type: Schema.Types.ObjectId, ref:'Comments'}]
},{
    versionKey: false, 
    timestamps: true
  },
  )

module.exports = mongoose.model("Post",postSchema)