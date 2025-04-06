
const mongoose = require("mongoose");
consrt Product = require("../Models/ProductSchema.js");

const getProductByName = async (req, res) => {
    try {
        const products = await Product.findOne({name});
        res.status(200).json({success: true, data: users});
    }
    catch(error) {
        console.error("Error in fetching all the users: ", error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const createProduct = async (req,res) => {
    const product = req.body;
    if(!product.name || !product.quantity || !product.price)
    {
        res.status(400).json({success:false, message:"Please provide all the details"});
    }
    const newProduct= new Product(product);
    try{

        await newProduct.save();
        res.status(201).json({success:true,data:newProduct});
    }
    catch(error)
    {
        console.error("Error in creation of product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};