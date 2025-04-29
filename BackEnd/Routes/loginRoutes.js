const express =require("express");
const {loginUser}=require("../Controllers/loginController.js");


const loginRouter = express.Router();

loginRouter.post("/login",loginUser);

module.exports = loginRouter;