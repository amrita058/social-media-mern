import { Request, Response, NextFunction } from 'express'
import * as PostService from "../Service"

export const uploadPost = (req:Request,res:Response)=>{
    try{
        console.log("upload post controller",req.body,req.file)
        // console.log(req.body,req)
        if(!req.file){
            res.status(201).json(PostService.uploadPost(req.body.userId,req.body.content,""))
        }
        else{
            res.status(201).json(PostService.uploadPost(req.body.userId,req.body.content,req.file.filename))
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getPost = async (req:Request,res:Response)=>{
    try{
        // console.log(req.params.id)
        res.status(201).json(await PostService.getPost(req.params.id))
    }
    catch(e){
        console.log(e)
        throw e
    }
}