const request = require("supertest");
const app = require("../app.js");
const User = require("../Models/UserSchema.js");
const bcrypt = require("bcryptjs");
const { connectDB } = require("../Database/ConnectorDB.js");
const mongoose = require("mongoose");

const timestamp = Date.now(); // Ensures uniqueness         // #..#

const testUser = {
    userId: `user-${timestamp}`, // #..#
    email: `producttestuser${timestamp}@example.com`, // #..#
    password: "password123",
    username: "producttestuser",
    role: "user",
};

describe("User Authentication", () => {
    // const testUser = {
    //   email: 'testuser@example.com',
    //   password: 'password123',
    //   username: 'testuser',
    //   role: 'user',
    // };

    beforeAll(async () => {
        // Connect to the test database
        await connectDB();

        // Clean up any existing test user
        // await User.deleteOne({
        //     userId: testUser.userId,
        //     email: testUser.email,
        // }); // #..#
        await User.deleteMany({ email: testUser.email });


        // Hash the password and create the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);
        await User.create({ ...testUser, password: hashedPassword });
    });

    it("should login a user with valid credentials", async () => {
        const res = await request(app).post("/login").send({
            email: testUser.email,
            password: testUser.password,
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("token");
    });

    it("should not login a user with invalid credentials", async () => {
        const res = await request(app).post("/login").send({
            email: "invaliduser@example.com",
            password: "wrongpassword",
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
});

afterAll(async () => {
    // Clean up test user after tests
    // await User.deleteOne({ userId: testUser.userId, email: testUser.email }); // #..#
/* ~~ */    await User.deleteMany({ email: testUser.email });

    await mongoose.connection.close();  // #..#
});
