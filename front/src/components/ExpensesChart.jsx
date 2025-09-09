import React from 'react';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import './ExpensesChart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ExpensesChart = () => {
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
          "November", "December"],
      datasets: [
        {
          label: "Expenses",
          data: [65, 59, 80, 81, 56, 55, 40, 90,100,10,30,70],
          backgroundColor: [
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
          ],
          borderColor: [
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
            "rgba(51,251,7,0.5)",
          ],
          borderWidth: 1,
        },
        {
          label: "Salary",
          data: [100, 120, 110, 130, 90, 95, 85, 10, 20, 50, 500, 100],
          backgroundColor: "rgba(2,29,188,0.94)",
          borderColor: "rgba(2,29,188,0.94)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
        maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Expenses Tracker - Monthly Report",
        },
      },
    };



     return (
        <>
        <div className="bar-chart-container">
            <Bar data={data} options={options} />
        </div>
        </>
      );
}