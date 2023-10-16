import * as PostRepository from "../Repository"


export const uploadPost =(content:string,file:any)=>{
  try{
    console.log("reached here at upload post service")
    return PostRepository.uploadPost(content,file)

  }catch(e){
    console.log("error in file upload",e)
  }
}
