const mongoose = require('mongoose');

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "superuser"], required: true }
}, { timestamps: true }));

module.exports = User ;
