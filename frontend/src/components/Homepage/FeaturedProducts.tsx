import React from 'react'
import { FaStar } from "react-icons/fa";
interface FeaturedProductsProps{
  homedata:any,
}
function FeaturedProducts({homedata}:FeaturedProductsProps) {
  return (
    <div className='h-full w-full px-10 gap-7'>
      <h1 className='text-4xl font-semibold text-center'>Featured Products..</h1>
    <div className='grid grid-cols-4 gap-5 py-10 h-[70%] w-auto mt-9'>
      {homedata && homedata.map((data:any)=>{
        return(
        <div className='hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5'>
        <img className='h-[60%] mx-auto'
        src={data.cover_image}/>
        <h1>{data.product_name}</h1>
        <h2 className="line-through text-slate-500">${data.original_price}</h2>
        <h2>${data.sale_price}</h2>
        <p className='text-slate-700'>{data.category}</p>
        <h3 className='flex'>Ratings {data.average_rating}<FaStar/></h3>
        </div>
        )
      })}
    </div>
    </div>
  )
}

export default FeaturedProducts
