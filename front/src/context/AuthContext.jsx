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
        const savedUser = localStorage.getItem("user")
        const savedAuth = localStorage.getItem("isAuthenticated")
        const savedToken = localStorage.getItem("token")



        if (savedUser && savedAuth === "true" && savedToken) {
            try{
                const user = JSON.parse(savedUser)
                setUser(user)
                setIsAuthenticated(true)
            } catch (error) {
                localStorage.clear()
            }
        } else {
            localStorage.clear()
        }
        setLoading(false)
    }, [])

    const login = async (credentials) => {
        try {
            const response = await  fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            })

            if(!response.ok) {
                const ErrorData = await response.json()
                throw new Error(`erroe :  ${ErrorData.error}` || 'login failed')
            }
            const { token } = await response.json()

            const userResponse = await  fetch(`/api/auth/me`, {headers: { 'Authorization': `Bearer ${token}` }})

            const userData = await userResponse.json()

            setUser(userData)
            setIsAuthenticated(true)
            localStorage.setItem("user", JSON.stringify(userData))
            localStorage.setItem("token", token)
            localStorage.setItem("isAuthenticated", "true")

            return { success: true }
        } catch (error) {
            console.error("Login error:", error)
            return { success: false, error: error.message }
        }
    }

    const signup = async (userData) => {
        try {
            const response = await  fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password
                })
            })

            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(`error :  ${errorData.error}` || 'signup failed')
            }

            const newUser = await response.json()

            const loginResult = await login({
                email: userData.email,
                password: userData.password
            })
            return loginResult;

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
        localStorage.removeItem("token")
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
