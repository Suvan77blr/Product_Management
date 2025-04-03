const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/product_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "superuser"], required: true }
});

module.exports = mongoose.model("User", userSchema);

const User = require("./models/User");
app.use(express.static(path.join(__dirname, "../FrontEnd"))); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});

// Route to serve super user dashboard
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});

app.post("/addUser", async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const newUser = new User({ username, email, role });

        await newUser.save(); // Store in MongoDB
        res.json({ message: "User added successfully!" });
    } catch (error) {   
        res.status(500).json({ message: "Error adding user" });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
