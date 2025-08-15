import React, { useContext } from 'react'
import { useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const {serverUrl} = useContext(dataContext)
    const navigate = useNavigate()

   
    const [password , setPassword] = useState(null)
    const [email , setEmail] = useState(null)


    const handleLogin = async (e) =>{
        e.preventDefault();
        try {
            const data = await axios.post(serverUrl +"/api/login" , {
                email ,
                password
            },{withCredentials:true})

            console.log(data)
              
        } catch (error) {
            console.log(error.message)
            
        }

    }


  




  return (
   <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
    <div className='w-[90%] max-w-[500px] h-[600px] bg-gray-400 rounded flex flex-col justify-center items-center gap-[20px] '>

        <h1 className='text-white text-[22px] font-semibold'>Login</h1>

        <form className='w-[100%] flex flex-col items-center justify-center gap-[20px]' onSubmit={handleLogin}>
         

            <input type="email" placeholder='Email' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[80%] h-[100%]  ' value={email} onChange={(e) =>setEmail(e.target.value)} />
            <input type="password" placeholder='password' className='ouline-none border-none rounded-lg px-[10px] py-[5px] w-[80%] h-[100%]  ' value={password} onChange={(e) =>setPassword(e.target.value)} />

            <button className='rouded bg-blue-400 text-black px-[10px] py-[5px] text-bold'> Login </button>

             <p className='text-white ' onClick={() => navigate("/signup")}> Want to create a new Accoubt ?  <span className='text-blue-800'>Sign Up</span></p>
        </form>

    </div>
   </div>
  )
}


export default Login