"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
interface FilterProps {
  getAlldata: any;
  homedata: any;
}
function Filters({ getAlldata, homedata }: FilterProps) {
  return (
    <div className="col-span-3 p-4  bg-slate-100">
      <div className="flex gap-2 mt-12">
        <input
          className="border-2 outline-none "
          placeholder=" Search products..."
        />
        <button className="bg-blue-700 text-white p-2 rounded-md">
          Search
        </button>
      </div>
      <div className=" mt-8 flex flex-col gap-5">
        <h2 className="text-2xl">Filter by Price</h2>
        <input className="" type="range" />
        <div className="flex justify-between">
          <button className="bg-blue-700 text-white p-2 ml-3 mt-2 w-[25%]">
            Filter
          </button>
          <p className="mt-3 ">Price:$200-$1000</p>
        </div>
        <div>
          <div className="flex flex-col gap-10">
          <h2 className="text-center p-3 text-2xl ">Best Sellers</h2>
          <div className="flex gap-3 flex-col ">
            {homedata &&
              homedata.map((data: any) => {
                return (
                  <div className=" grid grid-cols-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-5 py-2 bg-white">
                      <img className="h-16 " src={data.cover_image} />
                   
                     <div className="flex flex-col col-span-2 ">
                    <h1>{data.product_name}</h1>
                       
                    <h2>${data.sale_price}</h2>
                    <h3 className="flex">
                      Ratings {data.average_rating}
                      <FaStar />
                    </h3>

                     </div>
                  </div>
                );
              })}
          </div>
        </div>
          <h2 className="text-2xl mt-10 text-center mb-7">Categories</h2>
          {getAlldata &&
            getAlldata.map((data: any) => {
              return (
                <div className="flex justify-between bg-white p-2">
                  <h2 key={data.id} className="text-lg mt-2 mx-4">
                    {data.category}
                  </h2>
                  <p>{`(${data.stock})`}</p>
                </div>
              );
            })}
        </div>
    
      </div>
    </div>
  );
}

export default Filters;
