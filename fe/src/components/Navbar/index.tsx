import { Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {changeTheme} from '../../features/slice';
import { useLocation } from 'react-router-dom';
import img from '../../assets/sslogo.png'
import Dropdown from '../Dropdown/index';

const Navbar = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const handleTheme =()=>{
    dispatch(changeTheme())
  }

  return (
  <div className={`fixed top-0 left-0 z-[99] w-full ${theme?'bg-[#1a1919] border-[#232323]':'bg-[#e9ebee] border-[#cdcdfc]'} border-b-[1px] `}>
    <div className={`flex px-3 py-3 justify-between sm:px-5 items-center`}>
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            <img src={img} className=" h-10 w-10"/>
          </div>
          <div className={`relative ${theme?'text-[#5d5c5c]':'text-[#bcbaba]'}`}>
            <span className="absolute left-2 top-2"><i className="fa-solid fa-magnifying-glass"></i></span>
            <input type="text" placeholder='Search SocialSync' className={`pl-7 h-10 w-28 sm:w-56 border-1 ${theme?'bg-[#323232] text-[#929191]':'bg-[#000000] bg-opacity-5 text-[#545454]'}  rounded-full transition-all duration-300 ease-in-out sm:focus:w-80 focus:w-full focus:outline-none focus:border-2 focus:border-[#aa77f0]`}/>
          </div>
        </div>

        <div className="flex gap-6">
          <Link to='/'>
            <button className={`flex items-center ${(location.pathname=='/')?'text-[#7878bc]':' text-[#555555]'}`}>
              <i className="fa-solid fa-house text-xl"></i>
                {/* <span className={`${theme?'text-[#ababab]':'text-[#232323]'} hidden sm:flex`}>Home</span> */}
            </button>
          </Link>
          <Link to='/friends'>
            <button className={`flex items-center ${(location.pathname=='/friends')?'text-[#7878bc]':' text-[#555555]'}`}>
              <i className="fa-solid fa-user-group text-xl"></i>
                {/* <span className={`${theme?'text-[#ababab]':'text-[#232323]'} hidden sm:flex`}>Home</span> */}
            </button>
          </Link>
          <div className={`${theme?'text-[#555555]':'text-[#555555]'} cursor-pointer`}>
            <i className={`fa-solid fa-star-and-crescent text-xl -rotate-45`} onClick={handleTheme}></i>
          </div>
          <div className={`${theme?'text-[#555555]':'text-[#555555]'} cursor-pointer`}>
            <i className="fa-solid fa-bell text-xl"></i>
          </div>
          {/* <div>
            <button className={`px-1 sm:px-4 py-1 mr-2 border-[#7878bc] ${theme?'text-white  shadow-[#7878bc] hover:shadow-[#7878bc]':'bg-[#7878bc] shadow-[#7878bc] text-[#ffffff] hover:shadow-[#7878bc]'} rounded-md  border-[1.6px]  shadow-sm hover:shadow-md `} onClick={handleLogout} ><i className="fa-solid fa-user"></i></button>
            <button className={` text-[#555555]`} onClick={handleLogout} ><i className="fa-solid fa-user text-xl"></i></button>
          </div> */}
          <div>
            <Dropdown/>
          </div>
        </div>
    </div>
</div>
  )
  }
export default Navbar