module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  testTimeout: 15000,
  // optionally based on environment
  verbose: process.env.NODE_ENV !== 'production',
};