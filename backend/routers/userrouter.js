const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/api/users', async (request, response) => {
  const { firstName, lastName, email, city, street, postalCode, password } = request.body;

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return response.status(400).json({
      error: 'Email exist',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    firstName,
    lastName,
    email,
    city,
    street,
    postalCode,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});
usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({}).find({}).populate('items');
  response.json(users);
});

module.exports = usersRouter;
