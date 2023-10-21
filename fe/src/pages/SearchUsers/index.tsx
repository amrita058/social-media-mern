import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

const SearchUsers = () => {

    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })

  return (
    <div className="flex gap-4 flex-wrap pt-20 px-3 sm:px-10">
      <div className="pt-10 mb-3">
            
            <div
            className={`pt-20 shadow-2xl shadow-black/[0.2] rounded-md text-center flex flex-col justify-center max-w-[16rem] ${theme?'bg-[#2f2f2f] text-white':'bg-[#efeeee] text-[#232323]'} `}>
            <div className="select-none">
                <img src="https://tiermaker.com/images/templates/animanga-tier-list-15191661/151916611657823815.png"
                    className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}/>
            </div>

            <h1 className={`text-xl font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'} pt-2 px-2`}>
                seaki
            </h1>

            <p className={`${theme?'text-[#d7d6d6]':' text-[#545454]'} mt-2 px-2`}>
                📹 100 Posts | 🤷‍♂️  Friends
            </p>

            <div className={`mt-6 flex flex-col rounded-b-md rounded-t-2xl shadow-xl p-1 hover:scale-105 ${theme?'bg-[#555555] shadow-[#000000]':'bg-[#ffffff] shadow-[#b8b7b7] text-[#545454]'}`}>
                <Link to='#'>
                <button className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-purple-400 active:scale-90 w-full">
                    <span>Add Friend</span>
                </button>
                </Link>

                <Link to="#">
                <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#d1d0d0]'} mt-1 mb-1`}></div>
                <button className="font-semibold px-4 py-2 rounded-md flex items-center space-x-2 transform-gpu transition-all duration-200 hover:bg-purple-400 active:scale-90 w-full">
                    <span>View Profile</span>
                </button>
                </Link>
            </div>
        </div>
        </div>
    </div>
  );
};

export default SearchUsers;
