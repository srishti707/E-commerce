const express=require("express");
const { createOrder,verifyPayments } = require("../controllers/payment.controller");
const router=express.Router();

router.post("/createOrder",createOrder);
router.post("/verifyPayment",verifyPayments);
module.exports=router;