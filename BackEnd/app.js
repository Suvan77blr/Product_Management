// Raw Express-instance. => seperating from server.js for the sake of testing.

const express = require("express");
const path = require("path");
const cors = require("cors");

const userRouter = require("./Routes/userRoutes.js");
const productRouter = require("./Routes/productRoutes.js");
const loginRouter = require("./Routes/loginRoutes.js");

const app = express();

// Express-Middlewares. -> 1.
app.use(express.json());    // JSON parser.
app.use(
    cors({
        origin: "*", // You can later restrict to specific domains
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
/*
    Handling CORS later:
    const IS_PRODUCTION = process.env.NODE_ENV === 'production';
    origin: IS_PRODUCTION ? 'https://your-frontend-url.com' : 'http://localhost:5173',

*/


// API Routes. -> 2.
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/", loginRouter);
// Backend API routes to be defined before the React-static & '*'-catch.

// Serving static frontend. -> 3.
app.use(express.static(path.join(__dirname, "../FrontEnd_React/dist")));    // Serve static React assets

// React-router catch-all. -> 4.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd_React/dist/index.html"));
});

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));   // For serving uploads.

// Vanilla-Stack Static pages handling...
// app.use(express.static(path.join(__dirname, "../FrontEnd")));

// ReactJS - Dynamic pages handling...

// Catch-all route: for React Router (client-side routing)

module.exports = app;



// Routes definition. => Static handling .. in Vanilla stack.
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../FrontEnd/Pages/LoginPage.html"));
// });
// app.get("/superUser", (req, res) => {
//     res.sendFile(path.join(__dirname, "../FrontEnd/Pages/SuperUserPage.html"));
// });
// app.get("/manage-users", (req, res) => {
//     res.sendFile(path.join(__dirname, "../FrontEnd/Pages/ManageUsers.html"));
// });
