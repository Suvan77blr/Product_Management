const request = require('supertest');
const app = require('../server.js'); // Adjust the path to your Express app

describe('User Authentication', () => {
  it('should login a user with valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'invaliduser@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });
});
