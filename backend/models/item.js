require('dotenv').config();

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  pic: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Item', itemSchema);
