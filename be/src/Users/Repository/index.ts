const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
// const mongoose = require("../../database")
import {z} from "zod"
import { FriendRequestSchema, UserLoginSchema, UserRegisterSchema } from "../../types"
import { env } from "../../config"
const User = require("../Models/index")
const Post = require("../../Posts/Models/index")
const Notification = require("../Models/notification")

const FriendRequest = require("../Models/friendRequest.ts")
import { CustomError } from "../../libs";
import { ObjectId } from "mongodb";

type loginParams = z.infer<typeof UserLoginSchema>
type registerParams = z.infer<typeof UserRegisterSchema>
type friendRequestParams = z.infer<typeof FriendRequestSchema>


export const registerUser = async(user:registerParams)=>{
    try{
        const checkUserName = await User.findOne({"userName":user.userName})
        const checkEmail = await User.findOne({"email":user.email})
        // console.log(checkEmail,checkUserName)
        if(checkUserName){
            const error = new CustomError("Username taken",401)
            error.name = 'userName'
            throw error
            
        }
        if(checkEmail){
            const error = new CustomError("Email taken",401)
            error.name = 'email'
            throw error
        }
        user.password = await bcrypt.hash(user.password, 10)
        const newUser = await new User(user)
        // newUser.url = "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg"
        const insertedUser = await newUser.save()
                                .then((savedUser:registerParams) => {
                                        // console.log('New user saved:', savedUser);
                                    })
                                    .catch((error:Error) => {
                                        error.message = "Server error"
                                        throw error
                                    })
        return "User successfully inserted"
    }
    catch(e){
        throw e
    }
}

export const loginUser = async (user:loginParams)=>{
    try{
        const data = await User.findOne({"email":user.email})
        // console.log("At repo",data)
        if(data){
            return data
        }
        else{
            const error = new CustomError("Email not found",401)
            error.name ="email"
            throw error
        }
    }
    catch(e){
        throw e
    }
}

export const forgetPassword= async(user:Partial<loginParams>)=>{
    try{
        const data = await User.findOne({"email":user.email})
        // console.log("At repo",data)
        return data
    }
    catch(e){
        // console.log(e)
        throw e
    }
}

export const resetPassword= async(user:Partial<loginParams>,decoded:any)=>{
    try{
        // console.log("finding email from decoded value at repo reset",User,decoded.email,user.password)
        const hashedPassword = await bcrypt.hash(user.password,10)
        const updateUser = await User.updateOne({"email":decoded.email},{ "password":hashedPassword}).then(() => {
            // console.log('Documents updated successfully.');
          })
          .catch((error:any) => {
            // console.error('Error updating documents:', error);
            throw error
          })
        return "Password updated"
    }
    catch(e){
        return e
    }
}

export const authUser = async (decoded:any)=>{
    try{
        const checkUser = await User.findOne({_id:decoded._id}).select('-password')
        // const {_id,userName,email,fullName} = decoded
        // const userInfo = {
        //     _id:_id,
        //     userName:userName,
        //     email:email,
        //     fullName:fullName,
        // }
        // console.log(checkUser)
        return checkUser
    }
    catch(e){
        return e
    }
}

export const updateProfile = async(user:Partial<registerParams>,file:any,id:any)=>{
    try{
        // console.log("at updateProfile repo",id,file,user)
        const checkUser = await User.findOne({"_id":new ObjectId(id)})
        if(checkUser){
            const _id = new ObjectId(id)
            if(file!==""){
                const imageURL = `http://localhost:${env.PORT}/uploaded/${file}`
                const updateUser = await User.updateOne({"_id":_id},{ $set: { url:imageURL,fullName:user.fullName } },{new:true})
            }
            else{
                const updateUser = await User.updateOne({"_id":_id},{ $set: {fullName:user.fullName } },{new:true})
            }  
        }
        else{
            throw Error("User not found")
        }
        return "Profile successfully updated"
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const friendRequest = async(request:friendRequestParams)=>{
    try{
        const requestFrom_id = new ObjectId(request.requestFrom)
        const requestTo_id = new ObjectId(request.requestTo)
        // console.log("body at repo",requestFrom_id,requestTo_id)
        const checkSendRequest = await FriendRequest.findOne({requestFrom:requestFrom_id,requestTo:requestTo_id})
        const checkReceivedRequest = await FriendRequest.findOne({requestFrom:requestTo_id,requestTo:requestFrom_id})
        // console.log("request from db",checkSendRequest,checkReceivedRequest)
        if(checkSendRequest || checkReceivedRequest){
            throw Error("Friend request already sent")
        }
        else{
            const newRequest = await new FriendRequest(request) 
            const insertedRequest = await newRequest.save()
            // console.log("inserted request here",insertedRequest)
            return insertedRequest
        }
        
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getFriendRequest = async(requestid:string,page:number,limit:number)=>{
    try{
        const id = new ObjectId(requestid)
        const checkRequest = await FriendRequest.find({requestTo:id,requestStatus:"Pending"})
        .populate({
            path: "requestFrom",
            select: "userName fullName url email friends"
        })
        // .skip((page-1)*limit)
        // .limit(limit)
        .sort({
            _id:-1
        })
        // console.log(checkRequest,"at repo")
        if(checkRequest){
            return checkRequest
        }
        else{
            return "No request found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getSentRequest = async(userid:string)=>{
    try{
        const id = new ObjectId(userid)
        const checkRequest = await FriendRequest.find({requestFrom:id,requestStatus:"Pending"})
        // console.log(checkRequest,"at repo")
        if(checkRequest){
            const sentRequestUsersList = checkRequest.map((user:any)=>user.requestTo)
            return sentRequestUsersList
        }
        else{
            return []
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const approveFriendRequest = async(requestid:string,status:string)=>{
    try{
        const id = new ObjectId(requestid)
        const checkRequest = await FriendRequest.findById(id)
        // console.log("here at repo check request",checkRequest)
        if(!checkRequest){
            return "No request found"
        }
        else{
            const updateRequest = await FriendRequest.findByIdAndUpdate({_id:id},{requestStatus:status})
            if(status==="Approved"){
                // console.log("user and friend",checkRequest.requestTo,checkRequest.requestFrom)
                const user = await User.findById(checkRequest.requestTo)
                user.friends.push(checkRequest.requestFrom)
                await user.save()

                const friend = await User.findById(checkRequest.requestFrom)
                friend.friends.push(checkRequest.requestTo)
                await friend.save()
                return updateRequest
            }
            else{
                const deleteRequest = await FriendRequest.findByIdAndDelete(id)
                return deleteRequest
            }
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

// GET USERS POST + USER DETAILS
export const viewProfile = async(userid:string)=>{
    try{
        const posts = await Post.find({userId:new ObjectId(userid)})
                    .populate({
                    path: "userId",
                    select: "_id userName url fullName email friends"
                    })
                    .sort({
                    _id: -1
                    })
        console.log(posts)
        if(posts.length===0){
            const user = await User.findOne({_id:new ObjectId(userid)})
            return user
        }
        return posts
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getFriends = async(requestid:string,page:number,limit:number)=>{
    try{
        // console.log("get post repo")
        const userId = new ObjectId(requestid)
        const user = await User.findById(userId)
        const friends = user.friends.toString().split(",") ?? []

        const users = await User.find({})
        .skip((page-1)*limit)
        .limit(limit)
        .sort({
            _id:-1
        })

        const friendsdetail = users?.filter((user:any)=>{
            return friends.includes(user._id.toString())
        })

        // console.log(friendsdetail,"at repo")
        if(friendsdetail){
            return friendsdetail
        }
        else{
            return "No friends found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const suggestFriends = async(userId:string)=>{
    try{
        let suggest:any = {}
        suggest._id = {$ne:userId}
        suggest.friends = {$nin:userId}
        const result = await User.find(suggest)
                        .select("userName fullName url  email")
        console.log(result)
        return result
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const searchPeople = async(name:any)=>{
    try{
        const users = await User.find({})
        .sort({
            _id:-1
        })

        const filterUsers = users?.filter((user:any)=>{
            return user.userName.toLowerCase().includes(name.toLowerCase())
        })


        if(filterUsers){
            return filterUsers
        }
        else{
            return "No users found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getNotification = async(userid:string)=>{
    try{
        const userId = new ObjectId(userid)
        const notifications = await Notification.find({receiver:userId})
        .populate({
            path: "sender",
            select : "userName url"
        })
        .sort({
            _id:-1
        })
        console.log("notification here",notifications)
        const filteredNotifications = notifications.filter((notification:any) => 
            !notification.sender._id.equals(notification.receiver)
        );

        return filteredNotifications
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const updateNotification = async(id:any)=>{
    try{
        // const notification = database.collection('notification')
        const check = await Notification.findOne({"_id":new ObjectId(id)})
        if(check){
            const update = await Notification.updateOne({"_id":new ObjectId(String(id))},{"$set": { "status":"Read"}})
            return update
        }
    }
    catch(e){
        throw e
    }
}