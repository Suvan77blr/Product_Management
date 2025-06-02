const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { connectDB } = require("./Database/ConnectorDB.js");
const userRouter = require("./Routes/userRoutes.js");
const productRouter = require("./Routes/productRoutes.js");
const loginRouter = require("./Routes/loginRoutes.js");

const app = express();
// To handle docker error.
app.use(cors({
  origin: '*', // You can later restrict to specific domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../FrontEnd")));   
// app.use("/uploads",express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});
app.get("/manage-users",(req,res)=>{
    res.sendFile(path.join(__dirname,"../FrontEnd/Pages/ManageUsers.html"))
});

// Custom routes definition.
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/",loginRouter);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
