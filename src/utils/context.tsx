"use client"

import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from "react"
import { FoodContextType, FoodProp, meal, savedMeal, userType, userContextType } from "@/utils/type"

const foodContext = createContext<FoodContextType | undefined>(undefined)

export const FoodContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [allFoods, setAllFoods] = useState<FoodProp | null>(null)

    return (
        <foodContext.Provider value={{ allFoods, setAllFoods }}>
            {children}
        </foodContext.Provider>
    )
}

export const useFoodContext = () => {
    const context = useContext(foodContext)
    if (!context) throw new Error("useFoodContext must be used within a FoodContextProvider")
    return context
}

const userContext = createContext<userContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem("user")
        if (stored) setUser(JSON.parse(stored))
    }, [])

    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user))
        else localStorage.removeItem("user")
    }, [user])

    const saveCountry = (country: string) => {
        if (!user) return
        const updatedUser = { ...user, favoriteCountry: country }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    const clearCountry = () => {
        if (!user) return
        const updatedUser = { ...user }
        delete updatedUser.favoriteCountry
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    const saveFavoriteCategory = (category: string) => {
        if (!user) return
        const updatedUser = { ...user, favoriteCategory: category }
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    const clearFavoriteCategory = () => {
        if (!user) return
        const updatedUser = { ...user }
        delete updatedUser.favoriteCategory
        setUser(updatedUser)
        localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    return (
        <userContext.Provider value={{ 
            user, 
            setUser, 
            saveCountry, 
            clearCountry, 
            saveFavoriteCategory, 
            clearFavoriteCategory 
        }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(userContext)
    if (!context) throw new Error("useUser must be used within a UserProvider")
    return context
}

const SavedMealContext = createContext<savedMeal & { lastViewedMeal: meal | null, viewMeal: (meal: meal) => void } | undefined>(undefined)

export const SavedMealProvider = ({ children }: { children: React.ReactNode }) => {
    const [savedMeal, setSavedMeal] = useState<meal[]>([])
    const [lastViewedMeal, setLastViewedMeal] = useState<meal | null>(null)
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`${user.name}_meals`)
            if (stored) setSavedMeal(JSON.parse(stored))
            else setSavedMeal([])
        }
    }, [user])

    useEffect(() => {
        if (user) localStorage.setItem(`${user.name}_meals`, JSON.stringify(savedMeal))
    }, [savedMeal, user])

    const addMeal = (item: meal) => {
        setSavedMeal(prev => prev.find(m => m.idMeal === item.idMeal) ? prev : [...prev, item])
    }

    const removeMeal = (id: string) => setSavedMeal(prev => prev.filter(m => m.idMeal !== id))

    const viewMeal = (meal: meal) => setLastViewedMeal(meal)

    return (
        <SavedMealContext.Provider value={{ savedMeal, addMeal, removeMeal, lastViewedMeal, viewMeal }}>
            {children}
        </SavedMealContext.Provider>
    )
}

export const useSavedMeals = () => {
    const context = useContext(SavedMealContext)
    if (!context) throw new Error("useSavedMeals must be used within a SavedMealProvider")
    return context
}
