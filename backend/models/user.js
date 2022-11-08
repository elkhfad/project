const mongoose = require('mongoose');

const config = require('../utils/config');

console.log('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    require: true,
    minLength: 5,
  },
  email: {
    type: String,
    require: true,
    minLength: 5,
  },
  city: {
    type: String,
    require: true,
    minLength: 4,
  },
  street: {
    type: String,
    require: true,
    minLength: 4,
  },
  postalCode: {
    type: String,
    require: true,
    minLength: 4,
  },
  passwordHash: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
