const express = require("express");
const {getAllProducts,getProductByName,createProduct,deleteProduct,updateProduct}= require("../Controllers/productController.js");

const productRouter = express.Router();

productRouter.get("/",getAllProducts);
productRouter.get("/byName",getProductByName);
productRouter.post("/",createProduct);
productRouter.delete("/byDetails",deleteProduct);
productRouter.put("/byDetails",updateProduct);

module.exports = productRouter;