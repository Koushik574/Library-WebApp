import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
    console.log("Received books:", books);
  
    return (
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.book_id} book={book} />
        ))}
      </div>
    );
  };
  

export default BookList;
