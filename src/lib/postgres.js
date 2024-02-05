const { Pool } = require("pg");
const { connection } = require("../config");

// const pool = new Pool({
//   connectionString: connection.connectionStringEL,
// });

const credentials = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Sellcenter2024',
  database: 'postres'
};

const pool = new Pool(credentials);

const fetch = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params.length ? params : null);
    return row;
  } finally {
    client.release();
  }
};

const fetchALL = async (SQL, ...params) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(SQL, params.length ? params : null);
    return rows;
  } finally {
    client.release();
  }
};

module.exports = {
  fetch,
  fetchALL,
};