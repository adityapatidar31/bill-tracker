import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";

function Graph() {
  const { bills } = useSelector((store) => store.bill);

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
    return [...bills].sort((a, b) => {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return dateA - dateB;
    });
  }, [bills]);

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
              : "rgba(75, 192, 192, 1)", // Dynamic line color
          backgroundColor:
            theme === "dark"
              ? "rgba(30, 144, 255, 0.2)"
              : "rgba(75, 192, 192, 0.2)", // Dynamic fill color
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    });
  }, [sortedBills, theme]); // Update when sortedBills or theme changes

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme === "dark" ? "#f9f9f9" : "#333", // Dynamic legend text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme === "dark" ? "#f9f9f9" : "#333", // Dynamic x-axis label color
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.1)", // Grid lines color
        },
      },
      y: {
        ticks: {
          color: theme === "dark" ? "#f9f9f9" : "#333", // Dynamic y-axis label color
        },
        grid: {
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.1)", // Grid lines color
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
