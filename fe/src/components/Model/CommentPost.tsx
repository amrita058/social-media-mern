import React, { useRef, useState } from 'react';
import { useForm, SubmitHandler} from 'react-hook-form';
import {z} from "zod"
import axios from 'axios';
import {toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { CommentPostSchema } from '../../types/type';
import { zodResolver } from '@hookform/resolvers/zod';


interface CommentModalProps {
  onClose: () => void;
}

type AddPostParams = z.infer<typeof CommentPostSchema>

const CommentPostModal: React.FC<CommentModalProps> = ({onClose}) => {
    const token = localStorage.getItem("token")

    const theme = useSelector((state:any)=>{
        return state.theme.dark
    })

    const user = useSelector((state:any)=>{
        return state.user
    })

    const postInfo = useSelector((state:any)=>{
        // console.log("at comment model",state.postInfo)
        return state.postInfo
    })

    const {
        register,
        handleSubmit,
        // reset,
        // watch,
        // formState: { errors },
    } = useForm<AddPostParams>({resolver:zodResolver(CommentPostSchema)});

    const onSubmit: SubmitHandler<AddPostParams> = async (data,e) => {
      e?.preventDefault()
      // const formData = new FormData();
      // console.log("form data here",formData,userImage,data.content)
      // for (var [key, value] of formData.entries()) { 
      //   console.log("formdata",key, value);}
      axios.post(`http://localhost:7000/api/posts/:id/comment`,data,{
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        }})
      .then(res=>{console.log("Ack state",res.data)
        toast.success("Success",{theme:theme?"dark":"light"})
        onClose()
      })
      .catch(error=>{console.log(error)
      toast.error(error.message,{theme:theme?'dark':'light'})})
      // console.log(data);
      // reset();
    };

    const handleClick =(state:string)=>{
      if(state=="close")
      {
        onClose()
      }
    }
    
    const onError =(e:any)=>{
        console.log(e)
    }

  return (
    <>
        <div className="fixed top-0 left-0 min-h-screen w-full z-[100] flex justify-center items-center bg-black bg-opacity-80"  onClick={()=>handleClick("close")}></div>
        
        <div className={`fixed left-0 top-[30%] sm:left-[30%] z-[105] rounded-md ${theme?'shadow-[#3f3f3f]':'shadow-[#3b3b3b]'}  shadow-2xl w-full sm:w-[40%]`}>
            {/* <div className={`flex justify-between ${theme?'bg-[#3d3d3d] border-[#575757]':'bg-[#f3f2f2] border-[#b1b0b0]'}  rounded-t-lg p-1 `}>
            </div> */}
            <form  className={` ${theme?'border-[#575757] bg-[#3d3d3d]':'bg-[#f3f2f2] border-[#8b8b8b]'} flex flex-col gap-5 p-5 rounded-lg`} encType="multipart/form-data" onSubmit={handleSubmit(onSubmit,onError)}>
                <div className={`flex flex-col ${theme?'text-[#c4c3c3]':'text-[#727272]'} shadow-md shadow-black p-2`}>
                <div className='flex'>
                    <div>
                        <img src={postInfo.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                    </div>
                    <div>
                        <p className={`text-md w-full text-left rounded-md`}>
                            {postInfo.userName}
                        </p>
                        <p className='text-[10px]'>{postInfo.date}</p>
                    </div>
                </div>
                <div className='ml-12'>
                        <p>{postInfo.content}</p>
                    </div>
                    <div className='ml-12'>
                        <img src={postInfo.photo} className='w-full'/>
                    </div>
                </div>

                <div className='flex gap-4 justify-between items-center'>
                    <input type='text' placeholder='Comment' {...register('comment')} className={`${theme?'text-[#c4c3c3] bg-transparent border-2 border-[#555555]':'text-[#555555] bg-transparent'} w-[80%] focus:outline-none focus:border-[#aa77f0]`} />
                    <button type="submit" className={`border-2 border-[#888787] rounded-md px-2 py-2 ${theme?'bg-[#1a1919] bg-opacity-50 hover:bg-opacity-80 text-[#ffffff]':'bg-[#1a1919] bg-opacity-5 hover:bg-[#e9ebee] hover:bg-opacity-60 text-[#232323]'} `}>"arrow"</button>
                </div>                
                {/* <button type="submit" className={`border-2 border-[#888787] rounded-md px-2 py-2 ${theme?'bg-[#1a1919] bg-opacity-50 hover:bg-opacity-80 text-[#ffffff]':'bg-[#1a1919] bg-opacity-5 hover:bg-[#e9ebee] hover:bg-opacity-60 text-[#232323]'} ${!contentInput?'cursor-not-allowed':''}`} disabled={!contentInput} >Post</button> */}
            </form>
        </div>
    </>
  );
};

export default CommentPostModal;
