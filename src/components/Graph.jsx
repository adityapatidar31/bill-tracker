import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useSelector } from "react-redux";

function Graph() {
  let { bills } = useSelector((store) => store.bill);

  console.log(bills);

  bills = [...bills].sort((a, b) => {
    const dateA = new Date(a.date.split("-").reverse().join("-"));
    const dateB = new Date(b.date.split("-").reverse().join("-"));
    return dateA - dateB;
  });

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const groupedBills = bills.reduce((acc, bill) => {
      const day = bill.date;
      acc[day] = (acc[day] || 0) + parseFloat(bill.amount);
      return acc;
    }, []);

    const labels = Object.keys(groupedBills);
    const data = labels.map((date) => groupedBills[date]);

    setChartData({
      labels,
      datasets: [
        {
          label: "Daily Billing Cycle",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    });
  }, [bills]); // Update chartData whenever bills change

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 12,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        padding: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
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
