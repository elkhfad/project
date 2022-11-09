const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const itemRouter = require('./routers/itemrouter');
const loginRouter = require('./controllers/login');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const usersRouter = require('./routers/userrouter');

logger.info('connecting to', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message);
  });
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use('/api/items', itemRouter);
app.use('/api/users', usersRouter);
app.use('/api/singIn', loginRouter);
app.use(middleware.requestLogger);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
app.use(express.static('build'));
app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

logger.info('ready');
