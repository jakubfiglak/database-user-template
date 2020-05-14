const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorResponse('User already exists', 400));
  }

  if (password !== passwordConfirm) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  user = await User.create({ name, email, password });

  const token = user.getJwt();

  res.status(201).json({
    success: true,
    message: 'Successfully created new user!',
    token,
  });
});

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide an email and a password', 400)
    );
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const match = await user.comparePasswords(password);

  if (!match) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getJwt();

  res.status(201).json({
    success: true,
    message: 'Login success!',
    token,
  });
});

// @desc View account details
// @route GET /api/v1/auth/login
// @access Private
exports.account = asyncHandler(async (req, res, next) => {
  res.send('Account details');
});
