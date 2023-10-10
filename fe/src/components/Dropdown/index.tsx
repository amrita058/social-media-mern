import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { changeDrop, unauthenticate} from '../../features/slice';

const Dropdown = ()=>{
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const drop = useSelector((state:any)=>{
    return state.drop.value
  })

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    dispatch(unauthenticate())
    navigate('/login')
  }

  const handleClick = ()=>{
    navigate('/profile')
    dispatch(changeDrop(false))
  }

 const data ={
  url:"https://th.bing.com/th/id/OIP.BTWP0AespzDI4q-8kFzHtwAAAA?pid=ImgDet&rs=1",
  userName:"sekai",
  email:"sakura@gmail.com",
  link:"profile"
 }
    return(
      <>
        <div className='h-8 w-8 rounded-full flex justify-center items-center text-xl text-[#ebebfe] cursor-pointer relative'>
          <img src={data.url} className='h-8 w-8 rounded-full' onClick={()=>dispatch(changeDrop(!drop))} />
            <div className={` z-10 ${(drop===true)?'solid':'hidden'} w-[310px] h-[250px] rounded-md border-[1px] ${theme?'bg-[#313131] shadow-[#151515] border-[#474747] ':'border-[#b1b0b0] bg-[#d4d4d4] shadow-[#b4b3b3]'}  p-3 absolute top-12 left-0 sm:-left-72 shadow-xl `} onClick={()=>dispatch(changeDrop(true))}>
                <div className={`${theme?'bg-[#232323] shadow-[#0c0c0c]':'bg-[#e9ebee] shadow-[#868686]'} w-full h-[6.5rem] py-1 px-2 rounded-md flex items-center shadow-md `}>
                  <div className='flex gap-3 items-center'>
                    <img src={data.url} className={`w-[3.2rem] h-[3.2rem] rounded-full ${theme?'bg-[#313131]':'bg-[#d4d4d4]'}  p-[6px]`}/>
                    <div className={`${theme?'text-[#c0bfbf]':'text-[#4e4e4e]'}`}>
                    <p>{data.userName}</p>
                    <p className={`text-sm ${theme?'text-[#919090]':'text-[#616161]'}  mb-2`}>{data.email}</p>
                    </div>
                  </div>
                </div>
                <div className={`${theme?'bg-[#1d1d1d] text-[#969595]':'bg-[#e9ebee] text-[#4e4e4e]'} mt-3 rounded-md px-2 py-1`}>
                  <div onClick={handleClick}>
                    <p className={`text-[18px] ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md py-2 pl-1`}>
                      <i className="fa-solid fa-user mr-2"></i>Profile
                    </p>
                  </div>
                  <div className='h-[0.8px] bg-[#444343] my-1'></div>
                    <p className={`text-[18px] ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md py-2 pl-1`} onClick={()=>handleLogout()}><i className="fa-solid fa-right-from-bracket mr-2"></i>Logout</p>
                </div>
            </div>
        </div>
      </>
    )
}

export default Dropdown