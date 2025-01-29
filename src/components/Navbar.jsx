/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar({ toggleTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Bill Tracker</div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#">Graph</a>
        <a href="#">PieChart</a>
        <header className="theme-icon">
          <button onClick={toggleTheme} className="theme-button">
            {theme === "light" ? (
              <FaMoon className="icon" />
            ) : (
              <FaSun className="icon" />
            )}
          </button>
        </header>
      </div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
