const mongoose = require("mongoose");
const address = require("../models/address.schema");
const { findOne } = require("../models/cartItem.schema");
exports.createAddress = async (req, res) => {
  try {
    const { userId, city, pincode, state, street, country } = req.body;
    const Address = await address.create({
      userId,
      city,
      pincode,
      state,
      street,
      country,
    });
    return res.status(200).json({
      success: true,
      data: Address,
      message: "Address added successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
exports.getUserAddresses = async (req, res) => {
  try {
    const { user_id } = req.query;
    const allAddress = await address.find({ user_id });
    return res.status(200).json({
      success: true,
      data: allAddress,
      message: "fetched all saved addresses of user",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

