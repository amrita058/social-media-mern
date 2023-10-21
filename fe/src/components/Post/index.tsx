import {useDispatch, useSelector} from 'react-redux'
import { clickedPost } from '../../features/slice'
import { useState } from 'react'
import CommentPostModal from '../Model/CommentPost'
// import axios from 'axios'
// import { toast } from 'react-toastify'

const Posts =(props:any)=>{
    // const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [showCommentForm,setshowCommentForm] = useState(false)
    // const [posts, setPosts] = useState<any>([])


    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

    // const user = useSelector((state:any)=>{
    //     // console.log("at drop down",state.user)
    //     return state.user
    // })

    // useEffect(()=>{
    //     const fetch = async()=>{
    //         console.log(user._id)
    //         await axios.get(`http://localhost:7000/api/posts/user/${user._id}`,{
    //             headers:{
    //                 Authorization: `${token}`
    //             }
    //         })
    //         .then((res)=>{
    //             console.log("posts data only",res.data)
    //             setPosts(res.data)
    //         })
    //         .catch((err)=>{
    //             console.log(err)
    //             // toast.error("Unable to fetch any posts")
    //         })
    //     }
    //     fetch()
    // },[user])

    const onClose =()=>{
        setshowCommentForm(false)
      }

    return(
        <>
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
                    <div className='flex ml-12 gap-4'>
                        <button className={`flex-1 text-[12px] text-center ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} ><i className="fa-solid fa-heart mr-2 text-green-500"></i>Like</button>
                        <button className={`flex-1 text-[12px] text-center ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} onClick={()=>{dispatch(clickedPost({id:props.post._id,userName:props.post.userId.userName,url:props.post.userId.url,content:props.post.content,photo:props.post.photo,date:'October 16'}));setshowCommentForm(true)}} ><i className="fa-solid fa-comment mr-2 text-yellow-500"></i>Comment</button>
                    </div>
                </div>
            {/* })} */}
            </div>
        </>
    )
}

export default Posts