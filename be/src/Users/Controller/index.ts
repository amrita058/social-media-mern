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
        console.log("at auth user",req.user)
        res.status(201).json(await UserService.authUser(req.user))
    }
    catch(e){
        res.status(500).json(e)
    }
}


export const updateProfile = async (req:Request,res:Response)=>{
    try{
        console.log("update profile controller",req.params)
        res.status(201).json(await UserService.updateProfile(req.body,req.params))
    }
    catch(e){
        res.status(500).json(e)
    }
}