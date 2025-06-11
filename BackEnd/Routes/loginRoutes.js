const express = require("express");
const {loginUser} = require("../Controllers/loginController.js");
const path = require("path");

const loginRouter = express.Router();

loginRouter.post("/login",loginUser);

module.exports = loginRouter;