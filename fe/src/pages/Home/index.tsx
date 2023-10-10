import {useSelector} from 'react-redux'
// import MouseTracking from '../Mouse';

const Home = () => {
  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })
  return (
    <div className='min-h-screen'>
    <div className='pt-16'>
    <div className='flex justify-between w-full'>
      <div className='w-[25%] text-center'>
        left
        {/* <MouseTracking/> */}
      </div>
      <div className='w-[50%] flex p-2'>
        <div className={`w-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 border-[1px] border-[#b1b0b0]'} rounded-xl`}>
            <div className='flex gap-3 w-[100%] py-3 px-6'>
              <img src='https://th.bing.com/th/id/OIP.BTWP0AespzDI4q-8kFzHtwAAAA?pid=ImgDet&rs=1' className={`w-[2.5rem] h-[2.5rem] rounded-full ${theme?'bg-[#313131]':'bg-[#000000] bg-opacity-5 text-black'}`}/>
              <div className={`${theme?'text-[#c0bfbf]':'text-[#4e4e4e]'} w-full`}>
                <button className='p-[10px] w-full bg-[#3a3a3a] rounded-2xl'>What's happening?</button>
                <div className='flex '>
                <p className={`flex-1 text-[18px] text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md mt-2 pt-2 pl-1`} ><i className="fa-solid fa-right-from-bracket mr-2 text-green-500"></i>Photos</p>
                <p className={`flex-1 text-[18px] text-center ${theme?'hover:bg-[#3a3a3a]':'hover:bg-black hover:bg-opacity-10'} rounded-md mt-2 pt-2 pl-1`} ><i className="fa-solid fa-right-from-bracket mr-2 text-yellow-500"></i>Activity</p>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='w-[25%] text-center'>right</div>
    </div>
  </div>
  </div>

  );
}

export default Home;
