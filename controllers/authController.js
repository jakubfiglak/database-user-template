const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
  });

  res.status(201).json({
    success: true,
    message: 'Successfully created new user!',
    data: user,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  res.send('User logged in');
});

// @desc View account details
// @route GET /api/v1/auth/login
// @access Private
exports.account = asyncHandler(async (req, res, next) => {
  res.send('Account details');
});
