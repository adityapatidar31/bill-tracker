import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";

function Graph() {
  const bills = useSelector((state) => state.bill);

  const { filter } = bills;
  const filteredBills = bills.bills.filter(
    (bill) => bill.category === filter || filter === ""
  );

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

  // Memoize sorted bills to avoid unnecessary updates
  const sortedBills = useMemo(() => {
    return [...filteredBills].sort((a, b) => {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return dateA - dateB;
    });
  }, [filteredBills]);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const groupedBills = sortedBills.reduce((acc, bill) => {
      const day = bill.date;
      acc[day] = (acc[day] || 0) + parseFloat(bill.amount);
      return acc;
    }, {});

    const labels = Object.keys(groupedBills);
    const data = labels.map((date) => groupedBills[date]);

    setChartData({
      labels,
      datasets: [
        {
          label: "Daily Billing Cycle",
          data,
          borderColor:
            theme === "dark"
              ? "rgba(30, 144, 255, 1)"
              : "rgba(75, 192, 192, 1)",
          backgroundColor:
            theme === "dark"
              ? "rgba(30, 144, 255, 0.2)"
              : "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    });
  }, [sortedBills, theme]);

  const options = {
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
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#f9f9f9" : "#333",
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#f9f9f9" : "#333",
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        padding: "1rem",
        boxShadow:
          theme === "dark"
            ? "0 4px 8px rgba(0, 0, 0, 0.4)"
            : "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2>Billing Trends Over Time</h2>
      <div
        style={{
          height: "400px",
          minWidth: `${
            chartData.labels.length > 12 ? chartData.labels.length * 50 : 600
          }px`,
        }}
      >
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Graph;
