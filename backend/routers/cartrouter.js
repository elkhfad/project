const User = require('../models/user');
const Item = require('../models/item');
const Cart = require('../models/cart');
const cartRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const getToken = require('../utils/token');

cartRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const findItem = await Item.find();
  const cartPrice = findItem.filter((item) => {
    return item._id.valueOf() === body.buyItem;
  });
  const cart = new Cart({
    buyItems: {
      buyItem: body.buyItem,
      amount: body.amount,
      price: cartPrice[0].price,
    },
    user: user._id,
    time: new Date(),
    wish: true,
  });

  try {
    const savedCart = await cart.save();
    user.carts = user.carts.concat(savedCart._id);
    await user.save();
    response.json(savedCart);
  } catch (exception) {
    next(exception);
  }
});
cartRouter.get('/', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  try {
    const carts = await Cart.find();
    const cartsByUser = carts.filter((userByCart) => {
      return userByCart.user.valueOf() === user._id.valueOf();
    });
    const cartWish = cartsByUser.filter((cart) => {
      return cart.wish === true;
    });

    if (cartWish) {
      response.json(cartWish);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});
cartRouter.get('/all', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  try {
    const carts = await Cart.find();
    const cartsByUser = carts.filter((userByCart) => {
      return userByCart.user.valueOf() === user._id.valueOf();
    });

    if (cartsByUser) {
      response.json(cartsByUser);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});
cartRouter.get('/:id', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const findCart = user.carts.find((cart) => cart._id.valueOf() === request.params.id);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (findCart) {
    try {
      const cart = await Cart.findById(request.params.id);
      let getItemsByIds = [];
      for (let i = 0; i < cart.buyItems?.length; i++) {
        let findItem = await Item.findById(cart.buyItems[i].buyItem);
        getItemsByIds.push(findItem);
      }
      if (cart) {
        response.json(getItemsByIds);
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
cartRouter.put('/buy/:id', async (request, response, next) => {
  const body = request.body;
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const findCart = user.carts.find((cart) => cart._id.valueOf() === request.params.id);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (findCart) {
    try {
      const buyCart = await Cart.findByIdAndUpdate(request.params.id, body);

      if (buyCart) {
        response.json(buyCart);
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

cartRouter.post('/wishlist', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const body = request.body;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const carts = await Cart.find();
  const cartsByUser = carts.filter((userByCart) => {
    return userByCart.user.valueOf() === user._id.valueOf();
  });
  if (cartsByUser) {
    try {
      const findWishList = cartsByUser.filter((cart) => {
        return cart.wish === true;
      });
      const cartPersist = await Cart.findById(findWishList[0]?._id.valueOf());
      const findItem = await Item.find();
      const cartPrice = findItem.filter((item) => {
        return item._id.valueOf() === body.buyItems.buyItem;
      });
      const cart = {
        buyItem: body.buyItems.buyItem,
        amount: body.buyItems.amount,
        price: cartPrice[0].price,
      };
      cartPersist.buyItems = findWishList[0].buyItems.concat(cart);
      await cartPersist.save();

      if (cartPersist) {
        response.json(cartPersist);
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

cartRouter.delete('/:id', async (request, response, next) => {
  const token = getToken.getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const findCart = user.carts.find((cart) => cart._id.valueOf() === request.params.id);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  } else if (findCart) {
    try {
      user.carts = user.carts.filter((cart) => {
        return cart._id.valueOf() !== request.params.id;
      });
      await user.save();
      await Cart.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (exception) {
      next(exception);
    }
  }
});

module.exports = cartRouter;
