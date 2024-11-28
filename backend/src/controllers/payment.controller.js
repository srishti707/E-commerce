const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
exports.createOrder = async (req, res) => {
  try{
    console.log("====>",instance)

    const order = await instance.orders.create({
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  }
);
return res.status(200).json({
    success:true,
    data:order
})
}catch(err){
    console.log(err)
    return res.status(500).json({
        success:false,
        message:"Failed to create order"
    })
}
};
