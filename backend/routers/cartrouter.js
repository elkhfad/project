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
  body.map((item) => {
    items.push(item.item);
  });
  const cart = new Cart({
    amount: body.amount,
    user: user._id,
    items: items,
    time: new Date(),
  });
  try {
    const savedCart = await cart.save();
    user.carts = user.carts.concat(savedCart._id);
    await user.save();
    response.json(savedCart);
  } catch (exception) {
    next(exception);
  }
});
cartRouter.get('/', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  try {
    const carts = await Cart.find();
    const cartsByUser = carts.filter((userByCart) => {
      return userByCart.user.valueOf() === user._id.valueOf();
    });

    if (cartsByUser) {
      response.json(cartsByUser);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});
cartRouter.get('/:id', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const findCart = user.carts.find((cart) => cart._id.valueOf() === request.params.id);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (findCart) {
    try {
      const cart = await Cart.findById(request.params.id);

      let getItemsByIds = [];
      for (let i = 0; i < cart.items.length; i++) {
        let findItem = await Item.findById(cart.items[i].valueOf());
        getItemsByIds.push(findItem);
      }
      if (cart) {
        response.json(getItemsByIds);
      } else {
        response.status(404).end();
      }
    } catch (exception) {
      next(exception);
    }
  } else {
    return response.status(401).json({ error: 'unauthorized' });
  }
});

module.exports = cartRouter;
