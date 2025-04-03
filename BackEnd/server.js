const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.static(path.join(__dirname, "../FrontEnd"))); 

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
});

// Route to serve super user dashboard
app.get("/superUser", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
});

// Route to serve normal user dashboard
app.get("/userDashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../userDashboard.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
