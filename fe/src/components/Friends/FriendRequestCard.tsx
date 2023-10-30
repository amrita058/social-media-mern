import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {useEffect, useState} from "react"


const FriendRequestCard =(props:any)=>{
    const [mutualCount, setMutualCount] = useState(0)

    const theme = useSelector((state:any)=>{
        return state.theme.dark
    })

    const user = useSelector((state:any)=>{
        return state.user
    })

    useEffect(()=>{
        if(user){
            const mutualFriend = user.friends.filter((friend:any)=> props.friend.requestFrom.friends.includes(friend))
            console.log("mutual friend here",mutualFriend)
            setMutualCount(mutualFriend.length)
        }
    },[user])
    
    return(
        <div className="pt-10 mb-3">
            
            <div
            className={`pt-20 shadow-2xl shadow-black/[0.2] rounded-md text-center flex flex-col justify-center max-w-[16rem] ${theme?'bg-[#2f2f2f] text-white':'bg-[#efeeee] text-[#232323]'} `}>
            <Link to = {`/profile/${props.friend.requestFrom._id}`}>
            <div className="select-none">
                <img src={props.friend.requestFrom.url}
                    className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}/>
            </div>
            </Link>

            <h1 className={`text-xl font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'} pt-2 px-2`}>
                {props.friend.requestFrom.userName}
            </h1>

            <p className={`${theme?'text-[#d7d6d6]':' text-[#545454]'} mt-2 px-5`}>
            👨‍👩‍👧‍👦 {mutualCount} Mutual Friends
            </p>

            <div className={`mt-6 flex flex-col rounded-b-md rounded-t-2xl shadow-xl p-1 hover:scale-105 ${theme?'bg-[#555555] shadow-[#000000]':'bg-[#ffffff] shadow-[#b8b7b7] text-[#545454]'}`}>
                <a href="#" className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-green-400 active:scale-90">
                    <span>Accept</span>
                </a>
                <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mt-1 mb-1`}></div>
                <a href="#" className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-red-400 active:scale-90">
                    <span>Decline</span>
                </a>
            </div>
        </div>
        </div>
    )
}

export default FriendRequestCard