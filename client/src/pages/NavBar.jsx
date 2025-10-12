// Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../data/chinchilla vanilla mates.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt = "logo" className="logo-img" />
        <span>TBD Quiz</span>
        </div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon (☰) */}
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/home" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/quiz" onClick={() => setIsOpen(false)}>Quiz</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About the Quiz</Link></li>
        <li><Link to="/mission" onClick={() => setIsOpen(false)}>Our Mission</Link></li>
        <li><Link to="/animals" onClick={() => setIsOpen(false)}>Our Animals</Link></li>
        <li><Link to="/results" onClick={() => setIsOpen(false)}>Results</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
