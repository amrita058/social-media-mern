import { Request, Response, NextFunction } from 'express'
import * as PostService from "../Service"

export const uploadPost = (req:Request,res:Response)=>{
    try{
        console.log("upload post controller",req.body,req.file)
        // console.log(req.body,req)
        res.status(201).json(PostService.uploadPost(req.body.content,req.file.filename))
    }
    catch(e){
        console.log(e)
        throw e
    }
}