import BillList from "./components/BillList";
import Form from "./components/Form";
import Graph from "./components/Graph";
import PieChart from "./components/PieChart";

function App() {
  return (
    <div className="app">
      <Form />
      <BillList />
      <Graph />
      <PieChart />
    </div>
  );
}

export default App;
