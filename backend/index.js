const express = require('express');
const app = express();
const cors = require('cors');
const item = require('./routers/itemrouter');
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(item);

const PORT = process.env.PORT;
app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('ready');
