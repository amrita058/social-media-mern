import {useSelector} from 'react-redux'
import FriendsCard from '../../components/Friends/FriendCard';
import { useEffect, useState } from 'react';
import FriendRequestCard from '../../components/Friends/FriendRequestCard';
import axios from 'axios';

const Friends = () => {

  const token = localStorage.getItem('token')
  const [field, setField] = useState("friends")
  const [friendRequests, setFriendRequests] = useState([])
  const [friends, setFriends] = useState([])

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

   const user = useSelector((state:any)=>{
        return state.user
    })

  useEffect(()=>{
    const fetch =async()=>{
      await axios.get(`http://localhost:7000/api/user/${user._id}/friend-request`,{
        headers:{
          Authorization: `${token}`
        }
      })
        .then((res)=>{setFriendRequests(res.data);console.log("request dta here",res.data)})
        .catch(err=>console.log(err))
    }
    fetch()
  },[user])

  useEffect(()=>{
    const fetch =async()=>{
      await axios.get(`http://localhost:7000/api/user/${user._id}/friends`,{
        headers:{
          Authorization: `${token}`
        }
      })
        .then((res)=>{setFriends(res.data);console.log("request dta here",res.data)})
        .catch(err=>console.log(err))
    }
    fetch()
  },[user])

  // const friends = [
  //   {
  //     _id:"1",
  //     userName:"sekai",
  //     fullName:"Sekai58",
  //     email:"sekai@gmail.com",
  //     url:"https://yt3.ggpht.com/a/AATXAJxigX1uC10NIZu1btPWktg-SUXteOTmFKDSiw=s900-c-k-c0xffffffff-no-rj-mo",
  //     friends:[1,2,3],
  //   },
  //   {
  //     _id:"2",
  //     userName:"itachi",
  //     fullName:"Itachi",
  //     email:"itachi@gmail.com",
  //     url:"https://yt3.googleusercontent.com/ytc/AGIKgqP6a5KA5Hscrxdfv13eX78BxPmrawe8iv4RQWf4ag=s900-c-k-c0x00ffffff-no-rj",
  //     friends:[1,2],
  //   },
  //   {
  //     _id:"3",
  //     userName:"erwin",
  //     fullName:"erwin",
  //     email:"erwin@gmail.com",
  //     url:"https://yt3.ggpht.com/a/AATXAJxigX1uC10NIZu1btPWktg-SUXteOTmFKDSiw=s900-c-k-c0xffffffff-no-rj-mo",
  //     friends:[3,4,5,6],
  //   },
  //   {
  //     _id:"4",
  //     userName:"sakura",
  //     fullName:"Sakura",
  //     email:"sakura@gmail.com",
  //     url:"https://yt3.googleusercontent.com/ytc/AGIKgqP6a5KA5Hscrxdfv13eX78BxPmrawe8iv4RQWf4ag=s900-c-k-c0x00ffffff-no-rj",
  //     friends:[1],
  //   }
  // ]

  return (
    <div className="pt-16 text-white min-h-screen relative">
      <div className="flex w-full">
        <aside className={`fixed top-0 left-0 h-screen w-[22%] border-r-2 ${theme?'border-[#2c2c2c] bg-[#1a1919]':'bg-[#e9ebee] border-[#cdcdfc]'} pt-16`}>
          <div className={`${theme?'bg-[#1d1d1d] text-[#969595]':'bg-[#e9ebee] text-[#6d6c6c]'} mt-3 rounded-md px-2 py-1`} >
              <button className={`text-[18px] w-full text-left  ${(field=='friends')?theme?'bg-[#3a3a3a]':'bg-black bg-opacity-5':theme?'bg-[#1d1d1d] hover:bg-[#3a3a3a]':'bg-[#e9ebee] hover:bg-black hover:bg-opacity-5'} rounded-md py-2 pl-1`} onClick={()=>{setField("friends")}}>
                <i className="fa-solid fa-user-check mr-2"></i>All Friends
              </button>
              <div className={`h-[0.8px] my-1`}></div>
              <button className={`text-[18px] w-full text-left ${(field=='friendrequest')?theme?'bg-[#3a3a3a]':'bg-black bg-opacity-5':theme?'bg-[#1d1d1d] hover:bg-[#3a3a3a]':'bg-[#e9ebee] hover:bg-black hover:bg-opacity-5'} rounded-md py-2 pl-1`} onClick={()=>{setField("friendrequest")}}>
                <i className="fa-solid fa-user-plus mr-2"></i>Friend request
              </button>
          </div>
        </aside>
        <section className={`absolute right-0 top-0 pt-16 w-[78%] min-h-screen ${theme?'bg-[#1a1919]':'bg-[#e9ebee]'}  px-7`}>
          <div className="py-5 pr-10">
            {(field==='friends')?
              <div className='flex flex-wrap gap-3 justify-evenly lg:justify-start'>
                {friends.map((friend,idx)=>{
                  return(
                  <div key={idx}>
                    <FriendsCard friend={friend} />
                  </div>)
                })}
              </div>:
              <div className='flex flex-wrap gap-3 justify-evenly lg:justify-start'>
                {friendRequests.map((friend,idx)=>{
                  return(
                  <div key={idx}>
                    <FriendRequestCard friend={friend} />
                  </div>)
                })}
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  );
};
  
export default Friends;
  