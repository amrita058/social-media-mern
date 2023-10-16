import {useSelector} from 'react-redux'

const Contacts =()=>{
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

      const user = useSelector((state:any)=>{
        // console.log("at drop down",state.user)
        return state.user
      })

      const friends = ["Erwin", "Levi", "Naruto", "Sakura", "Sekai58"]

    return(
        <>
            <div className={` w-full bg-gradient-to-r from-[#d3bdfa] via-[#c7a6ff] to-[#aa77f0] border-t-[1px] border-[#aa77f0] rounded-md `}>
                {/* <div className={`${theme?'bg-hero-pattern bg-cover':'bg-hero-pattern bg-cover'} w-full h-16 py-5 px-2 rounded-t-md flex justify-center`}>Contacts</div> */}
                <div className={`${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#e6e5e5] text-[#525252]'} mt-[6px] rounded-md px-3`}>
                  <h2 className='text-left p-3'>Contacts</h2>
                  <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'}`}></div>

                  {friends.map((item,idx)=>{return<div key={idx}>
                    <div key={idx} className={`${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} flex rounded-md items-center`}>
                        <img src={user.url} className={`w-10 h-10 mr-2 rounded-full`}/>
                        <button className={`text-md w-full text-left  hover:text-[#aa77f0] rounded-md py-3`}>
                             {item}
                        </button>
                    </div>
                  </div>})}

                </div>
            </div>
        </>
    )
}

export default Contacts