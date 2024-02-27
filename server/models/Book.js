// models/Book.js
const pool = require('../config/db');

// Book.js
const getAllBooks = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;

  try {
    const result = await pool.query(
      'SELECT * FROM books ORDER BY book_id OFFSET $1 LIMIT $2',
      [offset, pageSize]
    );

    const totalResult = await pool.query('SELECT COUNT(*) FROM books');
    const totalCount = totalResult.rows[0].count;

    return { books: result.rows, totalCount };
  } catch (error) {
    throw error;
  }
};


const searchBooks = async (query) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books WHERE LOWER(bookname) LIKE $1 OR LOWER(author) LIKE $1 OR LOWER(subject) LIKE $1',
      [`%${query.toLowerCase()}%`]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Book.js
const addBook = async (bookDetails) => {
  const { bookname, author, subject } = bookDetails;

  if (!bookname || !author || !subject) {
    throw new Error('Invalid book details');
  }

  try {
    const result = await pool.query(
      'INSERT INTO books (bookname, author, subject) VALUES ($1, $2, $3) RETURNING *',
      [bookname, author, subject]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


module.exports = { getAllBooks, searchBooks, addBook };
