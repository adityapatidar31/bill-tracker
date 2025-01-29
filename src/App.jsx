import { useEffect, useState } from "react";
import BillList from "./components/BillList";
import Form from "./components/Form";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";

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
      <header>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Theme
        </button>
      </header>
      <Form />
      <BillList />
      <Graph />
      <PieChart />
    </div>
  );
}

export default App;
