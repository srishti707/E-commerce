"use client"
import React, { useState } from 'react'

function page() {
    const data=["https://images.pexels.com/photos/28441129/pexels-photo-28441129/free-photo-of-scenic-snowy-mountain-bench-in-san-martino.jpeg",
        "https://images.pexels.com/photos/28982080/pexels-photo-28982080/free-photo-of-cozy-morning-coffee-on-bed-with-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/46160/field-clouds-sky-earth-46160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]
    const [showImage,setShowImage] =useState(0);
  
    const handleClickIncr = () => {
        // if(showImage==2){
        //     setShowImage(0)
        //     return;
        // }
        setShowImage((showImage+1)%3)
     }
     const handleClickDecr=()=>{
        // if(showImage==0){
            
        //     setShowImage(2)
        //     return ;
        //  }
         setShowImage(showImage-1)
       
     }
  
  return (

    <div>
        {
            <img className='h-[50%] w-[50%] border-2 border-black'
            src={data[showImage]}/>
        }
      <div className=" w-full h-full">
  
   <button className='text-black'
   onClick={handleClickDecr}>left</button>
   <button className='text-black'
   onClick={handleClickIncr}>right</button>

      </div>
    </div>
  )
}

export default page
