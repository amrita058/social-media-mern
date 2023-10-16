import { Request, Response, NextFunction } from 'express'
import * as UserService from "../Service"

declare module 'express' {
    export interface Request {
      user?: any;
    }
  }

export const registerUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.registerUser(req.body))
    }
    catch(e){
        next(e)
    }
}

export const loginUser = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        res.status(201).json(await UserService.loginUser(req.body))
    }
    catch(e){
       next(e)
    }
}

export const forgetPassword = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.forgetPassword(req.body))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const resetPassword = async (req:Request,res:Response)=>{
    try{
        console.log("at reset password",req.user,req.body)
        res.status(201).json(await UserService.resetPassword(req.body,req.user))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const authUser = async (req:Request,res:Response)=>{
    try{
        // console.log("at auth user",req.user)
        res.status(201).json(await UserService.authUser(req.user))
    }
    catch(e){
        res.status(500).json(e)
    }
}


export const updateProfile = async (req:Request,res:Response)=>{
    try{
        // console.log("update profile controller",req.params)
        // console.log("body here",req.body.email,req.file.filename)
        res.status(201).json(await UserService.updateProfile(req.body,req.file.filename,req.params))
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const friendPost = async (req:Request,res:Response)=>{
    try{
        // console.log("update profile controller",req.params)
        console.log("body here",req.body)
        res.status(201).json("Successfully reached post")
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const friendRequest = async (req:Request,res:Response)=>{
    try{
        console.log("reached here at controller",req.body,req.query)
        res.status(201).json(await UserService.friendRequest(req.body))
    }
    catch(e){
        console.log("error at controller",e)
        res.status(500).json(e)
    }
}

export const getFriendRequest = async(req:Request,res:Response)=>{
    try{
        console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(UserService.getFriendRequest(req.params.id,Number(req.query.page),Number(req.query.limit)))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const approveFriendRequest = async(req:Request,res:Response)=>{
    try{
        res.status(201).json(UserService.approveFriendRequest(req.body._id,req.body.status))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}