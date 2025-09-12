"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "./components/LoginPage"
import { SignUpPage } from "./components/SignUpPage"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Incomes from "./pages/Incomes"
import Categories from "./pages/Categories"
import Receipts from "./pages/Receipts"
import Profile from "./pages/Profile"
import { DataProvider } from "./context/DataContext"

function AuthenticatedApp() {
    const [currentPage, setCurrentPage] = useState("dashboard")
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("darkMode")
            return saved ? JSON.parse(saved) : false
        }
        return false
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("darkMode", JSON.stringify(darkMode))
            if (darkMode) {
                document.body.classList.add("dark-mode")
            } else {
                document.body.classList.remove("dark-mode")
            }
        }
    }, [darkMode])

    const renderCurrentPage = () => {
        switch (currentPage) {
            case "dashboard":
                return <Dashboard />
            case "expenses":
                return <Expenses />
            case "incomes":
                return <Incomes />
            case "categories":
                return <Categories />
            case "receipts":
                return <Receipts />
            case "profile":
                return <Profile darkMode={darkMode} setDarkMode={setDarkMode} />
            default:
                return <Dashboard />
        }
    }

    return (
        <DataProvider>
            <div className={`app ${darkMode ? "dark" : ""}`}>
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <main className="main-content">{renderCurrentPage()}</main>
            </div>
        </DataProvider>
    )
}

function AuthFlow() {
    const [isSigningUp, setIsSigningUp] = useState(false)
    const { login, signup } = useAuth()

    const handleLogin = async (credentials) => {
        const result = await login(credentials)
        if (!result.success) {
            alert("Login failed: " + (result.error || "Unknown error"))
        }
    }

    const handleSignup = async (userData) => {
        const result = await signup(userData)
        if (!result.success) {
            alert("Signup failed: " + (result.error || "Unknown error"))
        }
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "#23242a",
            }}
        >
            {isSigningUp ? (
                <SignUpPage onSignup={handleSignup} onSwitchToLogin={() => setIsSigningUp(false)} />
            ) : (
                <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setIsSigningUp(true)} />
            )}
        </div>
    )
}

function AppContent() {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                Loading...
            </div>
        )
    }

    return isAuthenticated ? <AuthenticatedApp /> : <AuthFlow />
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    )
}

export default App
