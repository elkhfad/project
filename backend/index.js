const express = require('express');
const app = express();
const cors = require('cors');
const Item = require('./models/item');
app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('ready');
