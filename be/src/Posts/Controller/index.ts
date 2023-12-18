import { Request, Response, NextFunction } from 'express'
import * as PostService from "../Service"

export const uploadPost = async (req:Request,res:Response)=>{
    try{
        console.log("upload post controller",req.body,req.file)
        // console.log(req.body,req)
        if(!req.file){
            res.status(201).json(await PostService.uploadPost(req.body.userId,req.body.content,""))
        }
        else{
            res.status(201).json(await PostService.uploadPost(req.body.userId,req.body.content,req.file.filename))
        }
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getPost = async (req:Request,res:Response)=>{
    try{
        console.log("at post controller",req.params.id,req.query)
        res.status(201).json(await PostService.getPost(req.params.id,Number(req.query.page),Number(req.query.limit)))
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const deletePosts = async (req:Request,res:Response)=>{
    try{
        // console.log(req.params.id)
        res.status(201).json(await PostService.deletePosts(req.params.id))
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const postComments = async (req:Request,res:Response)=>{
    try{
        // console.log(req.body.comment)
        res.status(201).json(await PostService.postComments(req.params.id,req.user._id,req.body.comment))
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const getComments = async (req:Request,res:Response)=>{
    try{
        // console.log(req.params.id)
        res.status(201).json(await PostService.getComments(req.params.id))
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const deleteComments = async (req:Request,res:Response)=>{
    try{
        // console.log(req.params.id)
        res.status(201).json(await PostService.deleteComments(req.params.id))
    }
    catch(e){
        console.log(e)
        throw e
    }
}

export const likePost = async (req:Request,res:Response)=>{
    try{
        // console.log(req.body.comment)
        res.status(201).json(await PostService.likePost(req.params.id,req.user._id))
    }
    catch(e){
        console.log(e)
        throw e
    }
}