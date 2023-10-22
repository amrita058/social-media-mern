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
    const [field,setField] = useState('posts')
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
            <div className={`h-[12rem] w-full pl-[5%] hidden lg:block ${theme?'bg-[#1a1919]':'bg-[#e9ebee]'}`}>
                <img src={bgimg} className={`w-[90%] h-[16rem] lg:fixed `}/>
            </div>
            {!loading?
            <div className="h-full w-full px-[5%] flex flex-col lg:flex-row">
                {/* USER INFO */}
                <div className="w-full lg:w-[20%] flex lg:flex-col items-center justify-center lg:fixed">
                    <img src={posts[0].userId.url} className={`w-32 h-32 rounded-full border-2`}/>
                    
                    <div className={`w-full flex flex-col lg:items-center p-5 ${theme?'text-[#c0bfbf]':'text-[#474747]'}`}>
                        <p className="text-2xl">{posts[0].userId.userName}</p>
                        <p className={`text-md ${theme?'text-[#c0bfbf]':'text-[#797878]'}  mb-[6px]`}>{posts[0].userId.email}</p>
                        <div className="pt-7 w-full flex flex-col lg:items-center">
                            <p className='mb-2 text-start'>📹 {posts.length} Posts</p>
                            <p className='text-start'>🤷‍♂️{posts[0].userId.friends.length} Friends</p>
                        </div>
                    </div>
                </div>

                {/* POSTS */}
                <div className={`lg:mt-[4rem] lg:ml-[25%] w-full bg-transparent`}>
                    <h2 className={`py-3 text-[1.5rem] ${theme?'bg-[#1a1919]':'bg-[#e9ebee]'} lg:fixed lg:w-full`}>
                        <button className={`${(field==='posts')?'text-[#aa77f0] underline underline-offset-8':''} mr-4`}><span className={`${theme?'text-[#b8b7b7]':'text-[#4b4b4b]'}`} onClick={()=>setField('posts')}>Posts</span></button>
                        <button className={` ${(field==='photos')?'text-[#aa77f0] underline underline-offset-8':''}`}><span className={`${theme?'text-[#b8b7b7]':'text-[#4b4b4b]'}`} onClick={()=>setField('photos')}>Photos</span></button>
                    </h2>
                    
                    <div className="flex flex-col items-center lg:mt-16">
                        {
                            (field==='posts')?
                            <>
                            <div className="w-[90%] md:w-[38rem]">
                            {posts.map((post:any,idx:number)=>{
                                return(
                                    <div key={idx}>
                                        <Posts post={post}/>
                                    </div>
                                )
                            })}
                            </div> 
                            </>:
                            <>
                            <div className="grid grid-col-3 w-[16rem] flex-wrap">
                                {posts.map((post:any,idx:number)=>{
                                    return(
                                        <div key={idx}>
                                            <img src = {post.photo}/>
                                        </div>
                                    )
                                })}
                            </div>  
                            </>
                        }
              
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