const pool = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const findUser = async (username) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser, findUser };
