import { ObjectId } from "mongodb"
import { env } from "../../config"
const Post = require("../Models/index")
const User = require("../../Users/Models/index")


export const uploadPost = async(id:ObjectId,content:string,file:any)=>{
    try{
        if(file===''){
            const newPost = await new Post({userId:id,content:content})
            const insertedPost = await newPost.save()
        }
        else{
            const imageURL = `http://localhost:${env.PORT}/uploaded/${file}`
            const newPost = await new Post({userId:id,content:content,photo:imageURL})
            const insertedPost = await newPost.save()
        }
        return "Post successfully updated"
    }
    catch(error){
        console.log(error)
        throw error
    }
}

export const getPost = async(id:string)=>{
    try{
        console.log("get post repo")
        const userId = new ObjectId(id)
        const user = await User.findById(userId)
        const friends = user.friends.toString().split(",") ?? []
        friends.push(id)
        const posts = await Post.find({})
                    .populate({
                    path: "userId",
                    select: "_id userName url fullName email"
                    })
                    .sort({
                    _id: -1
                    })
        
        const friendposts = posts?.filter((post:any)=>{
            return friends.includes(post.userId._id.toString())
        })
        console.log("all post list",friendposts.length)
        return friendposts
    }
    catch(error){
        console.log(error)
        throw error
    }
}