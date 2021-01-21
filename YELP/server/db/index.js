const { Pool } = require('pg');

// connection parameters are defined in .env file
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
}