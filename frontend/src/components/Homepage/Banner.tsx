import React from 'react'

function Banner() {
  return (
    <div   className=" h-[90%] p-10 w-full bg-cover bg-center bg-fixed "
    style={{ backgroundImage: "url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/banner-03.jpg')" }}>
        <div className='flex flex-col gap-7 h-full w-[50%] px-16'>
      <h2 className='text-white text-2xl'>Limited Time offer</h2>
      <h1 className='text-white text-3xl font-semibold'>Special Edition</h1>
      <p className='text-white text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae provident nam illum! Assumenda porro molestiae quas pariatur consequatur voluptate laudantium eius quisquam velit repellat totam cum voluptas provident, modi fugit.</p>
    <h2 className='text-white font-semibold text-2xl'>Buy This T-shirt At 20% Discount,use Code OFF20 </h2>
    <button className='bg-white text-black w-fit py-3 px-4'>SHOP NOW </button>

        </div>
    </div>
  )
}

export default Banner
