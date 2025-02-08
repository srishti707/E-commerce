"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/navigation'
function page() {
    const router=useRouter();
    const params=useSearchParams()
    const payment_id=params.get("payment_id")
  return (
    <div className='h-screen w-screen flex justify-center items-center flex-col gap-3'>
        <h1 className='text-3xl font-semibold'>Order Successful!</h1>
        <p className='text-lg '>{payment_id}</p>
      <button onClick={()=>{router.replace("/")}}>go to Homepage</button>
    </div>
  )
}

export default page
