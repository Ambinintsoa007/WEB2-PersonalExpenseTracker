"use client"

import { createContext, useContext, useState, useEffect} from "react";

const DataContext = createContext(undefined)

export const useData = () => {
    const context = useContext(DataContext)
    if(!context) {
        throw new Error('useData must be used with a DataContext')
    }
    return context;
}

export const DataProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [profile, setProfile] = useState({
        username: "Dylan",
        email: "xD@example.com",
        createdAt: new Date().toISOString().split('T')[0]
    });

    //load data from localstorage on mount
    useEffect(() => {
        if(typeof window !== "undefined") {
            const loadData = () => {
                const savedExpenses = localStorage.getItem("expenses");
                const savedIncomes = localStorage.getItem("incomes");
                const savedCategories = localStorage.getItem("categories");
                const savedReceipts = localStorage.getItem("receipts");
                const savedProfile = localStorage.getItem("profile");

                if(savedExpenses) setExpenses(JSON.parse(savedExpenses));
                if(savedIncomes) setIncomes(JSON.parse(savedIncomes));
                if(savedCategories) setCategories(JSON.parse(savedCategories));
                else setCategories(["FFood", "Transport", "Entertainment", "Utilities", "Healthcare"])
                if(savedReceipts) setReceipts(JSON.parse(savedReceipts));
                if(savedProfile) setProfile(JSON.parse(savedProfile));
            }

            loadData()
        }
    }, []);

    //save in localStorage chaque fois que le data changes
    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("expenses", JSON.stringify(expenses));
        }
    }, [expenses])

    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("incomes", JSON.stringify(incomes));
        }
    }, [incomes])

    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("categories", JSON.stringify(categories));
        }
    }, [categories])

    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("receipts", JSON.stringify(receipts));
        }
    }, [receipts])

    useEffect(() => {
        if(typeof window !== "undefined") {
            localStorage.setItem("profile", JSON.stringify(profile));
        }
    }, [profile])

    const addExpense = (expense) => {
        const newExpense = {
            ...expense,
            iid: Date.now(),
            date: new Date().toISOString().split('T')[0],
        }
        setExpenses((prev) => [...prev, newExpense])
    }

    const addIncome = (income) => {
        const newIncome = {
            ...income,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
        }
        setIncomes((prev) => [...prev, newIncome] )
    }

    const addCategory = (category) => {
        setCategories((prev) => [...prev, category]);
    }

    const deleteCategory = (category) => {
        setCategories((prev) => prev.filter((cat) => cat !== category));
    }

    const updateExpense = (id, updatedExpense) => {
        setExpenses((prev) => prev.map((expense) => (expense.id === id ? {...expense, ...updatedExpense} : expense)))
    }

    const deleteExpense = (id) => {
        setExpenses((prev) => prev.filter(expense => expense.id !== id))
    }

    const updateIncome = (id, updatedIncome) => {
        setIncomes((prev) => prev.map((income) => (income.id === id ? {...income, ...updatedIncome} : income)))
    }

    const deleteIncome = (id) => {
        setIncomes((prev) => prev.filter((income) => income.id !== id))
    }

    const updateProfile = (updates) => {
        setProfile((prev) => ({...prev, ...updates}))
    }

    const getTotalIncome = () => {
        return incomes.reduce((total, income) => total + Number.parseFloat(income.amount || "0"), 0)
    }

    const getTotalExpenses = () => {
        return expenses.reduce((total, expense) => total + Number.parseFloat(expense.amount || "0"), 0)
    }

    const getRemainingBalance = () => {
        return getTotalIncome() - getTotalExpenses()
    }


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
        setReceipts
    }
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}