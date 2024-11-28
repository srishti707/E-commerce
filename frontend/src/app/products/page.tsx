"use client"
import Navbar from "@/components/UI/Navbar";
import React, { useEffect, useState } from "react";
import Filters from "@/components/products/Filters";
import { getAllData,homePageData} from "@/networks/productNetwork";
import AllProducts from "@/components/products/AllProducts";
import Cart from "@/components/UI/Cart";

function page() {
    const [alldata, setAlldata] = useState<any | null>(null);
    const [homedata,setHomedata]=useState<any|null>(null);
  const [showCart,setShowCart]=useState<boolean>(false);
  
  async function getAllDatafun() {
    try {
      const res = await getAllData(); //res=response.data={success:true,data:homePagedata}
      if (res.success) {
        setAlldata(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function homedataPage(){
    try{
        const res=await homePageData();
        if(res.success){
            setHomedata(res.data);
        }
    }
        catch(err){
            console.log(err)
        
    }
  }
  
  useEffect(() => {
    getAllDatafun();
    homedataPage();
  }, []);
  return (
    <main className={`${showCart?"overflow-hidden h-screen ":"" } relative`} >
      {showCart && <div className="h-screen w-screen absolute top-0 left-0 bg-black/50"></div>}
      <Navbar showCart={showCart} setShowCart={setShowCart}/>
      {showCart  && <Cart showCart={showCart} setShowCart={setShowCart}/>}
      <div className="grid grid-cols-12 bg-slate-100">
       
        <Filters getAlldata={alldata} homedata={homedata}/>
     <AllProducts getAllData={alldata} />

      </div>

    </main>
  );
}

export default page;
