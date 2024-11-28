import Link from 'next/link'
import React from 'react'

function Sidebar() {
  return (
    <div className='w-[70%] flex flex-col px-3 text-2xl  h-screen items-center py-10 bg-gradient-to-b from-blue-900 to-gray-400'>
   
    <ul className=' h-full flex flex-col gap-3 items-center'>
      <li className=' hover:text-slate-50 hover:text-3xl'>Everything</li>
      <li className=' hover:text-slate-50 hover:text-3xl'>Women</li>
      <li className=' hover:text-slate-50 hover:text-3xl'>Men</li>
      <li className=' hover:text-slate-50 hover:text-3xl'>Accessories</li>
     </ul>
     <div className=' w-[50%] h-full  items-center gap-3  flex flex-col'>
     <ul className=' flex flex-col items-center gap-3'>
      <li className='hover:text-slate-50 hover:text-3xl'><i>CONTACT US</i></li>
      <li className='hover:text-slate-50 hover:text-3xl'><i>ABOUT</i></li>
     </ul>
        
     <Link className='font-semibold hover:text-slate-50 hover:text-3xl'
     href='/login'>Login/SignUp</Link>
     </div>
    
   
  
    </div>
  )
}

export default Sidebar
