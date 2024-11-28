"use client";
import Navbar from "@/components/UI/Navbar";
import React, { useEffect, useState } from "react";
import Cards from "@/components/Homepage/Cards";
import FeaturedProducts from "@/components/Homepage/FeaturedProducts";
import Banner from "@/components/Homepage/Banner";
import { homePageData } from "@/networks/productNetwork";

function page() {
  const data = [
    "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-2.png",
    "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-3.png",
    "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2022/08/client-logo-5.png",
    "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2021/03/client-logo-4.png",
  ];

  const [homedata, setHomedata] = useState<any | null>(null);
  async function gethomePage() {
    try {
      const res = await homePageData(); //res=response.data={success:true,data:homePagedata}
      if (res.success) {
        setHomedata(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    gethomePage();
  }, []);
  console.log("--------->", homedata);
  return (
    <div>
      {homedata && (
        <>
          <div
            className="relative h-screen w-full bg-cover bg-center bg-fixed "
            style={{
              backgroundImage:
                "url('https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2019/12/home-new-bg-free-img.jpg')",
            }}
          >
            <Navbar />
            <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
            <div className="text-white px-14 w-full flex flex-col pt-14 items-start gap-7  ">
              <div className="text-6xl mt-10 flex z-10">
                <h1 className="font-semibold  text-6xl">
                  Raining Offers For <br />
                  Hot Summer!
                </h1>
              </div>
              <div className="text-3xl font-semibold flex z-10">
                <h2>20% Off On All Products</h2>
              </div>
              <div className="flex gap-4 mt-5 z-10">
                <button className="bg-white text-black px-4  py-3">
                  SHOP NOW
                </button>
                <button className="text-white border-2 px-4  py-3  border-white">
                  FIND MORE
                </button>
              </div>
            </div>
          </div>

          <div className=" flex justify-around px-5 py-16">
            {data.map((img) => {
              return (
                <div>
                  <img src={img} />
                </div>
              );
            })}
          </div>
          <Cards />
          <FeaturedProducts homedata={homedata} />
          <Banner />
        </>
      )}
    </div>
  );
}

export default page;
