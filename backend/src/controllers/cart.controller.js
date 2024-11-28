const CartItem=require("../models/cartItem.schema");
const mongoose=require("mongoose")
exports.createCart=async(req,res)=>{
    try{
        const {user_id,product_id,total_price,quantity,size,color}=req.body;
        
        const itemExists=await CartItem.findOne({product_id,user_id});
    
        if(!itemExists){
    
        const Item =  await CartItem.create({user_id,product_id,total_price,quantity,size,color});
        
        return res.status(200).json({
            success:true,
            data:Item,
            message:"added to cart"
        
        })}
        else{
            return res.status(201).json({
                success:false,
                data:itemExists,
                message:"item already exists"
            })
        }

    }

    catch(err){
        return res.status(500).json({
            success:false,
            message:"couldnt add item",
            error:err
        })
    }
}
exports.getCart=async(req,res)=>{
    //userId
    //find all cartItems of tht user
   
    const {user_id}=req.query;
    console.log(req.query)
    try{

        const data=await CartItem.aggregate([
            {
              $match: 
                { user_id: new mongoose.Types.ObjectId(String(user_id)) }

                
              
            },
            {
              $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product"
              }
            },
            {
              $project: {
                user_id: 1,
                product_id: 1,
                quantity: 1,
                total_price: 1,
                product: 1,
                size:1,
                subtotal: {
                  $multiply: ["$total_price", "$quantity"]
                }
              }
            },
            {
              $group: {
                _id: "$user_id",
                cartItems: {
                  $push: "$$ROOT"
                },
                totalAmount: {
                  $sum: "$subtotal"
                }
              }
            }
          ])
         
        return res.status(200).json({
            success:true,
            data
        
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            
            success:false,
            message:err
        })
    }


}
exports.updateCartItem=async (req,res)=>{
    
    try{
    const {cartItem_id}=req.query;
    const {color,size,quantity}=req.body;
    let updatedObj={};
    if(quantity){
        updatedObj.quantity=quantity;
    }
    if(size){
        updatedObj.size=size;
    }
    if(color){
        updatedObj.color=color;
    }
  const updatedItem= await CartItem.findByIdAndUpdate(cartItem_id,updatedObj,{new:true});
  return res.status(200).json({
    success:true,
    data:updatedItem,
    message:"Item updated successfully"
  })

}catch(err){
return res.status(500).json({
    success:false,
    message:"Item not updated"
})
}}
exports.deleteCartItem=async(req,res)=>{
    try{
        const {cartItem_id}=req.query;
        console.log(req.query)
      const deletedItem=  await CartItem.findByIdAndDelete(cartItem_id);
      
      return res.status(200).json({
        success:true,
        data:deletedItem,
        message:"Item deleted successfully"
      })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Item not deleted"
        })
    }
}