const mongoose=require("mongoose");
const PaymentSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Customer",
    required:true,

},
razorpay_payment_id:{
type:String,
required:true,

},
razorpay_order_id:{
    type:String,
    required:true,
},
razorpay_signature:{
    type:String,
    required:true
}
},
{
    timestamps:true
})
const Payment=mongoose.model("Payment",PaymentSchema)
module.exports=Payment