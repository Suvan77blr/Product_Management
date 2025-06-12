// server.js from SchemaUpdation.

const mongoose = require("mongoose");
const { connectDB } = require("./Database/ConnectorDB.js");
const app = require("./app.js");

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

/* CODE-which REFUSED to Connect to Frontend :( */ 
// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const { connectDB } = require("./Database/ConnectorDB.js");
// const userRouter = require("./Routes/userRoutes.js");
// const productRouter = require("./Routes/productRoutes.js");
// const loginRouter = require("./Routes/loginRoutes.js");

// const app = express();

// // To handle docker error.
// app.use(cors({
//   origin: '*', // You can later restrict to specific domains
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));


// const PORT = process.env.PORT || 3000;

// connectDB();
// // Middleware
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "../FrontEnd")));   
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/users", userRouter);
// app.use("/products", productRouter);
// app.use("/", loginRouter);

// // Only start the server if this file is run directly
// if (require.main === module) {
//     const startServer = async () => {
//         try {
//             await connectDB();
//             app.listen(PORT, () => {
//                 console.log(`✅ Server running on http://localhost:${PORT}`);
//             });
//         } catch (error) {
//             console.error('Failed to start server:', error);
//             process.exit(1);
//         }
//     };
//     startServer();
// }

// module.exports = app;
