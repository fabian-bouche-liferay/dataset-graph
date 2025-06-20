import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`;

const MultiPieChart = ({ aggregated, colors = []  }) => {
  if (!aggregated || Object.keys(aggregated).length === 0) return null;

  return (
    <div className="multi-pie-chart" style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      {Object.entries(aggregated).map(([mainGroup, subGroups]) => {
        const labels = Object.keys(subGroups);
        const data = Object.values(subGroups);

        const backgroundColors = labels.map((_, i) => colors[i % colors.length]);

        const chartData = {
          labels,
          datasets: [
            {
              label: mainGroup,
              data,
              backgroundColor: backgroundColors,
            },
          ],
        };

        return (
          <div key={mainGroup} style={{ width: 300 }}>
            <h5 style={{ textAlign: "center" }}>{mainGroup}</h5>
            <Pie data={chartData} options={{ responsive: true }} />
          </div>
        );
      })}
    </div>
  );
};

export default MultiPieChart;
