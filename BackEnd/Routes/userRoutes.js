const express = require("express");
const {createUser, deleteUser, getUsers, updateUser} = require("../Controllers/userController.js");


const userRouter=express.Router();

userRouter.get("/",getUsers);
userRouter.post("/",createUser);
userRouter.delete("/:id",deleteUser);
userRouter.put("/:id",updateUser);

module.exports=userRouter;
