const mongoose = require("mongoose");
const Product = require("../models/product.schema");
const { findByIdAndUpdate } = require("../models/customer.schema");
const { uploadMultipleImages } = require("../services/cloudinary");

exports.createProduct = async (req, res) => {
  //1.take fields from the body to create a new product
  const {
    product_name,
    original_price,
    sale_price,
    brief_description,
    cover_img,
    images,
    shipping_charges,
    stock,
    description,
    features,
    average_rating,
    colors,
    sizes,
    category,
  } = req.body;
  //2. Create
  try {
    const newProduct = await Product.create({
      product_name,
      original_price,
      sale_price,
      brief_description,
      cover_img,
      images,
      shipping_charges,
      stock,
      description,
      features,
      average_rating,
      colors,
      sizes,
      category,
    });
    //3. return the new product with status 201 created
    return res.status(201).json({
      success: true,
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: err,
    });
  }
};
exports.createProducts = async (req, res) => {
  try {
    const { products } = req.body;
    console.log(req.files)
    const newProducts = await Product.insertMany(products);
    return res.status(201).json({
      success: true,
      data: newProducts,
      message: "Products created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create products",
      error: err,
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    //1.Take val to search from query.
    const {searchVal,sort,limit,page}=req.query;
    console.log(req.query);
    let filteredObj={};
    let sortBy={};
    //1.searching
    if(searchVal){  
       
        filteredObj.$or=[
            {product_name:{
                $regex: searchVal,
                $options: "i",
  
            }},
            {category:{
                $regex: searchVal,
                $options: "i",
            }}];

    }
    //2.sorting
    if(sort){
     console.log(req.query);
     sortBy=req.query.sort.split(",").join(" ");
     console.log(sortBy);

    }
    //3.pagination
    const skip=(Number(page)-1)*Number(limit);
    //4.advanced filtering
    let query_copy={...req.query};
    let values_to_delete=["page","limit","sort","searchVal"];
    values_to_delete.forEach(val=>delete query_copy[val]);
    let queryString=JSON.stringify(query_copy);
    console.log(queryString);
    queryString=queryString.replace(/\b(gt|gte|lt|lte|in)\b/g,(matchedVal)=>`$${matchedVal}`);
    let query=JSON.parse(queryString);
    console.log("changled query ",query);
    filteredObj={...filteredObj,...query};
    const totalProducts=await Product.countDocuments(filteredObj);
    console.log(filteredObj);
    const AllProducts = await Product.find(filteredObj).sort(sortBy).skip(skip).limit(Number(limit));
  
    return res.status(200).json({
      success: true,
      page,
      totalProducts,
      totalPages:Math.ceil(totalProducts/Number(limit)),
      data: AllProducts,
      message: "product received successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "could not receive all products",
      error: err,
    });
  }
  
};
exports.getProduct=async(req,res)=>{
  const {product_id}=req.query;
  const product=await Product.findById(product_id);
if(!product){
  return res.status(500).json({
    success:false,
    message:"Product not fetched."
  })
}
  return res.status(200).json({
    success:true,
    data:product
    
  })

}

exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.query;
    const {
      product_name,
      original_price,
      sale_price,
      brief_description,
      cover_img,
      images,
      shipping_charges,
      stock,
      description,
      features,
      average_rating,
      colors,
      sizes,
      category,
    } = req.body;
    console.log(req.query);
    const updatedObj = {};
    if (product_name) {
      updatedObj.product_name = product_name;
    }
    if (original_price) {
      updatedObj.original_price = original_price;
    }
    if (sale_price) {
      updatedObj.sale_price = sale_price;
    }
    if (brief_description) {
      updatedObj.brief_description = brief_description;
    }
    if (shipping_charges) {
      updatedObj.shipping_charges = shipping_charges;
    }

    if (stock) {
      updatedObj.stock = stock;
    }
    if (description) {
      updatedObj.description = description;
    }
    if (features) {
      updatedObj.$push = { features: { $each: features } };
    }
    if (average_rating) {
      updatedObj.average_rating = average_rating;
    }
    if (colors) {
      updatedObj.$push = { colors: { $each: colors } };
    }
    if (sizes) {
      updatedObj.$push = { sizes: { $each: sizes } };
    }
    if (category) {
      updatedObj.category = category;
    }

    if(req.files){
      console.log(req.files);
      let paths=[];
      if(req.files.coverImage){
        const CI=  req.files.coverImage[0].path;
        paths.push(CI);
      }

      if(req.files.productImages){
        req.files.productImages.forEach((img)=>{
            const CI=img.path;
            paths.push(CI);
        })
      }
      console.log(paths);

      const uploadedImgs=await uploadMultipleImages(paths);
      console.log(uploadedImgs);

      const uplodedImges_secureUrls=[];
      let productImgs=[];
      uploadedImgs.forEach((img)=>{
       uplodedImges_secureUrls.push( img.secure_url);
      })

      if(req.files.coverImage){
        updatedObj.cover_image=uplodedImges_secureUrls[0];
      }
      if(req.files.productImages){
        updatedObj.images=uplodedImges_secureUrls;
      }
    
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      product_id,
      updatedObj,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: updatedProduct,
      message: "Product updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: err,
    });
  }
};
exports.getHomePageData=async(req,res)=>{
  try{
    const homePageData=await Product.find({
       images: { $exists: true, $ne: null } },
    )
    return res.status(200).json({
      success:true,
      data:homePageData
    });

  }catch(err){
    res.status(400).json({
      success:false,
      data:err,
    })
  }
}
exports.deleteProduct=async(req,res)=>{
  try{
    const {product_id}=req.query;
    const deletedProduct=Product.findByIdAndDelete(product_id);
    return res.status(200).json({
      success:true,
      data:deletedProduct,
      message:"Product deleted successfully"
    })

  }catch(err){
    res.status(400).json({
      success:false,
      message:"Failed to delete product",
      error:err
    })
  }
}
// coverImage: [
//   {
//     fieldname: 'coverImage',
//     originalname: 'WhatsApp Image 2022-07-25 at 11.45.23 PM.jpeg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877361-153994208-WhatsApp Image 2022-07-25 at 11.45.23 PM.jpeg',
//     path: 'public\\uploads\\1731512877361-153994208-WhatsApp Image 2022-07-25 at 11.45.23 PM.jpeg',
//     size: 162916
//   }
// ],
// productImages: [
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_044715.jpg',   
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877382-959553143-IMG_20240918_044715.jpg',
//     path: 'public\\uploads\\1731512877382-959553143-IMG_20240918_044715.jpg',
//     size: 3486776
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_045113.jpg',   
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877462-168855307-IMG_20240918_045113.jpg',
//     path: 'public\\uploads\\1731512877462-168855307-IMG_20240918_045113.jpg',
//     size: 3724547
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_045302.jpg',   
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877508-43454150-IMG_20240918_045302.jpg',
//     path: 'public\\uploads\\1731512877508-43454150-IMG_20240918_045302.jpg',
//     size: 6063085
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_190426.jpg',   
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877717-211300741-IMG_20240918_190426.jpg',
//     path: 'public\\uploads\\1731512877717-211300741-IMG_20240918_190426.jpg',
//     size: 5236483
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_190808.jpg',   
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877837-73506497-IMG_20240918_190808.jpg',
//     path: 'public\\uploads\\1731512877837-73506497-IMG_20240918_190808.jpg',
//     size: 4352092
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_221937.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877929-83631777-IMG_20240918_221937.jpg',
//     path: 'public\\uploads\\1731512877929-83631777-IMG_20240918_221937.jpg',
//     size: 6559228
//   }
// ]
// }
//     filename: '1731512877837-73506497-IMG_20240918_190808.jpg',
//     path: 'public\\uploads\\1731512877837-73506497-IMG_20240918_190808.jpg',
//     size: 4352092
//   },
//   {
//     fieldname: 'productImages',
//     originalname: 'IMG_20240918_221937.jpg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: './public/uploads',
//     filename: '1731512877929-83631777-IMG_20240918_221937.jpg',
//     path: 'public\\uploads\\1731512877929-83631777-IMG_20240918_221937.jpg',
//     size: 6559228
//   }
// ]
// }




//     destination: './public/uploads',
//     filename: '1731512877929-83631777-IMG_20240918_221937.jpg',
//     path: 'public\\uploads\\1731512877929-83631777-IMG_20240918_221937.jpg',
//     size: 6559228
//   }
// ]
// }
// ',
//     size: 6559228
//   }
// ]
// }
// }