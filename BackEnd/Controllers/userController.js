
const mongoose = require("mongoose");
const User= require("../Models/UserSchema.js");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req,res) =>{
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

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId) {
            return res.status(400).json({success: false, message: "User ID required"});
        }
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({success: true, data: user});
    } catch (error) {
        console.error("Error in fetching the User:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};
const createUser= async (req, res) => {
    const userData = req.body;
    if(!userData.userId || !userData.username || !userData.password || !userData.email || !userData.role)
    {
        return res.status(400).json({success:false, message:"Please provide all the details"});
    }
    
    // Checking uniqueness of both UserId & email.
    const existingUser = await User.findOne({
        $or: [{ userId: userData.userId }, { email: userData.email }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    //Actual hashing parts-using bcrypt
    const salt = await bcrypt.genSalt(10); // 10 is good balance between speed and security
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try{
        const newUser= new User(
            {
                userId: userData.userId,
                username: userData.username,
                password: hashedPassword,
                email: userData.email,
                role: userData.role
            }
        );
        await newUser.save();
        res.status(201).json({success: true, data: newUser});
    }
    catch(error)
    {
        console.error("Error in creation of user: ",error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

 const deleteUserById =async (req,res)=>{
    const { userId }=req.body;  //we assume we will be getting userId and email and build the endpoint accordingly
    // const {userId,email}=req.body;  //we assume we will be getting userId and email and build the endpoint accordingly

    try{
        const user =await User.findOneAndDelete({ userId });
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
        console.error("Error in deleting user:",error.message);
        res.status(500).json({success:false,message:"Server Error"});
    }
};

const updateUser = async (req, res) => {
    const { userId, ...updateData } = req.body;

    if (!userId || !email) {
        return res.status(400).json({ success: false, message: "userId and Email are required." });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            // { userId, email },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.status(200).json({ success: true, data: updatedUser });

    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

module.exports = { getAllUsers, getUserById, createUser, deleteUserById, updateUser};
