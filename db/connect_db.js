const { Client, Pool } = require('pg');

const pool = new Pool({
  user: 'mario',
  host: 'localhost',
  database: 'eliminauno',
  password: 'eliminauno',
  port: 5432,
});

module.exports = pool;