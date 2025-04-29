const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../Models/UserSchema.js"); // Ensure correct path
const dotenv = require("dotenv");
dotenv.config();
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
        success: true,
        token,
        user
    });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports={loginUser};