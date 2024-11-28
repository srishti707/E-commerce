const express=require("express");
const { createOrder } = require("../controllers/payment.controller");
const router=express.Router();

router.post("/createOrder",createOrder);
module.exports=router;