"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useUser, useSavedMeals } from "@/utils/context"
import { MealData } from "@/utils/type"
import { FaStar } from "react-icons/fa"
import AllCountryCategory from "../AllCountryCategory"
import Form from "../Form"

const EachCountryCategory = () => {
    const { user, setUser, saveCountry } = useUser()
    const { savedMeal, addMeal, removeMeal } = useSavedMeals()

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [meals, setMeals] = useState<MealData[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    useEffect(() => {
        const storedCountry = localStorage.getItem("favoriteCountry")
        if (storedCountry && user) {
            setSelectedCountry(storedCountry)
            fetchCountryMeals(storedCountry)
            if (user.favoriteCountry !== storedCountry) {
                setUser(prev => prev ? { ...prev, favoriteCountry: storedCountry } : prev)
            }
        } else if (user?.favoriteCountry) {
            setSelectedCountry(user.favoriteCountry)
            fetchCountryMeals(user.favoriteCountry)
        }
    }, [user, setUser])

    const isSaved = (idMeal: string) => savedMeal.some(m => m.idMeal === idMeal)

    const toggleFavorite = async (meal: MealData) => {
        if (isSaved(meal.idMeal)) removeMeal(meal.idMeal)
        else {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            const data = await res.json()
            if (data.meals && data.meals[0]) addMeal(data.meals[0])
        }
    }

    const fetchCountryMeals = async (countryName: string) => {
        try {
            setLoading(true)
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryName}`)
            const data = await res.json()
            if (data.meals) {
                setMeals(data.meals)
                setError(null)
            } else {
                setMeals([])
                setError("No meals found for this country.")
            }
        } catch {
            setError("Something went wrong.")
            setMeals([])
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        if (!selectedCountry?.trim()) return
        setError(null)
        setMeals([])
        fetchCountryMeals(selectedCountry)
    }

    const handleSaveCountry = () => {
        if (!selectedCountry) return
        saveCountry(selectedCountry)
        localStorage.setItem("favoriteCountry", selectedCountry)

        setSuccessMessage(`Favorite country "${selectedCountry}" saved!`)
        setTimeout(() => setSuccessMessage(null), 5000)
    }

    const handleBack = () => {
        setSelectedCountry(null)
        setMeals([])
        setError(null)
    }

    if (!user) return <Form />

    return (
        <div className="min-h-screen p-8 bg-gradient-to-r from-black-400 via-blue-300 to-black-400 text-[#0B132B]">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">

                <form onSubmit={handleSearch} className="flex gap-4 justify-center flex-1 max-w-xl mx-auto">
                    <input
                        type="text"
                        value={selectedCountry || ""}
                        onChange={e => setSelectedCountry(e.target.value)}
                        placeholder="Enter a country"
                        className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 focus:outline-none flex-1"
                    />
                    <button type="submit" className="px-2 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">Search</button>
                    {selectedCountry && (
                        <button type="button" onClick={handleSaveCountry} className="px-2 py-2 bg-green-600 text-white rounded-lg cursor-pointer">
                            Save Country
                        </button>
                    )}
                </form>

                {selectedCountry && (
                    <button type="button" onClick={handleBack} className="px-4 py-2 bg-gray-500 text-white rounded-lg cursor-pointer mt-2 md:mt-0 md:ml-auto block md:inline-block mx-auto md:mx-0" >
                        Back to All Countries
                    </button>
                )}
            </div>

            {successMessage && <p className="text-gray-900 mb-4 text-center">{successMessage}</p>}
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {loading && <p className="text-center">Loading...</p>}

            {meals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {meals.map(meal => (
                        <div key={meal.idMeal} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative w-full h-60">
                                <Image src={meal.strMealThumb} alt={meal.strMeal} fill className="object-cover w-full h-full" />
                                <button
                                    onClick={() => toggleFavorite(meal)}
                                    className="absolute top-2 right-2 text-yellow-400 text-lg bg-black rounded-full p-1 cursor-pointer">
                                    <FaStar className={isSaved(meal.idMeal) ? "fill-yellow-400" : "fill-amber-50"} />
                                </button>
                            </div>
                            <p className="text-center font-semibold mt-2 p-2">{meal.strMeal}</p>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <AllCountryCategory />
            )}
        </div>
    )
}

export default EachCountryCategory
