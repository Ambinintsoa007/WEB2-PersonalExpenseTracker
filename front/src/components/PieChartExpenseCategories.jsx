import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './PieChartExpenseCategories.css';

export function PieChartExpenseCategories() {
    const [depenses, setDepenses] = useState([]);
    const [error, setError] = useState(null);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560", "#00BFFF", "#FF66B2", "#33CC33", "#FF9933"];
    const categoriesMap = { 1: "Food", 2: "Transport", 3: "Entertainment", 4: "Divertissement", 5: "Santé" };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Utilisateur non connecté");
            setDepenses([]);
            return;
        }
        fetch("http://localhost:8080/api/expenses", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setDepenses(data), setError(null);
                else if (data.error) setError(data.error), setDepenses([]);
                else setError("Erreur inconnue lors de la récupération des dépenses."), setDepenses([]);
            })
            .catch(() => setError("Erreur réseau ou serveur."), setDepenses([]));
    }, []);

    const data = Object.values(depenses.reduce((acc, d) => {
        const name = categoriesMap[d.category_id] || "Autre";
        acc[name] = acc[name] || { name, value: 0 };
        acc[name].value += Number(d.amount);
        return acc;
    }, {}));
    const total = data.reduce((sum, d) => sum + d.value, 0);

    if (error) return <p className="error-message">Erreur : {error}</p>;
    if (data.length === 0) return <p>Aucune dépense à afficher.</p>;

    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const RAD = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * RAD);
        const y = cy + radius * Math.sin(-midAngle * RAD);
        return (
            <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
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
                            nameKey="name"
                            labelLine={false}
                            label={renderLabel}
                        >
                            {data.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "#fff", border: "none", color: "#000" }} />
                        <Legend
                            wrapperStyle={{ color: "#f5f5f5", fontSize: 13 }}
                            formatter={value => {
                                const item = data.find(d => d.name === value);
                                return item ? `${value} ${(item.value / total * 100).toFixed(0)}%` : value;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
