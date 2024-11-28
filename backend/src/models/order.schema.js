const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
user_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer",
    required:true
},
payment_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Payment",
    required:true
},
total:{
    type:Number,
    required:true
},
first_name:{
    type:String,
    required:true
},
last_name:{
    type:String,
    required:true
},
country:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
order_notes:{
    type:String,

},
address:{
    type:String,
    required:true
},
payment_method:{
    type:String,
    required:true,
    enum:['debit card','Cash on Delivery','UPI',"Internet Banking"]

},

},{timeStamps:true})
const Order=mongoose.model("Order",orderSchema);
module.exports = Order;