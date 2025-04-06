
const mongoose = require("mongoose");
const User= require("../Models/UserSchema.js");

const getUsers = async (req,res) =>{
    try{
        const users = await User.find({});
        res.status(200).json({success:true,data:users});
    }
    catch(error)
    {
        console.error("Error in fetching all the users:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const createUser= async (req,res)=>{
    const user= req.body;
    if(!user.username || !user.password || !user.email || !user.role)
    {
        res.status(400).json({success:false, message:"Please provide all the details"});
    }
    const newUser= new User(user);
    try{

        await newUser.save();
        res.status(201).json({success:true,data:newUser});
    }
    catch(error)
    {
        console.error("Error in creation of product:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }

};

 const deleteUser =async (req,res)=>{
    const {username,email}=req.body;  //we assume we will be getting username and email and build the endpoint accordingly

    try{
        const user =await User.findOneAndDelete({username,email});
        if(!user)
        {
            return res.status(400).json({success:false,message:"User not found"});
        }
        else{
            res.status(200).json({success:true,message:"User Deleted successfully"});
        }

    }
    catch(error)
    {
        // console.error("Error in deleting user:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const updateUser = async(req,res)=>{
    const {id} = req.params;
    const user = req.body;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({success:false,message:"No such Product found"});
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(id,user,{new:true});
        res.status(200).json({success:true,data:updatedUser});   
    }
    catch(error)
    {
        console.error("Error in updating the user:",error.message);
        res.status(500).json({success:false, message:"Server Error"});
    }
};

module.exports={getUsers,createUser,deleteUser,updateUser};
