"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";

const DataContext = createContext(undefined);

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used with a DataContext");
    }
    return context;
};

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState(["Food","Transport","Entertainment","Utilities","Healthcare"]);
    const [receipts, setReceipts] = useState([]);
    const [profile, setProfile] = useState({
        username: "loading...",
        email: "Loading...",
        createdAt: new Date().toISOString().split("T")[0],
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
        if (user) {
            setProfile({
                username: user.name || user.email?.split("@")[0] || "User",
                email: user.email || "",
                createdAt: user.createdAt
                    ? new Date(user.createdAt).toISOString().split("T")[0]
                    : new Date().toISOString().split("T")[0],
            });
        }
    }, [user]);

    useEffect(() => {
        if (user && token) {
            fetch("http://localhost:8080/api/expenses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setExpenses(data))
                .catch((err) => console.error("Erreur chargement dépenses", err));
        }
    }, [user, token]);

    const addExpense = async (expense) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();


            formData.append("category_id", expense.category_id || "");
            formData.append("amount", expense.amount);
            formData.append("description", expense.description || "");
            formData.append(
                "date",
                expense.date || new Date().toISOString().split("T")[0]
            );
            formData.append("is_recurring", expense.is_recurring || false);
            formData.append("start_date", expense.start_date || "");
            formData.append("end_date", expense.end_date || "");

            if (expense.receiptFile) {
                formData.append("receipt", expense.receiptFile);
            }

            const response = await fetch("http://localhost:8080/api/expenses", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to add expense");
            }

            const newExp = await response.json();
            setExpenses((prev) => [...prev, newExp]);
        } catch (error) {
            console.error("Add expense error:", error);
        }
    };



    const updateExpense = async (id, expense) => {
        try {
            const formData = new FormData();
            formData.append("amount", expense.amount);
            formData.append("description", expense.description);
            formData.append("category_id", expense.category);
            if (expense.receipt) {
                formData.append("receipt", expense.receipt);
            }

            const res = await fetch(`http://localhost:8080/api/expenses/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const updated = await res.json();
            setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
        } catch (err) {
            console.error("Erreur modification dépense", err);
        }
    };


    const deleteExpense = async (id) => {
        try {
            await fetch(`http://localhost:8080/api/expenses/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            console.error("Erreur suppression dépense", err);
        }
    };


    const addIncome = async (income) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8080/api/incomes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(income),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Impossible d'ajouter le revenu");
            }

            const newIncome = await response.json();
            setIncomes((prev) => [...prev, newIncome]);
        } catch (error) {
            console.error("Add income error:", error);
        }
    };

    useEffect(() => {
        if (user && token) {
            fetch("http://localhost:8080/api/incomes", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => setIncomes(data))
                .catch((err) => console.error("Erreur chargement revenus", err));
        }
    }, [user, token]);


    const updateIncome = (id, updatedIncome) => {
        setIncomes((prev) =>
            prev.map((income) =>
                income.id === id ? { ...income, ...updatedIncome } : income
            )
        );
    };

    const deleteIncome = (id) => {
        setIncomes((prev) => prev.filter((income) => income.id !== id));
    };

    const addCategory = (category) => {
        setCategories((prev) => [...prev, category]);
    };

    const deleteCategory = (category) => {
        setCategories((prev) => prev.filter((cat) => cat !== category));
    };

    const updateProfile = (updates) => {
        setProfile((prev) => ({ ...prev, ...updates }));
    };

    const getTotalIncome = () => {
        return incomes.reduce(
            (total, income) => total + Number.parseFloat(income.amount || "0"),
            0
        );
    };

    const getTotalExpenses = () => {
        return expenses.reduce(
            (total, expense) => total + Number.parseFloat(expense.amount || "0"),
            0
        );
    };

    const getRemainingBalance = () => {
        return getTotalIncome() - getTotalExpenses();
    };

    const value = {
        expenses,
        incomes,
        categories,
        receipts,
        profile,
        addExpense,
        addIncome,
        addCategory,
        deleteCategory,
        updateExpense,
        deleteExpense,
        updateIncome,
        deleteIncome,
        updateProfile,
        getTotalIncome,
        getTotalExpenses,
        getRemainingBalance,
        setExpenses,
        setIncomes,
        setReceipts,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
