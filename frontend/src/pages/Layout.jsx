import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useUser, SignIn } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar,setSiderbar] = useState(false);
  const {user} = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen '>
      <nav className='w-full px-8 min-h-14 flex items-center
       justify-between border-b border-gray-200'>
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-1 cursor-pointer" onClick={()=>navigate("/")}>
          <span className="text-indigo-600 font-bold">PROMPTORA</span>
        </h1>
        {
          sidebar ? (<X className='w-6 h-6 text-gray-600 sm:hidden' 
          onClick={()=>setSiderbar(false)}/>)
          : <Menu onClick={()=>setSiderbar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSiderbar = {setSiderbar}/>
        <div className='flex-1 bg-[#F4F7FB]'>
          <Outlet/>
        </div>
        
      </div>
      
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn/>
    </div>
  )
}

export default Layout