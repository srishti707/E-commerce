import React from "react";

const Cards = () => {
  const cards = [
    {
      id: 1,
      title: "20% OFF On all Eyewears",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​",
      image:
        "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/men-fashion-free-img.jpg",
      shop: "CHECK NOW",
    },
    {
      id: 2,
      title: "Comfy Shoes for you",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum.​",
      image:
        "	https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/footwear-free-img.jpg",
      shop: "SHOP NOW",
    },
    {
      id: 3,
      title: "20% off on Tank Tops",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac dictum",
      image:
        "https://websitedemos.net/brandstore-02/wp-content/uploads/sites/150/2018/12/women-fashion-free-img.jpg",
      shop: "SHOP NOW",
    },
    // Add more products here...
  ];

  return (
    <div className=" h-screen w-[80%] gap-5 grid grid-cols-3 py-4 mx-auto">
      
      {cards.map((obj) => {
        return (
          <div style={{backgroundImage:`url(${obj.image})`}}
           className="h-[80%] bg-cover bg-center flex flex-col justify-end relative ">
                 <div className="absolute inset-0 bg-black bg-opacity-50 "></div>
            <div className=" m-7 z-10 flex flex-col gap-5 ">
            <h1 className="text-white text-3xl font-semibold ">{obj.title}</h1>
            <h2 className="text-white text-lg">{obj.description}</h2>
            <button className=" text-black  bg-white w-fit px-3 py-3">{obj.shop}</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
