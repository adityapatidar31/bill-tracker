import { useEffect, useRef, useMemo } from "react";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { bills } = useSelector((store) => store.bill);

  const chartRef = useRef(null);

  // Memoize the aggregated data to avoid unnecessary re-renders
  const categoryTotals = useMemo(() => {
    return bills.reduce((totals, bill) => {
      const { category, amount } = bill;
      if (!totals[category]) totals[category] = 0;
      totals[category] += amount;
      return totals;
    }, {});
  }, [bills]);

  useEffect(() => {
    // Prepare data for the chart
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create the pie chart
    const ctx = document.getElementById("pieChart").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#C9CBCF",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [categoryTotals]); // Depend only on the memoized category totals

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;
