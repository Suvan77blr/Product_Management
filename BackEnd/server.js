const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const User = require("../BackEnd/UserSchema.js");       // Importing the User Schema.

// MongoDB Connection.
mongoose.connect("mongodb://localhost:27017/product_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Should'nt be exported here...
// module.exports = mongoose.model("User", userSchema);

app.use(express.static(path.join(__dirname, "../FrontEnd"))); 

// Default OR Main ROUTE.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});

// Route to serve super user dashboard
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});

// Route to serve '/addUser' request.
app.post("/addUser", async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const newUser = new User({ 
            username, email, role 
        });

        await newUser.save(); // Store in MongoDB

        // Setting the response.
        res.json({ 
            message: "New-User added successfully!" 
        });
    } 
    catch (error) {   
        res.status(500).json({ 
            message: "Error adding user" 
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
