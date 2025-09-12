"use client"

import { createContext, useContext, useState, useEffect} from "react";
import {useAuth} from "./AuthContext.jsx";

const DataContext = createContext(undefined)

export const useData = () => {
    const context = useContext(DataContext)
    if(!context) {
        throw new Error('useData must be used with a DataContext')
    }
    return context;
}

export const DataProvider = ({children}) => {
    const { user } = useAuth()
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const [profile, setProfile] = useState({
        username: "loading...",
        email: "Loading...",
        createdAt: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if(user){
            setProfile({
                username: user.name || user.email?.split('@'[0]) || 'User',
                email: user.email || '',
                createdAt: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            })
        }
    }, [user]);


    useEffect(() => {
        if(typeof window !== "undefined" && user) {

            const loadData = () => {
                const userId = user.id

                const savedExpenses = localStorage.getItem(`expenses_${userId}`);
                const savedIncomes = localStorage.getItem(`incomes_${userId}`);
                const savedCategories = localStorage.getItem(`categories_${userId}`);
                const savedReceipts = localStorage.getItem(`receipts_${userId}`);
                const savedProfile = localStorage.getItem(`profile_${userId}`);

                if(savedExpenses) setExpenses(JSON.parse(savedExpenses));
                if(savedIncomes) setIncomes(JSON.parse(savedIncomes));
                if(savedCategories) setCategories(JSON.parse(savedCategories));
                else setCategories(["Food", "Transport", "Entertainment", "Utilities", "Healthcare"])
                if(savedReceipts) setReceipts(JSON.parse(savedReceipts));
                if(savedProfile) setProfile(JSON.parse(savedProfile));
            }

            loadData()
        }
    }, []);


    useEffect(() => {
        if(typeof window !== "undefined" && user?.id) {
            localStorage.setItem(`expenses_${user.id}`, JSON.stringify(expenses));
        }
    }, [expenses, user])

    useEffect(() => {
        if(typeof window !== "undefined" && user?.id) {
            localStorage.setItem(`incomes_${user.id}`, JSON.stringify(incomes));
        }
    }, [incomes, user])

    useEffect(() => {
        if(typeof window !== "undefined" && user?.id) {
            localStorage.setItem(`categories_${user.id}`, JSON.stringify(categories));
        }
    }, [categories, user])

    useEffect(() => {
        if(typeof window !== "undefined" && user?.id) {
            localStorage.setItem(`receipts_${user.id}`, JSON.stringify(receipts));
        }
    }, [receipts, user])

    useEffect(() => {
        if(typeof window !== "undefined" && user?.id) {
            localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile));
        }
    }, [profile, user])



    const addExpense = (expense) => {
        const newExpense = {
            ...expense,
            id: Date.now(),
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