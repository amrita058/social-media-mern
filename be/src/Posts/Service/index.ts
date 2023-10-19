import { ObjectId } from "mongodb"
import * as PostRepository from "../Repository"
import { PostSchema } from "../../types"


export const uploadPost =(id:ObjectId,content:string,file:any)=>{
  try{
    const post = {content:content,photo:file}
    const validateData = PostSchema.safeParse(post)
    // console.log("validate data",validateData)
    if (validateData){
      return PostRepository.uploadPost(id,content,file)
    }
    else{
      throw Error("Invalid Data")
    }
  }catch(e){
    console.log("error in file upload",e)
  }
}

export const getPost = async(id:string)=>{
  try{
    // console.log("validate data",validateData)
    return await PostRepository.getPost(id)
 
  }catch(e){
    console.log("error in file upload",e)
  }
}