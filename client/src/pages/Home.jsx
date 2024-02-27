// frontend/src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import '../style.css'; 

const Home = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/user', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

// Home.js
useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/books?page=${currentPage}&pageSize=5`, {
        withCredentials: true,
      });

      console.log('Books fetched:', response.data); // Add this console log

      setBooks(response.data.books);
      setTotalPages(Math.ceil(response.data.totalCount / 5));
    } catch (error) {
      console.error(error);
    }
  };

  fetchBooks();
}, [currentPage]);


  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books', { withCredentials: true });
        const totalBooks = response.data.length;
        const calculatedTotalPages = Math.ceil(totalBooks / 5);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalPages();
  }, [books]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/books/search?query=${query}`, { withCredentials: true });
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Welcome, {user ? user : 'Reader'}!</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
