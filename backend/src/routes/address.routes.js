const mongoose=require("mongoose");
const express=require("express");
const {createAddress,getUserAddresses}=require("../controllers/address.controller");

const router=express.Router();
router.post("/create",createAddress);
router.get("/get",getUserAddresses);
module.exports=router;