const mongoose = require('mongoose');

const Product = mongoose.models.Product || mongoose.model('Product' ,
    new mongoose.Schema({
        name:{type:String ,required:true,unique:true},
        quantity:{type:Number, required:true},
        price:{type:Number, required:true},
        image:{type:String},
    },{timestamps:true}));

module.exports = Product;