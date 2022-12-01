require('dotenv').config();

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  buyItems: [
    {
      buyItem: String,
      amount: Number,
      price: Number,
    },
  ],

  time: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  wish: {
    type: Boolean,
  },
});

cartSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Cart', cartSchema);
