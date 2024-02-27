import React, { useState } from 'react';
import axios from 'axios';

const AddBookForm = ({ onAddBook }) => {
  const [bookDetails, setBookDetails] = useState({ bookname: '', author: '', subject: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:5000/books/add', bookDetails, { withCredentials: true });
      onAddBook(response.data);
      setBookDetails({ bookname: '', author: '', subject: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-book-form">
      <input
        type="text"
        name="bookname"
        placeholder="Book Name"
        value={bookDetails.bookname}
        onChange={handleInputChange}
      />
      <input type="text" name="author" placeholder="Author" value={bookDetails.author} onChange={handleInputChange} />
      <input type="text" name="subject" placeholder="Subject" value={bookDetails.subject} onChange={handleInputChange} />
      <button onClick={handleAddBook}>Add Book</button>
    </div>
  );
};

export default AddBookForm;
