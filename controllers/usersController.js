const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc Get all users
// @route POST /api/v1/users
// @access Private (admin only)
exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    data: users,
  });
});
