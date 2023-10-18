import { useSelector } from "react-redux"
import { Link } from "react-router-dom"


const FriendsCard =()=>{
    const theme = useSelector((state:any)=>{
        return state.theme.dark
      })
    return(
        <div className="pt-10 mb-3">
            <div
            className={`pt-20 pb-4 px-2 shadow-2xl shadow-black/[0.2] rounded-3xl text-center flex flex-col justify-center max-w-[16rem] ${theme?'bg-[#2f2f2f] text-white':'bg-[#efeeee] text-[#232323]'} `}>
            <div className="select-none">
                <img src="https://th.bing.com/th/id/R.61c5d97755be23e917e3f8d6777ca3c1?rik=AwPVtXO45PgwNw&riu=http%3a%2f%2forig12.deviantart.net%2fb7ef%2ff%2f2015%2f113%2f2%2ff%2fyume_to_hazakura__aruh_ver___by_kanekiru-d8qsbja.png&ehk=y1FR9VpvdTlI1qikVTewVM4r7Tu3bbtFc93GkbVKe68%3d&risl=&pid=ImgRaw&r=0"
                    className={`shadow-2xl shadow-black/[0.2] rounded-3xl h-32 w-32 mx-auto -mt-32 transform-gpu transition-all hover:scale-110`}/>
            </div>

            <h1 className={`text-xl font-bold ${theme?'text-[#d7d6d6]':'text-[#545454]'} pt-2`}>
                Sekai58
            </h1>

            <p className={`${theme?'text-[#d7d6d6]':' text-[#545454]'} mt-2`}>
                📹 100 Posts | 🤷‍♂️ 300 Friends
            </p>

            <div className="mt-6 flex justify-center">
                <Link to='/profile/1'>
                <span className={`bg-[#aa77f0] font-bold text-white px-4 py-2 rounded-lg flex items-center space-x-2 transform-gpu transition-all duration-200 active:scale-90 ${theme?'hover:bg-[#545454]':'hover:bg-[#d7d6d6] hover:text-[#545454]'}`}>
                    View Profile
                </span>
                </Link>
            </div>
        </div>
        </div>
    )
}

export default FriendsCard