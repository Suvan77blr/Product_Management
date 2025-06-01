module.exports = {
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  // optionally based on environment
  verbose: process.env.NODE_ENV !== 'production',
};