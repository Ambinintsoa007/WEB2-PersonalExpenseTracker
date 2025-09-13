import React from 'react';
import { useState, useEffect } from "react";
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
import './ExpenseChart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const ExpensesChart = () => {
    const [chartData, setChartData] = useState({
        labels: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        datasets: [
            {
                label: 'Dépenses',
                data: [],
                backgroundColor: 'rgba(51, 251, 7, 0.5)',
                borderColor: 'rgba(51, 251, 7, 0.5)',
                borderWidth: 1,
            },
            {
                label: 'Salaire',
                data: [],
                backgroundColor: 'rgba(2, 29, 188, 0.94)',
                borderColor: 'rgba(2, 29, 188, 0.94)',
                borderWidth: 1,
            },
        ],
    });

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Utilisateur non authentifié. Veuillez vous connecter.');
                }

                const response = await fetch(`http://localhost:8080/api/summary/monthly`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }

                const data = await response.json();
                console.log("Données API:", data);

                const expenses = data.map(item => parseFloat(item.total_expenses));
                const salary = data.map(item => parseFloat(item.total_incomes));

                setChartData((prevData) => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: expenses,
                        },
                        {
                            ...prevData.datasets[1],
                            data: salary,
                        },
                    ],
                }));
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);



    return (
        <>
            <div className="chart-container bar-chart-container">
                <Bar data={chartData} options={options} />
            </div>
        </>
    );
}