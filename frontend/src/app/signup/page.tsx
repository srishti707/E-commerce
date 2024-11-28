"use client";
import { signup } from '@/networks/authNetwork';
import { signup_API } from '@/utils/constants';
import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


function page() {
  const {register,handleSubmit}=  useForm();

  async function handleSignup(data:any){
    try{
        const formData={...data};
        formData.avatar=data.avatar[0];
        const response=await signup(formData);
        if(response.data.success){
            toast.success('Signup successful');
         
        }
    }catch(err:any){
      
        toast.error(err.response.data.message);
        
    }
  }
  return (
    <div className=' w-full flex-1 mt-10 flex justify-center items-center'>

      <form onSubmit={handleSubmit(handleSignup)}
      className='md:w-[40vw] w-[90vw] border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-4 flex flex-col items-center gap-3'>
        <h1 className='text-2xl text-blue-500 mb-3 text-center font-bold '>Hey user! <br/>Register your account here</h1>
        <input {...register("name")}
         className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your name"/>
        
        <input {...register("email")}
         className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your e-mail"/>
        <input {...register("phone_no")}
         className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your phone number"/>
        <select  {...register("gender")}
        className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 '> 
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
  
        </select>
        <input {...register("password")}
        type="password" className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Enter your password"/>
        <input  {...register("confirm_password")}
         className='px-4 py-3 w-full outline-none border-2 rounded-md focus:ring-2 ' placeholder="Confirm password"/>
        <input  {...register("avatar")}
        type="file" />
       <div className='flex w-full justify-between mt-3'>
        <Link className='text-sm text-gray-600'
        href="/signup">New User? Register</Link>
        <Link className='text-sm text-gray-600'
        href="/signup">Forgot Password</Link>
       </div>
       <button 
       className='w-full rounded-md px-4 py-3 bg-gradient-to-r from-blue-600 via-blue-300 mt-3  to-blue-600 text-white font-bold'>Signup</button>
      </form>
    </div>
  )
}

export default page
