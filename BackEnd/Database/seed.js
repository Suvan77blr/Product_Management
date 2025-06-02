require('dotenv').config();

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../Models/UserSchema');

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Check if user already exists
    const existing = await User.findOne({ userId: '000' });
    if (existing) {
      console.log('✅ Admin user already exists.');
    } else {
      // Hash the password

      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashedPassword = await bcryptjs.hash(adminPassword, 10);

      // Create new admin user
      const user = new User({
        userId: '000',
        username: 'admin123',
        password: hashedPassword,
        email: 'admin@stratify.dev',
        role: 'superuser'
      });

      await user.save();
      console.log('✅ Admin user seeded successfully.');
      console.log(`[${new Date().toISOString()}] ✅ Admin user seeded.`);
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
  } finally {
    mongoose.disconnect();
  }
})();
