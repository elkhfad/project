const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getToken = require('../utils/token');

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
usersRouter.get('/', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  try {
    response.json(user);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
