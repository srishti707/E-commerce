"use client";
import Navbar from "@/components/UI/Navbar";
import { getAllData, getOneProduct } from "@/networks/productNetwork";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function Page() {
  const [getProduct, setGetProduct] = useState<any>(null);
  const [getAlldata, setGetAllData] = useState<any>(null);
  const [getRelatedData, setRelatedData] = useState<any>(null);
  const params = useSearchParams();
  const product_id = params.get("product_id"); //got product_id from allProducts.

  async function getProductfun() {
    if (!product_id) return;
    try {
      const response = await getOneProduct(product_id);
      console.log(response);
      if (response.success) {
        setGetProduct(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllDatafun() {
    try {
      const response = await getAllData();
      if (response.success) {
        setGetAllData(response.data);
      }
      console.log(response.data);
      let relatedProducts = [];
      if (response.success) {
        relatedProducts = response.data?.filter(
          (data: any) => data.category === getProduct.category
        );
        setRelatedData(relatedProducts);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProductfun();
  }, [product_id]);

  useEffect(() => {
    if (getProduct) {
      getAllDatafun();
    }
  }, [getProduct]);

  return (
    <div>
      <Navbar />
      {getProduct && (
        <>
          <div className="bg-gray-200 flex w-screen h-screen p-5">
            <div className="w-[50%] h-[100%]">
              <img
                className="w-[90%] h-[100%]"
                src={getProduct.cover_image || ""}
                alt="product Image"
              />
            </div>
            <div className="flex flex-col w-[50%] gap-3">
              <h2 className="text-2xl ">{getProduct.category}</h2>
              <h1 className="text-4xl">{getProduct.product_name}</h1>
              <h2 className="text-2xl line-through text-gray-400">
                ${getProduct.original_price}
              </h2>
              <h2 className="text-3xl ">${getProduct.sale_price}</h2>
              <p className="text-xl font-light p-6">{getProduct.description}</p>
              <div className="flex gap-4 bg-white p-3 w-fit">
                <h2 className=" text-xl">Colors available:</h2>{" "}
                <div className="flex gap-2 py-1">
                  {" "}
                  {getProduct.colors.map((color: any) => (
                    // <div className={`rounded-full h-5 w-5 bg-${color}-400`}></div>
                    <p>{color}</p>
                  ))}
                </div>
              </div>
              <button className="bg-blue-500 text-white p-3 m-5 text-lg ">
                ADD TO CART
              </button>
            </div>
          </div>
          <div className="h-screen w-screen p-4">
            <hr />
            <div className="flex gap-5 py-3">
              <h2>Description</h2>
              <h2>Additional Information</h2>
              <h2>Reviews</h2>
            </div>
            <div className="p-5 m-5">
              <h1 className="text-3xl font-semibold ">Product Description</h1>
              <p className="p-5">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                doloribus maiore nulla. Labore, voluptatum doloribus est, dolore
                modi architecto a odio molestiae voluptate cum ducimus libero
                sunt qui itaque eius tempore corporis fugiat, beatae quaerat
                fuga. Impedit qui odio architecto vel! Corrupti atque voluptas
                quasi ipsum distinctio, blanditiis voluptate nihil ab soluta.
                Eius est ipsa voluptatum fuga recusandae sapiente voluptatem
                tenetur consectetur ipsam. Laudantium, dicta quaerat earum quas
                expedita praesentium sint quo, rem, sapiente doloremque optio
                mollitia inventore nam sed tempore temporibus? Vitae aspernatur
                ut iure quibusdam voluptas obcaecati rem omnis dignissimos quam
                repellat similique quae, velit esse provident doloremque, autem
                at cumque, blanditiis aliquam excepturi. Maiores vero laboriosam
                a sapiente nemo quod modi commodi doloribus porro!
                Exercitationem obcaecati aliquam, dolore dicta ab nesciunt
                officiis quidem ullam unde illo nostrum amet eaque minima fugiat
                harum saepe maxime aperiam alias assumenda rerum aliquid
                deleniti rem, necessitatibus est. Vel commodi dignissimos
                officia quod similique illum quis libero minima repellat
                accusantium unde sint tenetur ipsam odio molestiae, nisi
                officiis, et quae cum? Adipisci, excepturi quidem nostrum iste
                voluptas, sequi dolorem temporibus voluptatibus commodi,
                inventore hic voluptate sed vero pariatur quasi aspernatur nam
                repellat. Tempore libero qui architecto laboriosam cupiditate
                laudantium officia animi at dicta. Deleniti provident aperiam
                explicabo soluta eaque dignissimos enim laudantium animi magnam,
                excepturi cupiditate eveniet, laborum vero! Amet laboriosam et
                vel doloremque porro quae, eum esse commodi saepe quia eius ut
                modi dignissimos dolorem fugiat fuga, dolores provident nam
                dolor, repudiandae placeat velit enim! Ut, eligendi temporibus
                quia quo debitis consequatur minus molestias saepe facere neque,
                corporis error reprehenderit repudiandae optio. Labore, sit.
                Dicta atque veritatis quaerat aut esse, nam aperiam omnis rerum
                blanditiis ipsum ratione exercitationem dignissimos ut nesciunt
                doloribus, enim commodi nihil accusamus maxime harum doloremque
                ipsa voluptates? Exercitationem esse illum eum, quam soluta
                culpa itaque suscipit quo rem labore dolorem tempora ea
                molestiae? Ea, quia consequuntu r. Exercitationem aperiam eaque
                error dolore voluptas, deserunt sed expedita eius atque ducimus
                dicta vero beatae porro! Minus, accusamus?
              </p>
              <div className="flex justify-center w-full p-5">
              <div className="grid grid-cols-2 gap-10 w-[70%]">
                {getProduct.images.map((img: any) => (
                  <img className=" object-cover " src={img} alt="product Images" />
                ))}
              </div>

              </div>
            </div>
            <div className="h-screen w-screen">
              <h1 className="text-4xl font-semibold p-4">Related Products</h1>

              <div className="h-[70%] flex gap-3">
                {getRelatedData &&
                  getRelatedData.map((data: any) => (
                    <div  className="flex flex-col items-center gap-5 w-full">
                      <img
                        src={data.cover_image} // Replace with the actual image field
                        alt={data.product_name}
                        className="w-40 h-50 object-cover"
                      />
                      <h3 className="text-lg font-semibold">
                        {data.product_name}
                      </h3>
                    </div>
                  ))}
              </div>
            </div>
            <h1 className="text-4xl my-7 p-4 font-semibold">
              SALE UP TO 70% OFF FOR ALL CLOTHES & FASHION ITEMS, ON ALL BRANDS.
            </h1>
          </div>
        </>
      )}
    </div>
  );
}
const SuspendedPage = () => (
  <Suspense>
    <Page />
  </Suspense>
);

export default SuspendedPage;