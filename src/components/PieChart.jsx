import { useEffect, useRef, useMemo, useState } from "react";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";

function PieChart() {
  const { bills } = useSelector((state) => state.bill);
  const chartRef = useRef(null);

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

  const categoryTotals = useMemo(() => {
    return bills.reduce((totals, bill) => {
      const { category, amount } = bill;
      if (!totals[category]) totals[category] = 0;
      totals[category] += amount;
      return totals;
    }, {});
  }, [bills]);

  useEffect(() => {
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

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
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: theme === "dark" ? "#f9f9f9" : "#333",
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [categoryTotals, theme]);

  return (
    <div className="chart-container">
      <h2>Expense Distribution by Category</h2>
      <div className="chart-wrapper">
        <canvas id="pieChart"></canvas>
      </div>
    </div>
  );
}

export default PieChart;
