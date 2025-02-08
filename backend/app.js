const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const customerRoutes = require("./src/routes/customer.routes");
const productRoutes = require("./src/routes/product.routes");
const cartItemRoutes = require("./src/routes/cart.Itemroutes");
const paymentRoutes=require("./src/routes/payment.routes");
const addressRoutes=require("./src/routes/address.routes");
const createRoutes=require("./src/routes/createOrder.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/customer/cart", cartItemRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/ap1/v1/address",addressRoutes);
app.use("/ap1/v1/createOrder",createRoutes);
// Load environment variables
dotenv.config();
module.exports = {app};
