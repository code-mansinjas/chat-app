import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { authUser } = useAuthContext()
  return (
    <>
      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser?.isVerified ? <Home/> : <Navigate to={"/login"}/>}  />
          <Route path='/login' element={ authUser?.isVerified ? <Navigate to={"/"}/> : <Login/>}  />
          <Route path='/sign-in' element={ authUser?.isVerified ? <Navigate to={"/"}/> : <Signup/>}  />
        </Routes>
      </div>
    </>
  )
}

export default App
