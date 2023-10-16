import {useDispatch, useSelector} from 'react-redux'
import { clickedPost } from '../../features/slice'
import { useState } from 'react'
import CommentPostModal from '../Model/CommentPost'

const Posts =()=>{
    const dispatch = useDispatch()
    const [showCommentForm,setshowCommentForm] = useState(false)


    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

      const posts = [{
        userName:"erwin",
        url:"http://localhost:7000/uploaded/1697430251977-erwin.jpg",
        content: "Season 5 released",
        photo:"https://i.ytimg.com/vi/CplwSZf4140/hqdefault.jpg",
        date:"October 16"
      },
      {
        userName:"sakura",
        url:"https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg",
        content: "Season 2 released",
        photo:"https://otakukart.com/wp-content/uploads/2021/04/jujutsu-kaisen-1536x1051.jpg",
        date:"October 15"
      }
    ]

    const onClose =()=>{
        setshowCommentForm(false)
      }

    return(
        <>
            <div>
            {showCommentForm?<CommentPostModal onClose={onClose}/>:<></>}
            </div>
            <div className=''>
              {posts.map((item,idx)=>{
                return<div key={idx} className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} rounded-md mb-5 py-3 px-6`}>
                    <div key={idx} className={`flex rounded-md items-center`}>
                        <div>
                            <img src={item.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                        </div>
                        <div>
                            <p className={`text-md w-full text-left rounded-md`}>
                                {item.userName}
                            </p>
                            <p className='text-[10px]'>{item.date}</p>
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
                        <button className={`flex-1 text-[12px] text-center ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} onClick={()=>{dispatch(clickedPost(item));setshowCommentForm(true)}} ><i className="fa-solid fa-comment mr-2 text-yellow-500"></i>Comment</button>
                    </div>
                </div>
            })}
            </div>
        </>
    )
}

export default Posts