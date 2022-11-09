const User = require('../models/user');
const Item = require('../models/item');
const itemsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};
itemsRouter.get('/', async (request, response, next) => {
  try {
    const items = await Item.find();
    if (items) {
      response.json(items);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

itemsRouter.get('/:id', async (request, response, next) => {
  try {
    const item = await Item.findById(request.params.id);
    if (item) {
      response.json(item);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});
itemsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Item.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});
itemsRouter.put('/:id', async (request, response, next) => {
  try {
    const item = await Item.findByIdAndUpdate(request.params.id, request.body);
    if (item) {
      response.json(item);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

itemsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const item = new Item({
    title: body.title,
    comment: body.comment,
    price: body.price,
    amount: body.amount,
    pic: body.pic,
    user: user._id,
  });

  try {
    const savedItem = await item.save();
    user.items = user.items.concat(savedItem._id);
    await user.save();
    response.json(savedItem);
  } catch (exception) {
    next(exception);
  }
});
module.exports = itemsRouter;
