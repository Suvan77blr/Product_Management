// FrontEnd/config.js

const IS_PRODUCTION = window.location.hostname !== 'localhost';

const API_BASE_URL = IS_PRODUCTION
  ? 'https://product-management-vgsh.onrender.com'
  : 'http://localhost:3000';

console.log('Using API URL:', API_BASE_URL);  
