const { Router } = require('express');
const Item = require('../models/item');

const app = Router();
app.get('/api/items', (req, res) => {
  Item.find().then((items) => {
    res.json(items);
  });
});
app.get('/api/items/:id', (request, response) => {
  Item.findById(request.params.id).then((item) => {
    response.json(item);
  });
});
app.delete('/api/items/:id', (request, response) => {
  Item.findByIdAndDelete(request.params.id).then((item) => {
    response.json('');
  });
});
app.put('/api/items/:id', (request, response) => {
  Item.findByIdAndUpdate(request.params.id, request.body).then((item) => {
    response.json(item);
  });
});

app.post('/api/items', (request, response) => {
  const body = request.body;

  if (!body.title === undefined) {
    return response.status(400).json({
      error: 'title missing',
    });
  }

  const item = new Item({
    title: body.title,
    comment: body.comment,
    price: body.price,
    amount: body.amount,
    pic: body.pic,
  });

  item.save().then((savedItem) => {
    response.json(savedItem);
  });
});
module.exports = app;
