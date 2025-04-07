const express = require("express");
const {getAllProducts,getProductByName,createProduct,deleteProduct,updateProduct}= require("../Controllers/productController.js");
const multer = require("multer");



const productRouter = express.Router();
productRouter.get("/",getAllProducts);
productRouter.get("/byName",getProductByName);
productRouter.delete("/byDetails",deleteProduct);
productRouter.put("/byDetails",updateProduct);

const storage = multer.diskStorage
({
    destination:(req,file,cb)=>{cb(null,"uploads/");},
    filename:(req,file,cb)=>{cb(null,Date.now()+"-"+file.originalname);}

});
const upload= multer({storage});

productRouter.post("/",upload.single("image"),createProduct);
module.exports = productRouter;