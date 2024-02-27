import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    bookname: '',
    author: '',
    subject: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting book data:', bookData);

    try {
      // Assuming you have a backend endpoint for adding books
      await axios.post('http://localhost:5000/books/add', bookData, { withCredentials: true });
      // You may want to redirect to the book list page or perform other actions after adding a book
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="bookname" value={bookData.bookname} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" name="author" value={bookData.author} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Subject:
          <input type="text" name="subject" value={bookData.subject} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
