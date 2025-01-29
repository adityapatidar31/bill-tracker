import { useEffect, useState } from "react";
import BillList from "./components/BillList";
import Form from "./components/Form";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";
import PayBills from "./components/PayBills";
import Navbar from "./components/Navbar";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <Navbar toggleTheme={toggleTheme} />
      <Form />
      <PayBills />
      <BillList />
      <Graph />
      <PieChart />
    </div>
  );
}

export default App;
