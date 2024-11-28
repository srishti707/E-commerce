"use client"
import Navbar from "@/components/UI/Navbar";
import { getCartItems } from "@/networks/cartNetworks";
import React, { useEffect, useState } from "react";

function page() {
    const [cartdata,setCartdata]=useState<any>(null);

    useEffect(()=>{
        handleCartData();
    },[])
    async function handleCartData(){
        try{
       const id=localStorage.getItem("userId");
       if(id){
         
      const res=await getCartItems({user_id :id||""});
      console.log(res);
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
    <div className="flex flex-col">
      <Navbar />
      <div className="py-10 ">
        <h1 className="text-6xl text-gray-600 font-poppins text-center">
          Cart
        </h1>
      </div>
      <table className="border-2 border-gray-300 m-8 bg-gray-100">
       <tr className="">
        <th className="py-3 border-r-2 border-gray-200">Product</th>
        <th className="py-3 border-r-2 border-gray-200">Price</th>
        <th  className="py-3 border-r-2 border-gray-200">Quantity</th>
        <th className="py-3 ">Subtotal</th>
       

       </tr>
      {cartdata && cartdata.cartItems.map((cartItem:any)=>{
        return  ( <tr className="text-center border-2 border-gray-300">
            <td className="border-r-2 p-3 border-gray-300">
                <div className="flex justify-around">
                <img className="h-12 w-12"
            src={cartItem.product[0].cover_image}/>{cartItem.product[0].product_name}
                </div>
              </td>
            <td className="border-r-2 p-3">${cartItem.total_price}</td>
            <td className="border-r-2 w-fit"><input className="w-fit bg-white text-center outline-none "  defaultValue={cartItem.quantity} type="number"/></td>
            <td className="">{cartItem.subtotal}</td>
        </tr>
        )
      })
     
      }
         </table>
     <div className="p-3 flex justify-between mx-8">
      <div> <input className="p-2 outline-none"
        placeholder="Coupen Code"/><button className="bg-blue-500 text-white p-3 text-lg">APPLY COUPON</button>
        </div>
        <button className="bg-blue-500 text-white p-3 text-lg">UPDATE CART</button>
      </div>
      <table className="w-[40%]  h-fit border-2 border-gray-300 m-8 p-3 bg-gray-100">
        <th className="p-3">CartTotals</th>
        <tr className=" border-2 border-gray-300 "><td className="p-3 text-lg">Subtotals : </td><td>${cartdata ? cartdata.totalAmount.toFixed(2):0}</td></tr>
        <tr className=" border-2 border-gray-300 "><td className="p-3 text-lg"> Total : </td><td> ${cartdata ? cartdata.totalAmount.toFixed(2):0}</td>      </tr>
        <tr><td colSpan={2}><button className="bg-blue-500 text-white p-3 text-lg w-full">UPDATE CART</button></td></tr>
      </table>

    </div>
  );
}

export default page;
