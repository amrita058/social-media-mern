import { Request, Response, NextFunction } from 'express'
import * as UserService from "../Service"

export const uploadPost = (req:Request,res:Response)=>{
    try{
        console.log("update profile controller")
        // console.log(req.body,req)
        res.status(201).json(UserService.uploadPost(req.body.photo))
    }
    catch(e){
        console.log(e)
        throw e
    }
}