
"use client"
import { login, resetPassword } from '@/networks/authNetwork';
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

function Page() {
  const {register,handleSubmit}=useForm();

  const params=useSearchParams();
  const token=params.get("token")
  
  const router=useRouter();


  async function handleForm(data:any){
    try{
      const formdata={...data};
      formdata.token=token;
      const res=await resetPassword(formdata);
      if(res.success){
        toast.success(res.message)
        router.replace("/login")
      }

    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className=' w-full flex-1 flex justify-center items-center'>

      <form onSubmit={handleSubmit(handleForm)}
      className='md:w-[30vw] w-[90vw] border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 flex flex-col items-center gap-3'>
        <h1 className='text-2xl text-blue-500 mb-3 text-center font-bold '>Hey user! <br/>Reset your Password</h1>
      
        <input {...register("password")}
        className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your password"/>
        <input {...register("confirm_password")}
         className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Confirm your password"/>

       <button className='w-full rounded-md px-4 py-3 bg-gradient-to-r from-blue-600 via-blue-300 mt-3  to-blue-600 text-white font-bold'>Reset Password</button>
      </form>
    </div>
  )
}

const SuspendedPage = () => (
  <Suspense>
    <Page />
  </Suspense>
);

export default SuspendedPage
