import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

const Contacts =(props:any)=>{
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

      // const user = useSelector((state:any)=>{
      //   // console.log("at drop down",state.user)
      //   return state.user
      // })


    return(
        <>
            <div className={` w-full bg-gradient-to-r from-[#d3bdfa] via-[#c7a6ff] to-[#aa77f0] border-t-[1px] border-[#aa77f0] rounded-md `}>
                {/* <div className={`${theme?'bg-hero-pattern bg-cover':'bg-hero-pattern bg-cover'} w-full h-16 py-5 px-2 rounded-t-md flex justify-center`}>Contacts</div> */}
                <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} mt-[6px] rounded-md px-3 pb-2`}>
                  <h2 className='text-left p-3 text-lg'>{props.title}</h2>
                  <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mb-2`}></div>
                  {props.friend?<>
                    <Link to={`/profile/${props.friend._id}`}>
                    <div className={`${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} flex rounded-md items-center px-2`}>
                        <img src={props.friend.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                        <button className={`text-[16px] w-full text-left  hover:text-[#aa77f0] rounded-md py-3`}>
                             {props.friend.userName}
                        </button>
                    </div>
                    </Link>
                  </>:<></>}
                </div>
            </div>
        </>
    )
}

export default Contacts