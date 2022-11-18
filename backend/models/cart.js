const logger = require('../utils/logger');

logger.info('mongo starting');
require('dotenv').config();
const config = require('../utils/config');

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],

  amount: {
    type: Number,
  },
  time: {
    type: String,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
