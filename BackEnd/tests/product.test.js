const request = require('supertest');
const app = require('../server.js'); // Adjust the path to your Express app

describe('Product Management', () => {
  let token;

  beforeAll(async () => {
    // Login to get token
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        quantity: 100,
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  it('should retrieve all products', async () => {
    const res = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
