// Navbar.jsx
import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasResults, setHasResults] = useState(
    localStorage.getItem("animalQuizResults") !== null
  );
  const logo = "/images/chinchilla_vanilla.png"; 
  const toggleMenu = () => setIsOpen(!isOpen);
  useEffect(() => {
    const updateResults = () => {
      setHasResults(
        localStorage.getItem("animalQuizResults") !== null
      );
    };

    window.addEventListener("quizCompleted", updateResults);

    return () => {
      window.removeEventListener("quizCompleted", updateResults);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">
          <img src={logo} alt="Go to Home page" className="logo-img"/>
          <span>Animal Ally </span>
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon (☰) */}
      </div>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li>
          <Link 
            to={hasResults ? "/results" : "/quiz"} 
            onClick={() => setIsOpen(false)}
          >
            {hasResults ? "My Results" : "Take the Quiz"}
          </Link>
        </li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link to="/animals" onClick={() => setIsOpen(false)}>Our Animals</Link></li>
        <li><Link to="/mission" onClick={() => setIsOpen(false)}>Our Mission</Link></li>
      </ul>
    </nav>
  );
}

export { ScrollToTop };
export default Navbar;
