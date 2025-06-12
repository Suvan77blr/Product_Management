const request = require("supertest");
const app = require("../app.js");
const User = require("../Models/UserSchema.js");
const Product = require("../Models/ProductSchema.js");
const bcrypt = require("bcryptjs");
const { connectDB } = require("../Database/ConnectorDB.js");
const mongoose = require("mongoose");

const timestamp = Date.now(); // Ensures uniqueness         // #..#

const testUser = {
    userId: `user-${timestamp}`,            // #..#
    email: `producttestuser${timestamp}@example.com`,   // #..#
    password: "password123",
    username: "producttestuser",
    role: "user",
};

const testProduct = {
    productId: `product-${timestamp}`, // #..#
    name: `Test Product ${timestamp}`, // #..#
    quantity: 100,
    price: 99.99,
};

let productDeleted = false;

describe("Product Management", () => {
    let token;

    beforeAll(async () => {
        // Connect to the test database
        await connectDB();

        // Clean up any existing test user
        await User.deleteOne({
            userId: testUser.userId,
            email: testUser.email,
        }); // #..#

        // Hash the password and create the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testUser.password, salt);
        await User.create({ ...testUser, password: hashedPassword });

        // Login to get token
        const res = await request(app).post("/login").send({
            email: testUser.email,
            password: testUser.password,
        });
        token = res.body.token;
    });

    it("should create a new product", async () => {
        const res = await request(app)
            .post("/products")
            .set("Authorization", `Bearer ${token}`)
            .send(testProduct);

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data).toHaveProperty("name", testProduct.name);
        expect(res.body.data).toHaveProperty("quantity", testProduct.quantity);
        expect(res.body.data).toHaveProperty("price", testProduct.price);
    });

    it("should retrieve all products", async () => {
        const res = await request(app)
            .get("/products")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(Array.isArray(res.body.data)).toBeTruthy();
    });

    it("should retrieve a product by ID", async () => {
        const res = await request(app)
            .get(`/products/byId/${testProduct.productId}`)
            .set("Authorization", `Bearer ${token}`);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data).toHaveProperty("productId", testProduct.productId);
    });

    it("should update an existing product", async () => {
        const updatedFields = {
            productId: testProduct.productId,
            quantity: 200,
            price: 149.99
        };

        const res = await request(app)
            .put("/products/byDetails")
            .set("Authorization", `Bearer ${token}`)
            .send(updatedFields);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.data).toHaveProperty("quantity", updatedFields.quantity);
        expect(res.body.data).toHaveProperty("price", updatedFields.price);
    });

    it("should delete an existing product", async () => {
        const res = await request(app)
            .delete("/products/byDetails")
            .set("Authorization", `Bearer ${token}`)
            .send({ productId: testProduct.productId });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBeTruthy();
        expect(res.body.message).toEqual("Product deleted successfully");
        productDeleted = true;
    });

    it("should return 404 for a deleted/non-existing product", async () => {
        const res = await request(app)
            .get(`/products/byId/${testProduct.productId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.success).toBeFalsy();
        expect(res.body.message).toEqual("Product not found");
    });

});

afterAll(async () => {
    // Clean up test user and product
    await User.deleteOne({ userId: testUser.userId, email: testUser.email }); // #..#

    if (!productDeleted) {
        const existing = await Product.findOne({ productId: testProduct.productId });
        if (existing) {
            await Product.deleteOne({ productId: testProduct.productId });
        }
    }

    // await Product.deleteOne({ productId: testProduct.productId }); // #..#
    await mongoose.connection.close();  // #..#
});
