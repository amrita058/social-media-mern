import * as UserRepository from '../Repository'
import {z} from "zod"
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');

import { env } from '../../config';
import { FriendRequestSchema, UserLoginSchema, UserRegisterSchema } from "../../types";
import { CustomError } from '../../libs';

type loginParams = z.infer<typeof UserLoginSchema>
type registerParams = z.infer<typeof UserRegisterSchema>
type friendRequestParams = z.infer<typeof FriendRequestSchema>


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: 'kishimotosekai@gmail.com',
    pass: 'onxwqrvgwiwbebwq',
  },
});

export const loginUser = async (user:loginParams)=>{
    try{
        const validateData = UserLoginSchema.safeParse(user)
        if(!validateData.success){
            const error = new CustomError("Invalid data",401)
            throw error
        }
        else{
            const data = await UserRepository.loginUser(user)
            if(data && await bcrypt.compare(user.password, data.password)){
                // console.log(env.SECRET_KEY,data)
                const token = jwt.sign(data.toJSON(),env.SECRET_KEY)
                return ({token})
            }
            else{
                const error = new CustomError("Invalid password",401)
                error.name="password"
                throw error
            }
        }
    }
    catch(e){
        // console.log('service',e)
        throw e
    }
}

export const registerUser = async (user:registerParams)=>{
    try{
        const validateData = UserRegisterSchema.safeParse(user)
        if(!validateData.success){
            const error = new CustomError("Invalid data",401)
            throw error
        }
        else{
            // console.log("success validation")
            return await UserRepository.registerUser(user)
        }
        
    }
    catch(e){
        throw e
    }
}

export const forgetPassword = async (user:Partial<loginParams>)=>{
    try{
        const data = await UserRepository.forgetPassword(user)
        // console.log(data)
        if(data){
            const token = jwt.sign(data.toJSON(),process.env.SECRET_KEY)
            // console.log("this is token",token,)

            const mailOptions = {
                from: 'kishimotosekai@gmail.com',
                to: 'amritachi58@gmail.com',
                subject: 'Password Reset',
                html: `
                  <p>You've requested a password reset for your account.</p>
                  <p>Click <a href="http://localhost:5173/resetpassword?token=${token}">here</a> to reset your password.</p>
                `,
              };
              
              await transporter.sendMail(mailOptions, (error:any, info:any) => {
                if (error) {
                  console.error('Error sending reset email:', error);
                  throw error
                } else {
                  console.log('Reset email sent:', info.response);
                }
              });
              return "Email Sent"
        }
        else{
            const err = new Error
            err.message = 'Email not found'
            err.name='401'
            throw err
        }
          
    }
    catch(e){
        // console.log(e)
        throw e
    }
}

export const resetPassword = (user:Partial<loginParams>,decoded:any)=>{
    try{
        console.log("here at service resetpass",user,decoded)
        return UserRepository.resetPassword(user,decoded)
    }
    catch(e){
        // console.log(e)
        throw e
    }
}

export const authUser = async(decoded:any)=>{
    try{
        const user = await UserRepository.authUser(decoded)
        return user
    }
    catch(e){
        return e
    }
}

export const updateProfile = (user:Partial<registerParams>,file:any,id:any)=>{
    try{
        return UserRepository.updateProfile(user,file,id)
    }
    catch(e){
        throw e
    }
}

export const friendRequest = async(request:friendRequestParams)=>{
    try{
        // const validateData = FriendRequestSchema.safeParse(request)
        // if(!validateData.success){
        //     const error = new CustomError("Invalid data",401)
        //     throw error
        // }
        // else{
            console.log("here at friend request repo",request)
        return await UserRepository.friendRequest(request)
        // }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getFriendRequest = async(requestid:string,page:number,limit:number)=>{
    try{
        const checkRequest = await UserRepository.getFriendRequest(requestid,page,limit)
        // console.log(checkRequest)
        if(checkRequest){
            return checkRequest
        }
        else{
            return "No requests found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getSentRequest = async(userid:string)=>{
    try{
        return await UserRepository.getSentRequest(userid)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const approveFriendRequest = async(requestid:string,status:string)=>{
    try{
        const checkRequest = await UserRepository.approveFriendRequest(requestid,status)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const viewProfile = async(userid:string)=>{
    try{
        return await UserRepository.viewProfile(userid)
        // console.log(checkRequest)
    }
    catch(e){
        console.log(e)
        throw e
    }
}


export const getFriends = async(requestid:string,page:number,limit:number)=>{
    try{
        const checkRequest = await UserRepository.getFriends(requestid,page,limit)
        // console.log(checkRequest)
        if(checkRequest){
            return checkRequest
        }
        else{
            return "No requests found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const suggestFriends = async(userId:string)=>{
    try{
        const checkSuggestion = await UserRepository.suggestFriends(userId)
        // console.log(checkRequest)
        if(checkSuggestion){
            return checkSuggestion
        }
        else{
            return "No suggestions found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const searchPeople = async(name:any)=>{
    try{
        const checkRequest = await UserRepository.searchPeople(name)
        // console.log(checkRequest)
        if(checkRequest){
            return checkRequest
        }
        else{
            return "No requests found"
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getNotification = async(userid:string)=>{
    try{
        return await UserRepository.getNotification(userid)
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const updateNotification = (id:any)=>{
    try{
        return UserRepository.updateNotification(id)
    }
    catch(e){
        console.log(e)
    }
}