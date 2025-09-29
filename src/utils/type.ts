import { Dispatch, SetStateAction } from "react"

export type Category = {
    strCategoryDescription: string
    strCategoryThumb: string
    strCategory: string
    idCategory: string
}

export type FoodProp = {
    categories: Category[]
}

export type FoodContextType = {
    allFoods: FoodProp | null
    setAllFoods: React.Dispatch<React.SetStateAction<FoodProp | null>>
}

export type meal = {
    strCategory: string
    strArea: string
    strInstructions: string
    strYoutube: any
    strMealThumb: string
    idMeal: string
    strMeal: string
}

export type AllMeals = {
    meals: meal[]
}

export interface CategoryContextType {
    selectedCategories: Category[]
    addCategory: (category: Category) => void
    removeCategory: (categoryId: string) => void
}

export const NavItems = [
    { name: "Home", link: "/" },
    { name: "Food Categories", link: "/foodcategory" },
    { name: "Favorites", link: "/favorite" }
]

export interface savedMeal {
    savedMeal: meal[]
    addMeal: (item: meal) => void
    removeMeal: (id: string) => void
}

export type FavoriteContextType = {
    favoriteCategory: string | null
    setFavoriteCategory: (category: string) => void
}

export type userType = {
    name: string
    password: string
    favoriteCountry?: string
    favoriteCategory?: string
    savedMeals: meal[]
}

export type userContextType = {
    user: userType | null
    setUser: Dispatch<SetStateAction<userType | null>>
    saveCountry: (country: string) => void
    clearCountry: () => void
    saveFavoriteCategory: (category: string) => void
    clearFavoriteCategory: () => void
}

export type MealData = {
    idMeal: string
    strMeal: string
    strMealThumb: string
}
