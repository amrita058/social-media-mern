import mongoose, { Schema } from "mongoose"

const notificationSchema = new mongoose.Schema({
    sender:{type: Schema.Types.ObjectId, ref:'User'},
    receiver:{type: Schema.Types.ObjectId, ref:'User'},
    message:{type: String},
    status:{type: String, default:"Unread"}
},{
    versionKey: false, 
  }
  )

module.exports = mongoose.model("Notification",notificationSchema)