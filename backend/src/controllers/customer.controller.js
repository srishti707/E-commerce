const Customers = require("../models/customer.schema");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { welcomeEmail, resetPasswordEmail } = require("../services/emails");
const { randomBytes, createHash } = require("crypto");
const { uploadSingleImage } = require("../services/cloudinary");

exports.signup = async (req, res) => {
  //data fields from req.body
  console.log(req.body);
  console.log(req.file);
  const { name, email, phone_no, password, gender, confirm_password } = req.body;
  //check if user with this email a;ready exists.
  try {
    const customerExists = await Customers.findOne({ email });
    //if exists ...show error "user already exists"
    if (customerExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    let avatar;
    if(req.file){
    avatar=await uploadSingleImage(req.file.path)
    }
    console.log(avatar)
    //hash user password..install bcryptjs
    // const hashedPassword= await bcrypt.hash(password,12);
    //if user does not exist..then create a new user
    const customer = Customers.create({
      name,
      email,
      phone_no,
      password,
      avatar:avatar?.url,
      gender,
      confirm_password,
    });
    await welcomeEmail(email);
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err,
    });
  }
};
exports.login = async (req, res) => {

  //1.take user data (email,password) from req.body
  const { email, password } = req.body;

  //2.find user by email
  try {
    const customerExists = await Customers.findOne({ email });
    //3.if user does not exists ..>error("user doesnot exist")
    if (!customerExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }
    //4.if user exists -> match  password
    const isPasswordMatched = await bcrypt.compare( password,customerExists.password);
    //5.if password does not match ..>error("password does not match")
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
    //5.create token
    const payload = {
      email,
      name: customerExists.name,
      _id: customerExists._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    return res.status(200).json({
      success: true,
      token,
      user:customerExists,
      message: "Login success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const customerExists = await Customers.findOne({ email });
    if (!customerExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    //generate a random token
    const resetToken = randomBytes(32).toString("hex");
    customerExists.reset_password_token = createHash("sha256").update(resetToken).digest("hex");
    customerExists.reset_password_token_expiry = Date.now() + 10 * 60 * 1000;
    await customerExists.save({ validateBeforeSave: false });
    //generate a link.
   // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/customer/reset-password?token=${resetToken}`;
   const resetUrl=`http://localhost:3000/reset-password?token=${resetToken}`
   //send the link in email
    await resetPasswordEmail(resetUrl,email);
    return res.status(200).json({
      success: true,
      message: "Reset password link sent successfully",
      resetUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
exports.reset_Password = async (req, res) => {
  try {
    const { token } = req.query;
    const {password,confirm_password}=req.body;
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const customerExists = await Customers.findOne({
      reset_password_token: hashedToken,
      reset_password_token_expiry: { $gt: Date.now() },
    });
    if(!customerExists){
      return res.status(400).json({
        success: false,
        message: "Token expired or invalid",
      });
      
    }
    customerExists.password=password;
    customerExists.confirm_password=confirm_password;
    customerExists.reset_password_token=undefined;
    customerExists.reset_password_token_expiry=undefined;
    await customerExists.save();
    return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

