import mongoose, { Schema } from "mongoose"

const friendRequestSchema = new mongoose.Schema({
    requestFrom:{type: Schema.Types.ObjectId, ref:'User'},
    requestTo:{type: Schema.Types.ObjectId, ref:'User'},
    requestStatus:{type: String, default:"Pending"}
},{
    versionKey: false, 
  }
  )

module.exports = mongoose.model("FriendRequest",friendRequestSchema)