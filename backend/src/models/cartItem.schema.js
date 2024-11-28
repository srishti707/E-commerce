const mongoose=require("mongoose");
const cartItemSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
   product_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Product",
    required:true
   },
    total_price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:[true,"Quantity is required"]
    },
    color:{
        type:String,
     
    },
    size:{
        type:String,
        required:true
    }
},{timestamps:true})
const CartItem=mongoose.model("CartItem",cartItemSchema);
module.exports=CartItem;