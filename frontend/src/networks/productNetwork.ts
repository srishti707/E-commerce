import axios from "axios";
import { getAll_API, getProduct_API, homePage_API } from "@/utils/constants";
export async function homePageData(){
    try{
       const response=await axios.get(homePage_API);
       if(response.data.success){
        return response.data;
        //response.data={success:true,data:homepage}
       }

    }
    catch(err){
       console.log(err);
    }
}
export async function getAllData(){
   try{
      const response=await axios.get(getAll_API);
      if(response.data.success){
         return response.data;
      }
   }catch(err){
      console.log(err);
   }
}
export async function getOneProduct(product_id:any){
   try{
      const response=await axios.get(`${getProduct_API}?product_id=${product_id}`);
      if(response.data.success){
         return response.data;
      }
   }catch(err){
      console.log(err);
   }
}

