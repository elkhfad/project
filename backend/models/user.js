const mongoose = require('mongoose');

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
  pic: String,
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
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
