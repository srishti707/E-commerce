"use client"
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { deleteCartItem, getCartItems } from '@/networks/cartNetworks'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
interface getProps{
showCart:boolean,
setShowCart:any
}
function Cart({showCart,setShowCart}:getProps) {
  const router=useRouter();
  const [cartdata,setCartdata]=useState<any>(null);
  
  console.log("---->",cartdata)

function handleClose(){
setShowCart(false);
}
async function handleRemove(cartItem_id:any){
const response=await deleteCartItem(cartItem_id|| "")
if(response.success){
 
toast.success("Cart Item deleted successfully.")
handleCartData()
}
}
  useEffect(()=>{
    handleCartData();
  },[])

  async function handleCartData(){
    try{
   const id=localStorage.getItem("userId");
   if(id){
     
  const res=await getCartItems({user_id :id||""});
  console.log("cartItems",res);
  if(res.success){

    setCartdata(res.data[0])
  }
}
 }
 catch(err){
  console.log(err)
 }
  }
  return (
<>

<div className='absolute flex flex-col justify-between top-0 right-0 h-screen w-[40%] bg-white text-black z-50'>
 <div className='flex-1 overflow-auto'>
   <div className='flex justify-between m-4  p-4 border-gray-200 border-b-2'>
<h1 className='text-xl'>Shopping Cart</h1>
<button onClick={handleClose}>
<RxCross2 className='text-3xl' />
</button>
   </div>
  {cartdata && cartdata.cartItems.map((data:any)=>{
   return <div className='flex  justify-between m-5'>
       
      <div className='flex m-5 gap-5'> 
       <img className='h-14 w-14 border-2 '
       src={data.product[0].cover_image}/>
       <div>
       <h2>{data.product[0].product_name}</h2>
       <h2 className='text-gray-600'>{data.quantity}X {data.total_price}</h2>
       <h2 className='text-gray-600'>Size :{data.size}</h2>
           
       </div>

      </div>
       <button onClick={()=>handleRemove(data._id)}>
       <RxCross2 className='text-lg text-gray-600'/>
        </button>
   </div>

  })}
   </div>
   <div>
   <div className='flex justify-between m-4 '>
   <p className='text-lg'>Subtotal:</p>
   <p className='text-lg text-gray-700'>${cartdata ? cartdata.totalAmount.toFixed(2):0}</p>

   </div>
   
   <div className='flex flex-col gap-5 w-full items-center  '>
 <button onClick={()=>router.push("/ViewCart")}
 className='bg-blue-600 text-white px-5 py-2 w-[90%]'>VIEW CART</button>
 <button className='bg-blue-600 text-white px-5 py-2 w-[90%]'>CHECKOUT</button>

   </div>
   </div>
</div>
 
</>
  )
}

export default Cart
