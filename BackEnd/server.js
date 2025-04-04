import dotenv from "dotenv";
import { connectDB } from "./Database/ConnectorDB.js";
import userRouter from "./Routes/userRoutes.js";

dotenv.config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../FrontEnd"))); 
app.use("/userOperations",userRouter)
connectDB();
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});

// Route to serve super user dashboard
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
