import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import { lazy,Suspense } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { authenticate, changeDrop } from './features/slice'
// import ForgetPassword from './pages/ForgetPassword'
// import ResetPassword from './pages/ResetPassword'
// import Home from './pages/Home'
import Navbar from './components/Navbar'
// import NotFound from './pages/NotFound'


const Login = lazy(()=>import('./pages/Login'))
const Register = lazy(()=>import('./pages/Register'))
const ForgetPassword = lazy(()=>import('./pages/ForgetPassword'))
const ResetPassword = lazy(()=>import('./pages/ResetPassword'))
const Home = lazy(()=>import('./pages/Home'))
const Profile = lazy(()=>import('./pages/Profile'))
const Friends = lazy(()=>import('./pages/Friends'))
const NotFound = lazy(()=>import('./pages/NotFound'))
// const  Navbar = lazy(()=>import('./components/Navbar'))

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  if(token){
    dispatch(authenticate())
  }

  const authState = useSelector((state:any)=>{
    return state.auth.value
  })

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })

  return (
    <div className={`${theme?'bg-[#1a1919]':'bg-[#e9ebee]'} min-h-screen`}>
      <BrowserRouter>
      {authState?<Navbar/>:<></>}
      <div onClick={()=>dispatch(changeDrop(false))}>
        <Routes>
          <Route path='/login/*' element={authState?<Suspense><Navigate to='/' /></Suspense>:<Suspense><Login/></Suspense>}></Route>
          <Route path='/register/*' element={authState?<Suspense><Navigate to='/' /></Suspense>:<Suspense><Register/></Suspense>}></Route>
          <Route path="/forgetpassword/*" element={<Suspense><ForgetPassword /></Suspense>} />
          <Route path="/resetpassword/*" element={<Suspense><ResetPassword/></Suspense>} />
          <Route path='/*' element={authState?<Suspense><Home /></Suspense>:<Suspense><Navigate to='/login'/></Suspense>}></Route>
          <Route path='/profile/*' element={authState?<Suspense><Profile /></Suspense>:<Suspense><Navigate to='/login'/></Suspense>}></Route>
          <Route path='/friends/*' element={authState?<Suspense><Friends /></Suspense>:<Suspense><Navigate to='/login'/></Suspense>}></Route>
          <Route element={<Suspense><NotFound/></Suspense>}></Route>
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
