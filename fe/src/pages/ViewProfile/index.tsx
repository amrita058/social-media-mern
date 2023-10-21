import { useSelector } from "react-redux"
import bgimg from "../../assets/bio_bg.png"
import Posts from "../../components/Post"
import axios from "axios"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ViewProfile =()=>{
    const token = localStorage.getItem('token')
    const {id} = useParams()
    const [posts,setPosts] = useState<any>([])
    const [loading,setLoading] = useState(true)
    const theme = useSelector((state:any)=>{
        return state.theme.dark
    })

    const user = useSelector((state:any)=>{
        return state.user
    })
    
    useEffect(()=>{
      const fetch = async()=>{
        await axios.get(`http://localhost:7000/api/user/${id}/profile`,{
            headers:{
                Authorization:`${token}`
            }
        })
        .then(res=>{
            console.log(res.data)
            setPosts(res.data)
            setLoading(false)
        })
        .catch(err=>{console.log(err)})
      }
      fetch()
    },[user])

    return(
        <div className="pt-16 text-white px:3 min-h-screen w-full">
            <div className="h-[12rem] w-full pl-[5%]">
                <img src={bgimg} className="w-[90%] h-[16rem] fixed"/>
            </div>
            {!loading?
            <div className="flex h-full w-full pl-[5%]">
                <div className="w-[20%] flex flex-col items-center justify-center fixed">
                    <img src={posts[0].userId.url} className={`w-32 h-32 rounded-full border-2`}/>
                    
                    <div className={`w-full flex flex-col items-center p-5 ${theme?'text-[#c0bfbf]':'text-[#474747]'}`}>
                        <p className="text-2xl">{posts[0].userId.userName}</p>
                        <p className={`text-md ${theme?'text-[#c0bfbf]':'text-[#797878]'}  mb-[6px]`}>{posts[0].userId.email}</p>
                        <div className="pt-7 w-full flex flex-col items-center">
                            <p className='mb-2 text-start'>📹 {posts.length} Posts</p>
                            <p className='text-start'>🤷‍♂️{posts[0].userId.friends.length} Friends</p>
                        </div>
                    </div>
                </div>

                <div className={`mt-[4rem] ml-[25%] w-full bg-transparent`}>
                    <h2 className={`py-3 text-xl text-[#aa77f0] underline underline-offset-8 ${theme?'bg-[#1a1919]':'bg-[#e9ebee]'} fixed w-[70%]`}><span className="text-white">Posts</span></h2>
                    
                    <div className="flex flex-col items-center mt-16">
                        <div className="w-[40rem]">
                            {posts.map((post:any,idx:number)=>{
                                return(
                                    <div key={idx}>
                                        <Posts post={post}/>
                                    </div>
                                )
                            })}
                        </div>                       
                    </div>  
                </div>
            </div>
            :
            <></>
            }
        </div>
    )
}

export default ViewProfile