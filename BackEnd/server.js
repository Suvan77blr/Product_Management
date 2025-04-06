const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { connectDB } = require("./Database/ConnectorDB.js");
const userRouter = require("./Routes/userRoutes.js");
const productRouter = require("./Routes/productRoutes.js");


const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../FrontEnd")))

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


app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
