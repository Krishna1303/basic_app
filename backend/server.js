const express = require('express');
const app = express();
const port = "3008";

const authRoutes = require('./routes/auth');

const cors = require('cors');;
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
