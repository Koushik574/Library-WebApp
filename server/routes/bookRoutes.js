const express = require('express');
const router = express.Router();
const { getAllBooks, searchBooks, addBook } = require('../models/Book');

router.get('/', async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;

  try {
    const books = await getAllBooks(page, pageSize);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const result = await searchBooks(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// bookRoutes.js
router.post('/add', async (req, res) => {
  const bookDetails = req.body;

  if (!bookDetails || !bookDetails.bookname || !bookDetails.author || !bookDetails.subject) {
    return res.status(400).json({ message: 'Invalid book details' });
  }

  try {
    const newBook = await addBook(bookDetails);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
