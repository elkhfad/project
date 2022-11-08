const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const itemRouter = require('./routers/itemrouter');
const loginRouter = require('./controllers/login');

app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(itemRouter);
const usersRouter = require('./routers/userrouter');
app.use(usersRouter);
app.use(loginRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

console.log('ready');
