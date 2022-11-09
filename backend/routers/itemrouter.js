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
itemsRouter.get('/api/items', (request, response) => {
  const user = request.user;
  Item.find().then((items) => {
    response.json(items);
  });
});
itemsRouter.get('/api/items/:id', (request, response) => {
  Item.findById(request.params.id).then((item) => {
    response.json(item);
  });
});
itemsRouter.delete('/api/items/:id', (request, response) => {
  Item.findByIdAndDelete(request.params.id).then((item) => {
    response.json('');
  });
});
itemsRouter.put('/api/items/:id', (request, response) => {
  Item.findByIdAndUpdate(request.params.id, request.body).then((item) => {
    response.json(item);
  });
});

itemsRouter.post('/api/items', async (request, response) => {
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

  const savedItem = await item.save();
  user.items = user.items.concat(savedItem._id);
  await user.save();

  response.json(savedItem);
});
module.exports = itemsRouter;
