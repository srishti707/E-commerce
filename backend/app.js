const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const customerRoutes = require("./src/routes/customer.routes");
const productRoutes = require("./src/routes/product.routes");
const cartItemRoutes = require("./src/routes/cart.Itemroutes");
const paymentRoutes=require("./src/routes/payment.routes");



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/customer/cart", cartItemRoutes);
app.use("/api/v1/payment",paymentRoutes)
// Load environment variables
dotenv.config();
module.exports = {app};
