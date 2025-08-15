import React, { useContext } from 'react'
import { useState } from 'react'
import { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function SignUp() {

    const {serverUrl} = useContext(dataContext)
    const navigate = useNavigate()

    const [firstName , setFirstName] = useState(null)
    const [lastName , setLastName] = useState(null)
    const [userName , setUserName] = useState(null)
    const [password , setPassword] = useState(null)
    const [email , setEmail] = useState(null)


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
           const data = await axios.post(serverUrl + "/api/signup" , {
            firstName,
            lastName,
            userName,
            email ,
            password
           } , {withCredentials: true})
           console.log(data)
        } catch (error) {
            console.log(error.message)
        }
      
    } 



       






  return (
   <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
    <div className='w-[90%] max-w-[500px] h-[600px] bg-gray-400 rounded flex flex-col justify-center items-center gap-[20px] '>

        <h1 className='text-white text-[22px] font-semibold'>Sign Up </h1>

        <form className='w-[100%] flex flex-col items-center justify-center gap-[20px]' onSubmit={handleSignUp}>
            <div className='w=[80%] h-[50px] flex justify-center items-center gap-[10px]'>

            <input type="text" placeholder='First Name' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[50%] h-[100%]  ' value={firstName} onChange={(e) =>setFirstName(e.target.value)} />
            <input type="text" placeholder='Last Name' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[50%] h-[100%]  ' value={lastName} onChange={(e) =>setLastName(e.target.value)}/>
            </div>

            <input type="text" placeholder='Username' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[80%] h-[100%]  '  value={userName} onChange={(e) =>setUserName(e.target.value)}/>
            <input type="email" placeholder='Email' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[80%] h-[100%]  ' value={email} onChange={(e) =>setEmail(e.target.value)} />
            <input type="password" placeholder='password' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[80%] h-[100%]  ' value={password} onChange={(e) =>setPassword(e.target.value)} />

            <button className='rouded bg-blue-400 text-black px-[10px] py-[5px] text-bold'> Sign Up </button>
            <p className='text-white ' onClick={() => navigate("/login")}> Already Have An Account ?  <span className='text-blue-800'>Login</span></p>
        </form>

    </div>
   </div>
  )
}

export default SignUp