const express = require("express");
const {getAllProducts,getProductById,createProduct,deleteProduct,updateProduct}= require("../Controllers/productController.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage
({
    destination:(req,file,cb)=>{
        const uploadPath = path.join(__dirname, "..", "uploads");
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath);
        }
        cb(null,uploadPath);
    
    },
    filename:(req,file,cb)=>{cb(null,Date.now()+"-"+file.originalname);}

});
const upload= multer({storage});
const productRouter = express.Router();
productRouter.get("/",getAllProducts);
productRouter.get("/byId/:productId",getProductById);
productRouter.delete("/byDetails",deleteProduct);
productRouter.put("/byDetails",updateProduct);
productRouter.post("/",upload.single("image"),createProduct);

module.exports = productRouter;