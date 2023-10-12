import {useSelector} from 'react-redux'

const Friends = () => {

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

    return (
      <div className="pt-16 text-white min-h-screen relative">
      <div className="flex w-full">
        <aside className={`fixed top-0 left-0 h-screen w-[22%] border-r-2 ${theme?'border-[#2c2c2c] bg-[#1a1919]':'bg-[#e9ebee] border-[#cdcdfc]'} pt-16`}>
          <div className={`${theme?'bg-[#1d1d1d] text-[#969595]':'bg-[#e9ebee] text-[#6d6c6c]'} mt-3 rounded-md px-2 py-1`} >
            {/* <Link to='/profile'> */}
              <button className={`text-[18px] w-full text-left ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} rounded-md py-2 pl-1`}>
                <i className="fa-solid fa-user-check mr-2"></i>All Friends
              </button>
            {/* </Link> */}
              <div className={`h-[0.8px] ${theme?'bg-[#444343]':'bg-[#a8a7a7]'} my-1`}></div>
              <button className={`text-[18px] w-full text-left ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-5'} rounded-md py-2 pl-1`}>
                <i className="fa-solid fa-user-plus mr-2"></i>Friend request
              </button>
          </div>
        </aside>
        <section className="absolute right-0 top-0 pt-16 w-[75%] min-h-screen">
          <div className="py-5 pr-10">
              Feature yet to come
          </div>
        </section>
      </div>
    </div>
    );
  };
  
  export default Friends;
  