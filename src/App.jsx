import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import BillList from "./components/BillList";
import Form from "./components/Form";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";
import PayBills from "./components/PayBills";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <header className="theme-icon">
        <button onClick={toggleTheme} className="theme-button">
          {theme === "light" ? (
            <FaMoon className="icon" />
          ) : (
            <FaSun className="icon" />
          )}
        </button>
      </header>
      <Form />
      <PayBills />
      <BillList />
      <Graph />
      <PieChart />
    </div>
  );
}

export default App;
