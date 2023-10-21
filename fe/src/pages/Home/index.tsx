import {useSelector} from 'react-redux'
import Bio from '../../components/Bio';
import Contacts from '../../components/Contacts';
import { useEffect, useState } from 'react';
import AddItemModal from '../../components/Model/AddPost';
import Posts from '../../components/Post';
import axios from 'axios';

const Home = () => {
  const token = localStorage.getItem('token')
  const [showPostForm,setshowPostForm] = useState(false)
  const [posts, setPosts] = useState<any>([])

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const user = useSelector((state:any)=>{
    return state.user
  })

  const onClose =()=>{
    setshowPostForm(false)
  }

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

  return (
    <div className='min-h-screen'>
    <div className='pt-16'>
    <div className='flex justify-between w-full px-10 py-4'>

      {/* LEFT SIDE CONTENT OF HOME */}
      <div className='w-[25%] text-center fixed left-0 pl-8 hidden md:block'>
        <Bio/>
        {/* <MouseTracking/> */}
      </div>

      {/* MIDDLE CONTENT OF HOME */}
      <div className='flex flex-col w-full md:w-[50%] px-3 gap-3 md:ml-[25%]'>
      <div className='w-full flex h-fit'>
        {showPostForm?<AddItemModal onClose={onClose}/>:<></>}
        <div className={`w-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 border-[1px] border-[#d4d4d4]'} rounded-xl shrink-0`}>
            <div className='flex gap-3 w-[100%] py-3 px-6 shrink-0'>
              <img src={user.url} className={`w-[2.5rem] h-[2.5rem] rounded-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 text-black'}`}/>
              <div className={`${theme?'text-[#c0bfbf]':'text-[#4e4e4e]'} w-full`}>
                <button className={`p-[10px] w-full ${theme?'bg-[#3a3a3a]':'bg-[#e9ebee]'} rounded-2xl`} onClick={()=>{setshowPostForm(true)}}>What's happening?</button>
                <div className='flex '>
                <p className={`flex-1 text-[18px] text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} ><i className="fa-solid fa-right-from-bracket mr-2 text-green-500"></i>Photos</p>
                <p className={`flex-1 text-[18px] text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-[#e9ebee]'} rounded-md mt-2 py-2 pl-1`} ><i className="fa-solid fa-right-from-bracket mr-2 text-yellow-500"></i>Activity</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      {posts.map((post:any,index:number)=>{
        return<div key={index}>
          <Posts post={post}/>
        </div>
      })}
      {/* <Posts/> */}
      </div>
      {/* <Posts/> */}

      {/* RIGHT SIDE CONTENT OF HOME */}
      <div className='w-[25%] text-center fixed right-0 pr-8 hidden md:block'><Contacts/></div>
    </div>
  </div>
  </div>

  );
}

export default Home;
