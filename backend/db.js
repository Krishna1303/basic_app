const { Pool } = require('pg');

const pool = new Pool({ connectionString: "postgresql://postgres:1303@localhost:5432/postgres" });

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('PostgreSQL connection error:', err);
    process.exit(1);
  });

module.exports = pool;