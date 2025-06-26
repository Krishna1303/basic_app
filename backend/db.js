const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('PostgreSQL connection error:', err);
    process.exit(1);
  });

module.exports = pool;