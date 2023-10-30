import {useDispatch, useSelector} from 'react-redux'
import { clickedPost } from '../../features/slice'
import { useEffect, useState } from 'react'
import CommentPostModal from '../Model/CommentPost'
import axios from 'axios'
// import axios from 'axios'
// import { toast } from 'react-toastify'

const Posts =(props:any)=>{
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [showCommentForm,setshowCommentForm] = useState(false)
    const [like, setLike] = useState(false)
    // const [loading,setLoading] = useState(true)

    const user = useSelector((state:any)=>{
        return state.user
      })
    const theme = useSelector((state:any)=>{
        return state.theme.dark
    })

    useEffect(()=>{
        if(props){
            setLike(props.post.likes.includes(user._id))
        }
    },[props])


    const onClose =()=>{
        setshowCommentForm(false)
    }

    const handleLike =async (id:string)=>{
        await axios.post(`http://localhost:7000/api/posts/${id}/like`,{},{
            headers:{
                Authorization: `${token}`
            }
        })
        .then(res=>{setLike(!like);console.log(res)})
        .catch(err=>console.log(err))
    }

    return(
        <>
        {!props?<div className='mt-28 text-white'>Loading...</div>:<>
            <div>
            {showCommentForm?<CommentPostModal onClose={onClose}/>:<></>}
            </div>
            <div className=''>
              {/* {posts.map((item:any,idx:number)=>{ */}
                <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} rounded-md mb-5 py-3 px-6`}>
                    <div  className={`flex rounded-md items-center`}>
                        <div>
                            <img src={props.post.userId.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                        </div>
                        <div>
                            <p className={`text-md w-full text-left rounded-md`}>
                                {props.post.userId.userName}
                            </p>
                            <p className='text-[10px]'>October 17</p>
                        </div>
                    </div>
                    <div className='ml-12'>
                        <p>{props.post.content}</p>
                    </div>
                    <div className='ml-12'>
                        <img src={props.post.photo} className='w-full'/>
                    </div>
                    <div className={`ml-12 h-[0.8px] ${theme?'bg-[#6d6c6c]':'bg-[#b6b5b5]'} mt-5 `}></div>
                    <div className='flex ml-12 gap-4'>
                        <button className={`flex-1 text-[16px] text-center group ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#efeff0]'} rounded-md mt-2 py-2 pl-1`} onClick={()=>handleLike(props.post._id)}><i className={`fa-solid fa-heart mr-2 group-hover:scale-150 group-hover:text-[#aa77f0] ${like?'text-[#aa77f0]':''} `}></i>Like</button>
                        <button className={`flex-1 text-[16px] text-center group ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#efeff0]'} rounded-md mt-2 py-2 pl-1`} onClick={()=>{dispatch(clickedPost({id:props.post._id,userName:props.post.userId.userName,url:props.post.userId.url,content:props.post.content,photo:props.post.photo,date:'October 16'}));setshowCommentForm(true)}} ><i className="fa-solid fa-comment mr-2 group-hover:scale-150 group-hover:text-[#aa77f0]"></i>Comment</button>
                    </div>
                </div>
            {/* })} */}
            </div>
            </>}
        </>
    )
}

export default Posts