const express = require("express");
const { getAllUsers, getUserById, createUser, deleteUserById, updateUser} = require("../Controllers/userController.js");


const userRouter=express.Router();

userRouter.post("/",createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/byId/:userId", getUserById);
userRouter.delete("/byId", deleteUserById);
userRouter.put("/byId",updateUser);
// userRouter.put("/byDetails",updateUser);

module.exports=userRouter;
