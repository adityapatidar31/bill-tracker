import { useEffect, useState } from "react";
import BillList from "./components/BillList";
import Form from "./components/Form";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";
import PayBills from "./components/PayBills";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Toggle the theme
  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="app">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        draggable
        rtl={false}
        theme={theme}
      />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Form />
      <PayBills />
      <BillList />
      <Graph />
      <PieChart />
    </div>
  );
}

export default App;
