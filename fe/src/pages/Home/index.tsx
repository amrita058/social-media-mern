import {useSelector} from 'react-redux'
import Bio from '../../components/Bio';
import Contacts from '../../components/Contacts';
import { useEffect, useState } from 'react';
import AddItemModal from '../../components/Model/AddPost';
import Posts from '../../components/Post';
import axios from 'axios';
import { io } from 'socket.io-client';

const Home = () => {
  const token = localStorage.getItem('token')
  const [showPostForm,setshowPostForm] = useState(false)
  const [posts, setPosts] = useState<any>([])
  const [postCount,setPostCount] = useState(0)
  const [suggestion,setSuggestion] = useState([])

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const user = useSelector((state:any)=>{
    return state.user
  })

  const onClose =()=>{
    setshowPostForm(false)
  }

  // GET POSTS
  useEffect(()=>{
    const fetch = async()=>{
        console.log(user._id)
        await axios.get(`http://localhost:7000/api/posts/user/${user._id}`,{
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
            // toast.error("Unable to fetch any posts")
        })
    }
    fetch()
},[user])

// COUNT POSTS
  useEffect(()=>{
    if(user){
        const currentUserPost = posts.filter((post:any)=> post.userId._id.includes(user._id)) 
        // console.log("current post length",currentUserPost.length)
        setPostCount(currentUserPost.length)
    }
  },[user,posts])

  // SUGGEST FRIEND
  useEffect(()=>{
    const fetch = async()=>{
        console.log(user._id)
        await axios.get(`http://localhost:7000/api/user/suggest-friends`,{
            headers:{
                Authorization: `${token}`
            }
        })
        .then((res)=>{
            console.log("suggest data only",res.data)
            setSuggestion(res.data)
        })
        .catch((err)=>{
            console.log(err)
            // toast.error("Unable to fetch any posts")
        })
    }
    fetch()
},[user])

  // NOTIFICATION
  useEffect(()=>{
    const socket = io('http://localhost:7000')
    // setSocket(socket)
    console.log(socket)

    socket?.emit('fromclient', 'Hello from the client!');

    socket?.on('fromserver', (message:any) => {
      console.log('Received message from server:', message);
    });
  },[])

  return (
    <div className='min-h-screen'>
    <div className='pt-16'>
    <div className='flex justify-between w-full px-10 py-4'>

      {/* LEFT SIDE CONTENT OF HOME */}
      <div className='w-[25%] text-center fixed left-0 pl-8 hidden md:block'>
        <Bio postsCount={postCount}/>
        <div className='mb:5 lg:mb-8'></div>
        <div>
        <div className={` w-full bg-gradient-to-r from-[#d3bdfa] via-[#c7a6ff] to-[#aa77f0] border-t-[1px] border-[#aa77f0] rounded-md `}>
          <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} mt-[6px] rounded-md px-3 pb-2`}>
            <h2 className='text-left p-3 text-lg'>Suggestions</h2>
          {suggestion && suggestion.map((friend,idx)=>{
            return<div key={idx}>
              <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mb-2 mt-2`}></div>
              <Contacts friend={friend} title="Suggestions"/>   
            </div>
          })}
          </div>
        </div>
        </div>
        {/* <MouseTracking/> */}
      </div>

      {/* MIDDLE CONTENT OF HOME */}
      <div className='flex flex-col w-full md:w-[50%] px-3 gap-3 md:ml-[25%]'>
      <div className='w-full flex h-fit'>
        {showPostForm?<AddItemModal onClose={onClose}/>:<></>}
        <div className={`w-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 border-[1px] border-[#d4d4d4]'} rounded-xl shrink-0`}>
            <div className='flex gap-3 w-[100%] py-3 px-6 shrink-0'>
              <img src={user.url} className={`w-[2.5rem] h-[2.5rem] rounded-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 text-black'}`}/>
              <div className={`${theme?'text-[#c0bfbf]':'text-[#4e4e4e]'} w-full flex items-center`}>
                <button className={`p-[10px] w-full ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-2xl`} onClick={()=>{setshowPostForm(true)}}>What's happening?</button>
                  <span className={`text-[20px] text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#e9ebee]'} rounded-md py-2 px-2 ml-1 hover:cursor-pointer`} onClick={()=>{setshowPostForm(true)}} ><i className="fa-solid fa-photo-film mr-2 text-green-500"></i></span>
              </div>
            </div>
        </div>
      </div>
      {posts.map((post:any,index:number)=>{
        return<div key={index}>
          <Posts post={post}/>
        </div>
      })}
      </div>

      {/* RIGHT SIDE CONTENT OF HOME */}
      <div className='w-[25%] text-center fixed right-0 pr-8 hidden md:block'>
        <Contacts title="New Notifications"/>
      </div>
    </div>
  </div>
  </div>

  );
}

export default Home;
