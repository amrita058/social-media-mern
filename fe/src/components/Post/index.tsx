import {useDispatch, useSelector} from 'react-redux'
import { clickedPost } from '../../features/slice'
import { useEffect, useState } from 'react'
import CommentPostModal from '../Model/CommentPost'
import axios from 'axios'
import { toast } from 'react-toastify'

const Posts =()=>{
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [showCommentForm,setshowCommentForm] = useState(false)
    const [posts, setPosts] = useState<any>([])


    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

    useEffect(()=>{
        const fetch = async()=>{
            await axios.get(`http://localhost:7000/api/posts/user/651faeafce94d796cca97898`,{
                headers:{
                    Authorization: `${token}`
                }
            })
            .then((res)=>{
                console.log("posts data only",res.data)
                setPosts(res.data)
            })
            .catch((err)=>{
                console.log(err)
                toast.error("Unable to fetch any posts")
            })
        }
        fetch()
    },[])

    const onClose =()=>{
        setshowCommentForm(false)
      }

    return(
        <>
            <div>
            {showCommentForm?<CommentPostModal onClose={onClose}/>:<></>}
            </div>
            <div className=''>
              {posts.map((item:any,idx:number)=>{
                return<div key={idx} className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} rounded-md mb-5 py-3 px-6`}>
                    <div key={idx} className={`flex rounded-md items-center`}>
                        <div>
                            <img src={item.userId.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                        </div>
                        <div>
                            <p className={`text-md w-full text-left rounded-md`}>
                                {item.userId.userName}
                            </p>
                            <p className='text-[10px]'>October 17</p>
                        </div>
                    </div>
                    <div className='ml-12'>
                        <p>{item.content}</p>
                    </div>
                    <div className='ml-12'>
                        <img src={item.photo} className='w-full'/>
                    </div>
                    <div className='flex ml-12 gap-4'>
                        <button className={`flex-1 text-[12px] text-center ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} ><i className="fa-solid fa-heart mr-2 text-green-500"></i>Like</button>
                        <button className={`flex-1 text-[12px] text-center ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} onClick={()=>{dispatch(clickedPost({userName:item.userId.userName,url:item.userId.url,content:item.content,photo:item.photo,date:'October 16'}));setshowCommentForm(true)}} ><i className="fa-solid fa-comment mr-2 text-yellow-500"></i>Comment</button>
                    </div>
                </div>
            })}
            </div>
        </>
    )
}

export default Posts