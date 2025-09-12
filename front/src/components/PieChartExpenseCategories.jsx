import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './PieChartExpenseCategories.css';

export function PieChartExpenseCategories() {
    const [depenses, setDepenses] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMessage("Utilisateur non connecté");
            setDepenses([]);
            return;
        }

        fetch("http://localhost:8080/api/expenses", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setDepenses(data);
                    setErrorMessage(null);
                } else if (data.error) {
                    setErrorMessage(data.error);
                    setDepenses([]);
                } else {
                    setErrorMessage("Erreur inconnue lors de la récupération des dépenses.");
                    setDepenses([]);
                }
            })
            .catch(() => {
                setErrorMessage("Erreur réseau ou serveur.");
                setDepenses([]);
            });
    }, []);

    if (errorMessage) return <p className="error-message">Erreur : {errorMessage}</p>;

    const data = Object.values(
        depenses.reduce((acc, d) => {
            acc[d.categorie] = acc[d.categorie] || { name: d.categorie, value: 0 };
            acc[d.categorie].value += parseFloat(d.amount);
            return acc;
        }, {})
    );

    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (data.length === 0) return <p>Aucune dépense à afficher.</p>;

    const renderInnerLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="chart-container">
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            outerRadius="70%"
                            dataKey="value"
                            labelLine={false}
                            label={renderInnerLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#fff", border: "none", color: "#000" }}
                        />
                        <Legend
                            wrapperStyle={{ color: "#f5f5f5", fontSize: "13px" }}
                            formatter={(value) => {
                                const item = data.find((d) => d.name === value);
                                if (!item) return value;
                                const percent = ((item.value / total) * 100).toFixed(0);
                                return `${value} ${percent}%`;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
