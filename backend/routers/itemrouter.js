const User = require('../models/user');
const Item = require('../models/item');
const itemsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getToken = require('../utils/token');

itemsRouter.get('/', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  try {
    const items = await Item.find();
    const itemsByUser = items.filter((userByItem) => {
      return userByItem.user.valueOf() === user._id.valueOf();
    });
    if (itemsByUser) {
      response.json(itemsByUser);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

itemsRouter.get('/all', (request, response) => {
  Item.find().then((items) => {
    response.json(items);
  });
  itemsRouter.get('/:id', async (request, response, next) => {
    const token = getToken.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const findItem = user.items.find((item) => item._id.valueOf() === request.params.id);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    } else if (findItem) {
      try {
        user.items = user.items.filter((item) => {
          return item._id.valueOf() !== request.params.id;
        });
        const item = await Item.findById(request.params.id);
        if (item) {
          response.json(item);
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

  itemsRouter.delete('/:id', async (request, response, next) => {
    const token = getToken.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const findItem = user.items.find((item) => item._id.valueOf() === request.params.id);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    } else if (findItem) {
      try {
        user.items = user.items.filter((item) => {
          return item._id.valueOf() !== request.params.id;
        });
        if (item) {
          await user.save();
          await Item.findByIdAndDelete(request.params.id);
          response.status(204).end();
        }
      } catch (exception) {
        next(exception);
      }
    } else {
      return response.status(401).json({ error: 'unauthorized' });
    }
  });

  itemsRouter.put('/:id', async (request, response, next) => {
    const token = getToken.getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);
    const findItem = user.items.find((item) => item._id.valueOf() === request.params.id);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    } else if (findItem) {
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
    } else {
      return response.status(401).json({ error: 'unauthorized' });
    }
  });

  itemsRouter.post('/', async (request, response) => {
    const body = request.body;
    const token = getToken.getTokenFrom(request);
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
});
module.exports = itemsRouter;
