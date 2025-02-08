"use client";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { deleteCartItem, getCartItems } from "@/networks/cartNetworks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
interface getProps {
  showCart: boolean;
  setShowCart: any;
}
function Cart({ showCart, setShowCart }: getProps) {
  const router = useRouter();
  const [cartdata, setCartdata] = useState<any>(null);

  console.log("---->", cartdata);

  function handleClose() {
    setShowCart(false);
  }
  async function handleRemove(cartItem_id: any) {
    const response = await deleteCartItem(cartItem_id || "");
    if (response.success) {
      toast.success("Cart Item deleted successfully.");
      handleCartData();
    }
  }
  useEffect(() => {
    handleCartData();
  }, []);

  async function handleCartData() {
    try {
      const id = localStorage.getItem("userId");
      if (id) {
        const res = await getCartItems({ user_id: id || "" });
        console.log("cartItems", res);
        if (res.success) {
          setCartdata(res.data[0]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleCheckOut(amount: number) {
    //1.create an order
    const response = await axios.post(
      "http://localhost:6969/api/v1/payment/createOrder",
      { amount }
    );
    if (response.data.success) {
      const options = {
        key: "rzp_test_U7Eyy1mQNjyG8o", // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Srishti bhatia", //your business name
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id:response.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
       handler:async function(response:any){
          console.log(response)
          const  user=  localStorage.getItem("userId")
          response.user=user
        const res=  await axios.post("http://localhost:6969/api/v1/payment/verifyPayment",response)
       if(res.data.success){
        toast.success("Payment successful!")
        //create an order
        router.replace(`/success?payment_id=${res.data.data}`)
       }
      }
      };

      let rzpay = new (window as any).Razorpay(options);
      rzpay.open();
    }
  }
  return (
    <>
      <div className="absolute flex flex-col justify-between top-0 right-0 h-screen w-[40%] bg-white text-black z-50">
        <div className="flex-1 overflow-auto">
          <div className="flex justify-between m-4  p-4 border-gray-200 border-b-2">
            <h1 className="text-xl">Shopping Cart</h1>
            <button onClick={handleClose}>
              <RxCross2 className="text-3xl" />
            </button>
          </div>
          {cartdata &&
            cartdata.cartItems.map((data: any) => {
              return (
                <div className="flex  justify-between m-5">
                  <div className="flex m-5 gap-5">
                    <img
                      className="h-14 w-14 border-2 "
                      src={data.product[0].cover_image}
                    />
                    <div>
                      <h2>{data.product[0].product_name}</h2>
                      <h2 className="text-gray-600">
                        {data.quantity}X {data.total_price}
                      </h2>
                      <h2 className="text-gray-600">Size :{data.size}</h2>
                    </div>
                  </div>
                  <button onClick={() => handleRemove(data._id)}>
                    <RxCross2 className="text-lg text-gray-600" />
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <div className="flex justify-between m-4 ">
            <p className="text-lg">Subtotal:</p>
            <p className="text-lg text-gray-700">
              ${cartdata ? cartdata.totalAmount.toFixed(2) : 0}
            </p>
          </div>

          <div className="flex flex-col gap-5 w-full items-center  ">
            <button
              onClick={() => router.push("/ViewCart")}
              className="bg-blue-600 text-white px-5 py-2 w-[90%]"
            >
              VIEW CART
            </button>
            <button onClick={()=>handleCheckOut(Number(cartdata.totalAmount.toFixed(2))*100)}
             className="bg-blue-600 text-white px-5 py-2 w-[90%]">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
