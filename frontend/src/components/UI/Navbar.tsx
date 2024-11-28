"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaShoppingCart } from 'react-icons/fa';
function Navbar({showCart,setShowCart}:any) {
  const router=useRouter();
const [name,setName]=useState<string|null>(null);
const path=usePathname();
const [profile,setProfile]=useState<string|null>(null);

  function handleCart() {
    setShowCart(!showCart)
   }
   
   useEffect(()=>{
    const username=localStorage.getItem("user-name");
    const userProfile=localStorage.getItem("profile-pic");
    if(username){
      setName(username)
    }
    if(userProfile){
      setProfile(userProfile)
    }
   },[])
  return (
    <div className= {` px-3 flex justify-between w-full  py-6 ${path==="/"?"bg-black/10 text-white":""}`}>
 
   <ul className=' flex py-2  gap-5 z-10'>
      <li onClick={()=>router.push("/products")}
       className=' hover:text-slate-50 hover:text-lg'>Everything</li>
      <li className=' hover:text-slate-50 hover:text-lg'>Women</li>
      <li className=' hover:text-slate-50 hover:text-lg'>Men</li>
      <li className=' hover:text-slate-50 hover:text-lg'>Accessories</li>
     </ul>
  
   
    <div className='  gap-7 py-2 flex px-3 z-10'>
     <ul className=' flex gap-4'>
      
      <li className='hover:text-slate-50 hover:text-lg p-2'>Cart <button onClick={handleCart}><FaShoppingCart /></button></li>
  
      <li className='hover:text-slate-50 hover:text-lg p-2'><i>CONTACT US</i></li>
      <li className='hover:text-slate-50 hover:text-lg p-2'><i>ABOUT</i></li>
     </ul>
      {
        (name || profile) ? <div className='flex gap-3 '>
            <h2 className='p-2'>{name||"anoymous"}</h2>
           { profile && <img src={profile} className='h-10 w-10 rounded-full'/>}
        </div> :
     <Link className='font-semibold flex z-10'
     href='/login'>Login/SignUp</Link>
      }  
    </div>
    
   
  
    </div>
  )
}

export default Navbar
