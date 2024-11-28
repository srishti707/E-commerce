const mongoose=require("mongoose");
const orderItemSchema=new mongoose.Schema({
    order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})
const orderItem=mongoose.model("orderItem", orderItemSchema);

module.exports=orderItem;