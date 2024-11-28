"use client"
import { forgotPassword, login } from '@/networks/authNetwork';
import { register } from 'module';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

function page() {
  const {register,handleSubmit}=useForm();
  const router=useRouter();

  async function handleForm(data:any){
    try{
      const res=await forgotPassword(data);
      if(res.success){
        toast.success(res.message)
      }
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className=' w-full flex-1 flex justify-center items-center'>

      <form onSubmit={handleSubmit(handleForm)}
      className='md:w-[30vw] w-[90vw] border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 flex flex-col items-center gap-3'>
        <h1 className='text-2xl text-blue-500 mb-3 text-center font-bold '>Hey user! <br/>Login to your account.</h1>
      
        <input {...register("email")}
        className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your e-mail"/>
       <div className='flex w-full justify-between mt-3'>
       </div>
       <button className='w-full rounded-md px-4 py-3 bg-gradient-to-r from-blue-600 via-blue-300 mt-3  to-blue-600 text-white font-bold'>Send E-mail</button>
      </form>
    </div>
  )
}

export default page
