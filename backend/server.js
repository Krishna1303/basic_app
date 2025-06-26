
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // ✅ React app URL
credentials: true,
}));


app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
