const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const itemRouter = require('./routers/itemrouter');
const cartRouter = require('./routers/cartrouter');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const usersRouter = require('./routers/userrouter');


logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect("mongodb://127.0.0.1:27017/leebstore",
  {
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("failed to connect to mongoDB");
      console.error(err);
    } else {
      console.log("mongodb is running and secured");
      app.listen(3001);
    }
  })
 
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/api/items', itemRouter);
app.use('/api/users', usersRouter);
app.use('/api/singIn', loginRouter);
app.use('/api/carts', cartRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(express.static('build'));
logger.info('ready');

