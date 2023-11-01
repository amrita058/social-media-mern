import { Request, Response, NextFunction } from 'express'
import * as UserService from "../Service"

// declare module 'express' {
//     export interface Request {
//       user?: any;
//     }
//   }

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
        if(!req.file){
            res.status(201).json(await UserService.updateProfile(req.body,"",req.params))
        }
        else{
            res.status(201).json(await UserService.updateProfile(req.body,req.file.filename,req.params))
        }
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const friendPost = async (req:Request,res:Response)=>{
    try{
        // console.log("update profile controller",req.params)
        // console.log("body here",req.body)
        res.status(201).json("Successfully reached post")
    }
    catch(e){
        res.status(500).json(e)
    }
}

export const friendRequest = async (req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.body)
        res.status(201).json(await UserService.friendRequest(req.body))
    }
    catch(e){
        console.log("error at controller",e)
        res.status(500).json(e)
    }
}

export const getFriendRequest = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(await UserService.getFriendRequest(req.params.id,Number(req.query.page),Number(req.query.limit)))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const getSentRequest = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(await UserService.getSentRequest(req.user._id))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const approveFriendRequest = async(req:Request,res:Response)=>{
    try{
        console.log(req.body._id,req.body.status)
        res.status(201).json(UserService.approveFriendRequest(req.body._id,req.body.status))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const viewProfile = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id)
        res.status(201).json(await UserService.viewProfile(req.params.id))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const getFriends = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(await UserService.getFriends(req.params.id,Number(req.query.page),Number(req.query.limit)))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const suggestFriends = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(await UserService.suggestFriends(req.user))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const searchPeople = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.query)
        res.status(201).json(await UserService.searchPeople(req.query.name))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const getNotification = async(req:Request,res:Response)=>{
    try{
        // console.log("reached here at controller",req.params.id,req.query)
        res.status(201).json(await UserService.getNotification(req.params.id))
    }
    catch(e){
        console.log(e)
        res.status(500).json(e)
    }
}

export const updateNotification = async (req:Request,res:Response)=>{
    try{
        res.status(201).json(await UserService.updateNotification(req.params.id))
    }
    catch(e){
        res.status(500).json(e)
    }
}