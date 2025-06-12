const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Product = require("../Models/ProductSchema.js");

const getAllProducts = async(req,res)=>
{
    try{
        const products = await Product.find({});
        res.status(200).json({success:true,data:products});
    }
    catch(error)
    {
        console.error("Error in fetching all the products:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const getProductById = async (req, res) => {
    try {
        // const { productId } = req.body;
        const { productId } = req.params;
        if(!productId) {
            return res.status(400).json({success: false, message: "Product ID required"});
        }
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({success: true, data: product});
    }
    catch(error) {
        console.error("Error in fetching the Product ", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const createProduct = async (req,res) => {
    try {
        const { productId, name, quantity, price } = req.body;

        if (!productId || !name || !quantity || !price) {
            return res.status(400).json({
                success: false,
                message: "Please provide the details: name, quantity and price",
            });
        }

        const existingProduct = await Product.findOne({
            productId: productId
        });

        if(existingProduct) {
            return res.status(400).json({ message: 'Product already exists!'});
        }

        const image = req.file ? "uploads/" + req.file.filename : null;

        const newProduct = new Product({ productId, name, quantity, price, image });

        await newProduct.save();

        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creation of product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const deleteProduct = async (req, res)=>{
    
    try {
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID required" });
        }

        const deleted = await Product.findOneAndDelete({ productId: productId });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if (deleted.image) {
            const imagePath = path.resolve(deleted.image);  // Get absolute path
            // OPTIONAL: Ensure file is within uploads directory (safety check)
            const uploadsDir = path.resolve("uploads");
            if (imagePath.startsWith(uploadsDir)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.warn("Could not delete image file:", err.message);
                    } else {
                        console.log("Image file deleted:", imagePath);
                    }
                });
            }
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const updateProduct = async (req,res)=>{
    const {productId ,...updatedData}= req.body;
    if(!productId)
    {
        return res.status(400).json({ success: false, message: "productId of the product is required." });
    }
    // const {name ,...updatedData}= req.body;
    // if(!name)
    // {
    //     return res.status(400).json({ success: false, message: "Name of the product is required." });
    // }
    try{
        const updatedProduct = await Product.findOneAndUpdate(
            {productId}, updatedData, {new:true}
            // {name},updatedData,{new:true}
        );
        if(!updatedProduct)
        {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    }
    catch (error) {
    console.error("Error updating Product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
    }   
}
module.exports = {getAllProducts,getProductById,createProduct,deleteProduct,updateProduct};