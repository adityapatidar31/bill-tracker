import { useEffect, useRef, useMemo, useState } from "react";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

const PieChart = () => {
  const { bills } = useSelector((state) => state.bill);

  const chartRef = useRef(null);

  // Get current theme from the document
  const getTheme = () =>
    document.documentElement.getAttribute("data-theme") || "light";

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
            labels: {
              color: theme === "dark" ? "#f9f9f9" : "#333", // Dynamic legend text color
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [categoryTotals, theme]); // Depend on memoized categoryTotals and theme

  return (
    <div
      style={{
        width: "50%",
        padding: "1rem",
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2>Expense Distribution by Category</h2>
      <canvas id="pieChart"></canvas>
    </div>
  );
};

export default PieChart;
