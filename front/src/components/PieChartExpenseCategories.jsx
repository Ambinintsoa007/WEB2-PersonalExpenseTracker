import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./PieChartExpenseCategories.css";

export function PieChartExpenseCategories() {
    const [depenses, setDepenses] = useState([]);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    useEffect(() => {
        fetch("/depenses.json")
            .then((res) => res.json())
            .then((data) => setDepenses(data))
            .catch((err) => console.error("Erreur fetch:", err));
    }, []);

    const data = Object.values(
        depenses.reduce((acc, d) => {
            acc[d.categorie] = acc[d.categorie] || { name: d.categorie, value: 0 };
            acc[d.categorie].value += d.montant;
            return acc;
        }, {})
    );

    const total = data.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="chart-container">
            <h1 className="chart-title">📊 Dépenses par Catégorie</h1>
            <PieChart width={600} height={500}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    labelLine={true} // ligne vers l'extérieur
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}

                </Pie>
                <Tooltip />
                <Legend
                    formatter={(value) => {
                        const item = data.find((d) => d.name === value);
                        if (!item) return value;
                        const percent = ((item.value / total) * 100).toFixed(0);
                        return `${value} ${percent}%`;
                    }}
                />
            </PieChart>
        </div>
    );
}