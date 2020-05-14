const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid email address'],
    required: 'Please supply email address',
  },
  password: {
    type: String,
    required: 'Please supply a password',
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', userSchema);
