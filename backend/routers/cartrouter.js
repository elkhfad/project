const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const cartRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getToken = require('../utils/token');

cartRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  let items = [];
  console.log(body);

  const cart = new Cart({
    amount: body.amount,
    user: user._id,
    item: items._id,
  });
  console.log(body.item);
  try {
    const savedCart = await cart.save();
    user.carts = user.carts.concat(savedCart._id);
    await user.save();
    response.json(savedCart);
  } catch (exception) {
    next(exception);
  }
});
module.exports = cartRouter;
