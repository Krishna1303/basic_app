const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

const jwtSecret = "1303";

// Signup
router.post('/signup', async (req, res) => {
  console.log('Received signup request:', req.body);

  const { username, password, firstname, lastname, phoneno } = req.body;
  const userCheck = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  if (userCheck.rows.length) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password, firstname, lastname, phoneno) VALUES ($1, $2, $3, $4, $5)', [username, hashedPassword, firstname, lastname, phoneno]);
  res.status(201).json({ message: 'User created' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);

  if (!user.rows.length) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.rows[0].id }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Protected Route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});

router.post('/getData', verifyToken, async (req, res) => {
  const { username } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  if (!user.rows.length) return res.status(400).json({ error: 'Invalid credentials' });

  res.json({ data: user.rows[0] });
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Authorization header:', token);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = router;
