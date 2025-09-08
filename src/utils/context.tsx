"use client"
import { createContext, useContext, useState } from "react"
import { FoodContextType, FoodProp, meal, savedMeal, FavoriteContextType, userType, userContextType } from "@/utils/type"

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
    if (!context) {
        throw new Error("useFoodContext must be used within a FoodContextProvider")
    }
    return context
}


const SavedMealContext = createContext<savedMeal | undefined>(undefined)

export const SavedMealProvider = ({ children }: { children: React.ReactNode }) => {
    const [savedMeal, setSavedMeal] = useState<meal[]>([])

    const addMeal = (item: meal) => {
        setSavedMeal((prev) => {
            if (prev.find(food => food.idMeal === item.idMeal)) return prev
            return [...prev, item]
        })
    }

    const removeMeal = (id: string) => {
        setSavedMeal((prev) => prev.filter(food => food.idMeal !== id))
    }

    return (
        <SavedMealContext.Provider value={{ savedMeal, addMeal, removeMeal }}>
            {children}
        </SavedMealContext.Provider >
    )
}
export const useSavedMeals = () => {
    const context = useContext(SavedMealContext)
    if (!context) throw new Error("useSavedMeals must be used within a SavedMealsProvider")
    return context
}


const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoriteCategory, setFavoriteCategory] = useState<string | null>(null)

    return (
        <FavoriteContext.Provider value={{ favoriteCategory, setFavoriteCategory }}>
            {children}
        </FavoriteContext.Provider>
    )
}

export const useFavorite = () => {
    const context = useContext(FavoriteContext)
    if (!context) {
        throw new Error("useFavorite must be used inside FavoriteProvider")
    }
    return context
}

const userContext = createContext<userContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userType | null>(null)
    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(userContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context
}
