const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    product_name:{
        type:String,
        required:true,
    },
    original_price:{
        type:Number,
        required:true,
    },
    sale_price:{
        type:Number,
        required:true,
    },
    brief_description:{
        type:String,
        required:true,
    },
    cover_image:{
        type:String,
        // required:true,
    },
    images:{
        type:Array,
        // required:true,
    },
    shipping_charges:Number,
    stock:Number,
    description:String,
    features:[
        {
            feature:String,
            description:String,
            feature_img:String,
        }

],
average_rating:{
    type:Number,
    default:0
},
colors:[String],
sizes:[
    {
        size:String,
        stock:Number
    }
],
category:String
});
const Product=mongoose.model("Product",productSchema);
module.exports=Product;
