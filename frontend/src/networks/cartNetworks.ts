import { cartItem_API, deleteCartItem_API, getcart_API } from "@/utils/constants"
import axios from "axios"
interface getProps{
  user_id:any

}


export async function addToCart(body:any){
   try{
    const response=await  axios.post(cartItem_API,body);
   if(response.data.success){
    return response.data
   }
}catch(err){
  console.log(err)
}
    //post req to backend
    //send body to frontend
}
export async function getCartItems({user_id}:getProps){
  try{
    const response=await axios.get(`${getcart_API}?user_id=${user_id}`)
    if(response.data.success){
      return response.data
    }
  }catch(err){
    console.log(err)
  }
}
export async function deleteCartItem(cartItem_id:string){
  try{
const response=await axios.post(`${deleteCartItem_API}?cartItem_id=${cartItem_id}`)
if(response.data.success){
  return response.data
}
  }catch(err){
    console.log(err)
  }
}