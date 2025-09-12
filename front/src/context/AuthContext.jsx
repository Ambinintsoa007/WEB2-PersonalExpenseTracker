"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const savedUser = localStorage.getItem("user")
        const savedAuth = localStorage.getItem("isAuthenticated")

        if (savedUser && savedAuth === "true") {
            setUser(JSON.parse(savedUser))
            setIsAuthenticated(true)
        }
        setLoading(false)
    }, [])

    const login = async (credentials) => {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(credentials)
            // });
            // const userData = await response.json();

            // Temporary mock login for development
            const userData = {
                id: 1,
                username: "User",
                email: credentials.email,
                createdAt: new Date().toISOString(),
            }

            setUser(userData)
            setIsAuthenticated(true)
            localStorage.setItem("user", JSON.stringify(userData))
            localStorage.setItem("isAuthenticated", "true")

            return { success: true }
        } catch (error) {
            console.error("Login error:", error)
            return { success: false, error: error.message }
        }
    }

    const signup = async (userData) => {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/signup', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(userData)
            // });
            // const newUser = await response.json();

            // Temporary mock signup for development
            const newUser = {
                id: Date.now(),
                username: userData.username,
                email: userData.email,
                createdAt: new Date().toISOString(),
            }

            setUser(newUser)
            setIsAuthenticated(true)
            localStorage.setItem("user", JSON.stringify(newUser))
            localStorage.setItem("isAuthenticated", "true")

            return { success: true }
        } catch (error) {
            console.error("Signup error:", error)
            return { success: false, error: error.message }
        }
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem("user")
        localStorage.removeItem("isAuthenticated")
    }

    const value = {
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        loading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
