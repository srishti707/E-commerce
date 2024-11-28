const express=require("express");
const upload=require("../middleware/multer/multer");
const { signup,login,forgotPassword ,reset_Password} = require("../controllers/customer.controller");
const router=express.Router();
router.post("/signup",upload.single("avatar"),signup);
router.post("/login",login);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",reset_Password);

module.exports=router;