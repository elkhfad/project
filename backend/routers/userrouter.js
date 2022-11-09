const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
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
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('items');
  response.json(users);
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const users = await User.findById(request.params.id).populate('items');
    if (users) {
      response.json(users);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
