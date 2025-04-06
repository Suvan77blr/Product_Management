const express = require("express");
const {createUser, deleteUser, getUsers, updateUser} = require("../Controllers/userController.js");


const userRouter=express.Router();

userRouter.get("/",getUsers);
userRouter.post("/",createUser);
userRouter.delete("/byDetails",deleteUser);
userRouter.put("/byDetails",updateUser);

module.exports=userRouter;
