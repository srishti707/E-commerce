"use client";
import { addToCart } from "@/networks/cartNetworks";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart, FaStar } from "react-icons/fa";

interface getAllDataProps {
  getAllData: any;
 
}
function AllProducts({ getAllData }: getAllDataProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    setUserId(user_id);
  }, []);
  const router = useRouter();

  async function handleAddToCart(data: any) { //data=product
    const body = { 
     user_id:userId,
     product_id:data._id,
     total_price:data.sale_price,
     quantity:1,
     color:data.colors[0],
     size:data.sizes[0].size
    };
    try{
     const response=await  addToCart(body);
      if(response.success){
        toast.success("Item added to Cart!")
      }
    }
    catch(err){
      console.log(err)
    toast.error("Failed to add item to cart!")}
  }
  return (
    <div className="grid grid-cols-3 col-span-9 p-10 gap-14 mt-16 mx-8 bg-white ">
      {getAllData &&
        getAllData.map((data: any) => {
          return (
            <div className="bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 pt-4 h-[100%]">
              <div className="">
                <button onClick={() => handleAddToCart(data)}>
                  <FaShoppingCart />{" "}
                </button>
               <button className="h-[50%]"
               onClick={()=>{router.push(`/productDetails?product_id=${data._id}`)}}>
               <img className="h-full mx-auto" src={data.cover_image} />
               </button>
              </div>
              <div className="h-[50%]">
              <h1 className="font-mono text-lg">{data.product_name}</h1>
              <h2 className="line-through text-slate-500">
                ${data.original_price}
              </h2>
              <h2>${data.sale_price}</h2>
              <p className="text-slate-700">{data.category}</p>
              <h3 className="flex">
                Ratings {data.average_rating}
                <FaStar />
              </h3>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AllProducts;
