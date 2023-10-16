import { env } from "../../config"
const Post = require("../Models/index")


export const uploadPost = async(content:string,file:any)=>{
    try{
        const imageURL = `http://localhost:${env.PORT}/uploaded/${file}`
        const newPost = await new Post({content:content,photo:imageURL})
        const insertedPost = await newPost.save()
        return "Post successfully updated"
    }
    catch(error){
        console.log(error)
        throw error
    }
}