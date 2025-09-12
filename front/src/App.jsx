"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Dashboard from "./pages/Dashboard"
import Expenses from "./pages/Expenses"
import Incomes from "./pages/Incomes"
import Categories from "./pages/Categories"
import Receipts from "./pages/Receipts"
import Profile from "./pages/Profile"
import { DataProvider } from "./context/DataContext"
import {LoginPage} from "./components/LoginPage.jsx";
import {SignUpPage} from "./components/SignUpPage.jsx";

function App() {
    const [currentPage, setCurrentPage] = useState("dashboard")
    const [showLogin,  setShowLogin] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("darkMode")
            return saved ? JSON.parse(saved) : false
        }
        return false
    })

    useEffect(() => {
        if(typeof window !== "undefined") {
            const token = localStorage.getItem("authToken")
            if(token) {
                //code mvérifier anle token back
                setIsAuthenticated(true)
            }
        }
    })

    /**
     * // Fonction de connexion
     *     const handleLogin = (userData) => {
     *         // Ici vous traiterez la réponse de votre backend
     *         setIsAuthenticated(true)
     *         // Sauvegarder le token d'authentification
     *         if (typeof window !== "undefined") {
     *             localStorage.setItem("authToken", userData.token) // à adapter selon votre backend
     *         }
     *     }
     *
     *     // Fonction de déconnexion
     *     const handleLogout = () => {
     *         setIsAuthenticated(false)
     *         if (typeof window !== "undefined") {
     *             localStorage.removeItem("authToken")
     *         }
     *         setCurrentPage("dashboard") // Reset à la page d'accueil
     *     }
     * */
    const handleLogin = () => {
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        if(typeof window !== "undefined") {
            localStorage.removeItem("authToken")
        }
    }

    const toggleAuthMode = () => {
        setShowLogin(!showLogin);
    }

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

    if(!isAuthenticated) {
        return (
            <div className={`app ${darkMode ? "dark" : ""}`}>
                {showLogin ? (
                    <LoginPage
                        onLogin={handleLogin}
                        onToggleMode={toggleAuthMode}
                    />
                ) : (
                    <SignUpPage
                        onSignUp={handleLogin}
                        onToggleMode={toggleAuthMode}
                    />
                )}
            </div>
        )
    }

    return (
        <DataProvider>
            <div className={`app ${darkMode ? "dark" : ""}`}>
                <Navbar
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    onLogout={handleLogout}
                />
                <main className="main-content">{renderCurrentPage()}</main>
            </div>
        </DataProvider>
    )
}

export default App
