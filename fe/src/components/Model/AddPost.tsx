import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray, useWatch } from 'react-hook-form';
import {z} from "zod"
// import { IItems } from '../../types/User';
import axios from 'axios';
import {toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AddPostSchema } from '../../types/type';
import { zodResolver } from '@hookform/resolvers/zod';


interface AddItemModalProps {
  onClose: () => void;
}

type AddPostParams = z.infer<typeof AddPostSchema>

const AddItemModal: React.FC<AddItemModalProps> = ({onClose}) => {
  const theme = useSelector((state:any)=>{
    // console.log(state.theme)
    return state.theme.dark
  })

  const user = useSelector((state:any)=>{
    return state.user
  })

    const {
        register,
        handleSubmit,
        reset,
        watch,
        // formState: { errors },
      } = useForm<AddPostParams>({resolver:zodResolver(AddPostSchema)});
      const [userImage, setUserImage] = useState<any>(); 


      // const { fields,append, remove } = useFieldArray({
      //   name: "files" // unique name for your Field Array
      //   // keyName: "id", default to "id", you can change the key name
      // });

      // const files = useWatch({
      //   name: "files"
      // });

      // function openFileDialog(index: any) {
      //   (document as any).getElementById("file-upload-" + index).click();
      // }
    
      // const setFile = (index: number, _event: any) => {
      //   methods.setValue(`files[${index}].file` as any, _event.target.files[0]);
      //   methods.setValue(
      //     `files[${index}].title` as any,
      //     _event.target.files[0]?.name
      //   );
      // };

      const contentInput = watch('content')

      const onSubmit: SubmitHandler<AddPostParams> = async (data,e) => {
        e?.preventDefault()
        const formData = new FormData();
        formData.append('file', userImage);
        formData.append('content', data.content);
        // console.log("form data here",formData,userImage,data.content)
        // for (var [key, value] of formData.entries()) { 
        //   console.log("formdata",key, value);}
        await axios.post("http://localhost:7000/api/upload",formData, { 
          headers: { "Content-Type": "multipart/form-data" }})
        .then(res=>{console.log("Ack state",res.data)
          toast.success("Success",{theme:theme?"dark":"light"})
          // onClose()
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
            <div className={`flex justify-between ${theme?'bg-[#3d3d3d] border-[#575757]':'bg-[#f3f2f2] border-[#b1b0b0]'}  rounded-t-lg p-1 `}>
                <p className={`w-full ${theme?'text-[#aa77f0] bg-black bg-opacity-20 ':'text-[#aa77f0] bg-[#d2d1d1]'} font-semibold text-xl px-2 py-[2px] font-sans rounded-tl-lg`}>Craft a Post</p>
                <button onClick={()=>onClose()} className={`${theme?'text-white bg-[#3d3d3d]':'bg-[#f3f2f2] text-[#232323]'} text-xl px-2 hover:bg-red-500 rounded-tr-lg`}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <form  className={` ${theme?'border-[#575757] bg-[#3d3d3d]':'bg-[#f3f2f2] border-[#8b8b8b]'} flex flex-col gap-5 p-5 rounded-b-lg`} encType="multipart/form-data" onSubmit={handleSubmit(onSubmit,onError)}>
                <div className={`flex ${theme?'text-[#c4c3c3]':'text-[#727272]'}`}>
                    <img src={user.url} className='w-7 h-7 rounded-full mr-2'/>{user.userName}
                </div>
                <div className='flex gap-4 justify-between items-center'>
                    <textarea placeholder={`What's happening, ${user.userName}?`} {...register('content')} className={`${theme?'text-[#c4c3c3] bg-transparent':'text-[#555555] bg-transparent'} w-full focus:outline-none`} />
                </div>
                {/* {errors.content && <p className='text-red-400'>{errors.content.message}</p>} */}

                <div className='flex gap-4 justify-between items-center'>
                    <input type="file" placeholder='Enter image URL' {...register('file')} className={`${theme?'text-[#c4c3c3] bg-black':'text-[#555555] bg-transparent'} bg-opacity-5 focus:outline-none`} onChange={(e)=>{setUserImage(e.target.files?e.target.files[0]:null)}} />
                </div>
                {/* {errors.photo && <p className='text-red-400'>{errors.photo.message}</p>} */}
                
                <button type="submit" className={`border-2 border-[#888787] rounded-md px-2 py-2 ${theme?'bg-[#1a1919] bg-opacity-50 hover:bg-opacity-80 text-[#ffffff]':'bg-[#1a1919] bg-opacity-5 hover:bg-[#e9ebee] hover:bg-opacity-60 text-[#232323]'} ${!contentInput?'cursor-not-allowed':''}`} disabled={!contentInput} >Post</button>
            </form>
        </div>
    </>
  );
};

export default AddItemModal;
