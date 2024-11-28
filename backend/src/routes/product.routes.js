const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  createProducts,
  getProduct,
  getHomePageData
} = require("../controllers/product.controller");
const upload=require("../middleware/multer/multer")
const router = express.Router();

router.post(
  "/create",
  createProduct
);
router.get("/homepage",getHomePageData)
router.post("/update",
 upload.fields([
    { name: "productImages", maxCount: 10 },
    { name: "coverImage", maxCount: 1 },
  ]), updateProduct);
router.get("/getAll", getAllProducts);
router.get("/getProduct",getProduct);
router.post("/createAll", createProducts);
module.exports = router;
