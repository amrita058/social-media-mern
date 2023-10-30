import { useSelector,useDispatch } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// import { changeCount, setShowCount } from '../../features/showSlice';


const Notifications: React.FC= () => {
  const dispatch = useDispatch()
  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  const notify = useSelector((state:any)=>{
    return state.notify.value
  })

//   const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [countChange,setCountChange] = useState(false)
  const [socket,setSocket] = useState<any>(null)

  const data = [{
    message:"hitheres"
  }]


  useEffect(()=>{
    const socket = io('http://localhost:7000')
    setSocket(socket)
    console.log(socket)

    socket?.emit('fromclient', 'Hello from the client!');

    socket?.on('fromserver', (message:any) => {
      console.log('Received message from server:', message);
    });
  },[])
  

  //Get notification
  useEffect(()=>{
    socket?.on('getNotification',(message:any)=>{console.log("notification from user",message)
    console.log(message)
  })  
  })

//  useEffect(() => {
//     axios
//     .get('http://localhost:7000/api/admin/list-message')
//     .then((res) => {
//         setData(res.data)
//         // dispatch(changeCount(res.data.count))
//     })
//     .catch((err) => setError(err))
//     .finally(() => {
//     setLoading(false);
//     setCountChange(false)
//     // dispatch(setShowCount(false))
//     });
//   }, [countChange,showCount]);

  const handleCount = (id:any)=>{
    axios.put(`http://localhost:7000/api/admin/update-message/${id}`)
    .then((res)=>{
      console.log(res.data)
      setCountChange(true)
    })
    .catch((err)=>console.log(err))
  }

  return (
    <>
    <div className={`absolute right-5 top-16 z-10 ${!notify?'hidden':'solid'}`}>
      <div className={`${theme?'bg-[#232323] text-white border-[#474747]':'bg-[#e9ebee] border-[1px] border-[#b1b0b0]'} w-full h-12 flex items-center text-xl pl-3 justify-between rounded-t-md`}>Notifications</div>
      <div className={`h-[300px] w-[300px] overflow-auto scrollbar-none ${theme?'scrollbar-thumb-[#232323]':'scrollbar-thumb-[#c3c3c4]'} ${theme?'bg-[#313131] text-[#e0dfdf]':'bg-[#f3f2f2] border-[1px] border-[#b1b0b0]'}  scrollbar-track-[#7878bc] rounded-b-md`}>
      {!loading  && !error ? (
        data.map((item:any, idx:number) => (
          <div key={idx} className="flex flex-col">
            <>
            <div key={idx} className={` pt-4 pb-2  ${theme?'hover:bg-[#313131] text-[#a1a1a1]':'hover:bg-[#e9e9fe] text-[#424242]'}`}>
                <div className="px-3 mb-0 flex items-center"><img className='h-6 w-6 rounded-full mr-2' src={item.url} />{item.message}</div>
                {item.status==='Unread'?
                <div className={`px-3 text-right text-[10px] underline hover:scale-105 ${theme?'':' text-[#5c5b5b]'}`}><button className='hover:scale-105 underline' onClick={()=>handleCount(item._id)}>Mark as read</button></div>
                :<></>}
            </div>
            </>
            <div className={`h-[0.8px] ${theme?'bg-[#444444]':'bg-[#c3c3c4]'}`}></div>
          </div>
        ))
      ) : (
        <div className="flex h-full justify-center items-center">
          <ClipLoader
          color='#7878bc'
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
      />
        </div>
      )}
      </div>
    </div>
    </>
  );
};

export default Notifications;