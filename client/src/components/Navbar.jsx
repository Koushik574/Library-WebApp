// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navbarStyle = {
    background: '#333',
    color: '#fff',
    padding: '1rem',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  };

  const liStyle = {
    marginRight: '1rem',
  };

  const buttonStyle = {
    background: '#fff',
    color: '#333',
    border: 'none',
    padding: '0.5rem',
    cursor: 'pointer',
  };

  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Home
          </Link>
        </li>
        <li style={liStyle}>
          <Link to="/add" style={{ color: '#fff', textDecoration: 'none' }}>
            Add Book
          </Link>
        </li>
        {user ? (
          <li>
            <button style={buttonStyle} onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li style={liStyle}>
              <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                Login
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
