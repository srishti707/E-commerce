"use client"
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import { useRouter } from 'next/navigation'
function Page() {
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

const SuspendedPage = () => (
  <Suspense>
    <Page />
  </Suspense>
);

export default SuspendedPage;