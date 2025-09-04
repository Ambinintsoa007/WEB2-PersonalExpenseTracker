import React from 'react';
import "./ExpensesChart.css";
import { useState, useEffect } from 'react';
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
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ExpensesChart = () => {
        useEffect(() => {
            const handleResize = () => {
                window.dispatchEvent(new Event('resize'));
            };

                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
        }, []);

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
          "November", "December"],
      datasets: [
        {
          label: "Expenses",
          data: [65, 59, 80, 81, 56, 55, 40, 90,100,10,30,70],
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(201, 203, 207, 0.5)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(100, 100, 100)",
            "rgb(100, 100, 100)",
            "rgb(100, 100, 100)",
            "rgb(100, 100, 100)",
            "rgb(100, 100, 100)",
            "rgb(100, 100, 100)",
          ],
          borderWidth: 1,
        },
        {
          label: "Salary",
          data: [100, 120, 110, 130, 90, 95, 85, 10, 20, 50, 500, 100],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgb(54, 162, 235)",
          borderWidth: 1,
        },
      ],
    };

    const options = {
      responsive: true,
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

export default ExpensesChart;