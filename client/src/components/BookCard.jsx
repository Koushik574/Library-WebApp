// frontend/src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
  const cardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '10px',
  };

  const textStyle = {
    fontSize: '1rem',
    marginBottom: '5px',
  };

  return (
    <div className="book-card" style={cardStyle}>
      <h3 style={titleStyle}>Title: {book.bookname}</h3>
      <p style={textStyle}>Author: {book.author}</p>
      <p style={textStyle}>Subject: {book.subject}</p>
    </div>
  );
};

export default BookCard;
