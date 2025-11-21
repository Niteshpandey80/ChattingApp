import React, { useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {
  const [currState , setCurrState] = useState("Singn up")
  const [fullName , setFullName] = useState("") 
  const [email , setEmail] = useState("")
  const [password , setPassword]  = useState("")
  const [bio , setBio] = useState("")
  const [isDataSubmitted , setIsDataSubmitted] = useState(false);

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* ------------left ----------- */}
      <img src={assets.logo_big} alt="" className='sm:w-100 w-75 ' />
      {/* ------------right ----------- */}
      <form className='border-2 bg-white/8 text-white border-gray-500 sm:p-5 p-3 flex flex-col grap-6 rounded-lg shadow-lg'>
             <h2 className='font-medium text-xl  flex justify-between items-center sm:text-2xl ' >{currState} 
              <img src={assets.arrow_icon} alt=""  className='w-5 cursor-pointer'/> 
             </h2>
             {currState == "Sign up" && !isDataSubmitted &&  (
                   <input onChange={(e)=>setFullName(e.target.value)} value={fullName} type="text" placeholder='Full Name' className='p-2 border border-gray-500 rounded-md focus:outline-none'  required/>
             )}
             {!isDataSubmitted && (
              <>
              <input
              onChange={(e)=>setEmail(e.target.value)} value={email}
               type="email" placeholder='Email Address' required  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
               <input
              onChange={(e)=>setPassword(e.target.value)} value={password}
               type="password" placeholder='Password' required  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-2' />
              </>
             )}
             
             {
              currState === "Sign up" && isDataSubmitted  &&(
                <textarea name='' id=''></textarea>
              )
             }
      </form>
    </div>
  )
}

export default LoginPage
