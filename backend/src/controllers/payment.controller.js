const Razorpay = require("razorpay");
const crypto=require("crypto")
const Payment=require("../models/payment.schema")
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});
exports.createOrder = async (req, res) => {
  try {
    console.log("====>", instance);
    const { amount } = req.body;
    const order = await instance.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};
exports.verifyPayments = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,user } = req.body;
    const hmac = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);
    hmac.update(razorpay_order_id+"|"+razorpay_payment_id)
    const generated_signature=hmac.digest("hex")
    if(generated_signature==razorpay_signature){
      //save information to database
     const response= await Payment.create({
      razorpay_order_id,razorpay_payment_id,razorpay_signature,user,  
      })
      return res.status(200).json({
        success:true,
        data:razorpay_payment_id,
      
      })
    }


  } catch (err) {
    return res.status(500).json({
      success:false,
      message:err
    })
  }
};
