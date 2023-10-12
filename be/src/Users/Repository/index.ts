const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")
import {z} from "zod"
import { UserLoginSchema, UserRegisterSchema } from "../../types"
import { env } from "../../config"
const User = require("../Models/index")
import { CustomError } from "../../libs";
import { ObjectId } from "mongodb";
import { error } from "console";

type loginParams = z.infer<typeof UserLoginSchema>
type registerParams = z.infer<typeof UserRegisterSchema>

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  
  mongoose.connect(env.URI,options)
  mongoose.connection.on('open',()=>{
    // console.log("connected")
  })

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
        console.log(checkUser)
        return checkUser
    }
    catch(e){
        return e
    }
}

export const updateProfile = async(user:Partial<registerParams>,id:any)=>{
    try{
        console.log("st repo0",id)
        const checkUser = await User.findOne({"_id":new ObjectId(id)})
        console.log(checkUser)
        const _id = new ObjectId(id)
        const updateUser = await User.updateOne({"_id":_id},{ $set: { url:user.url } },{new:true})
        // .then(() => {
        //     console.log('Documents updated successfully.');
        //   })
        //   .catch((error:any) => {
        //     console.error('Error updating documents:', error);
        //     throw error
        //   })
        console.log(checkUser,updateUser,user.url)
        return "Profile successfully updated"
    }
    catch(e){
        console.log(error)
        return e
    }
}