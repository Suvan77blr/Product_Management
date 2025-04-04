import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Database/ConnectorDB.js";
import userRouter from "./Routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from 'url';
// dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
// const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../FrontEnd"))); 
app.use("/userOperations",userRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});

// Route to serve super user dashboard
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
