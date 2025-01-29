/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { SiManageiq } from "react-icons/si";
function Navbar({ toggleTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="website-logo">
          <SiManageiq />
        </span>
        Bill Tracker
      </div>
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <a href="#graph">Graph</a>
        <a href="#pieChart">PieChart</a>
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
