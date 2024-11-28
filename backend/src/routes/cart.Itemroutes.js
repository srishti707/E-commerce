const express=require("express");
const {createCart,updateCartItem,deleteCartItem,getCart}=require("../controllers/cart.controller");
const router=express.Router();
router.post("/add",createCart);
router.post("/update",updateCartItem);
router.post("/delete",deleteCartItem);
router.get("/get",getCart);
module.exports=router
