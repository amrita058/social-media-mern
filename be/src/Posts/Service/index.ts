import { ObjectId } from "mongodb"
import * as PostRepository from "../Repository"
import { PostSchema } from "../../types"


export const uploadPost = async (id:ObjectId,content:string,file:any)=>{
  try{
    const post = {content:content,photo:file}
    const validateData = PostSchema.safeParse(post)
    // console.log("validate data",validateData)
    if (validateData){
      return await PostRepository.uploadPost(id,content,file)
    }
    else{
      throw Error("Invalid Data")
    }
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const getPost = async(id:string,page:number,limit:number)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.getPost(id,page,limit)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const deletePosts = async(postId:string)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.deletePosts(postId)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const postComments = async(postId:string,userId:any,comment:string)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.postComments(postId,userId,comment)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const getComments = async(postId:string)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.getComments(postId)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const deleteComments = async(commentId:string)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.deleteComments(commentId)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}

export const likePost = async(postId:string,userId:any)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.likePost(postId,userId)
 
  }catch(e){
    console.log("error in file upload",e)
    throw e
  }
}