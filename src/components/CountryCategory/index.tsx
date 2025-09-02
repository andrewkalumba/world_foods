"use client"

import Form from "@/components/Form"
import { useUser } from "@/utils/context"
import { useState } from "react"
import Image from "next/image"
import { Meal } from "@/utils/type"

const CountryCategory = () => {
    const { user } = useUser()
    const [country, setCountry] = useState("")
    const [meals, setMeals] = useState<Meal[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchCountryMeals = async (searchCountry: string) => {
        try {
            setLoading(true)
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?a=${searchCountry}`
            )
            const data = await response.json()
            if (data.meals) {
                setMeals(data.meals)
            } else {
                setMeals([])
                setError("No meals found for this country.")
            }
        } catch (err) {
            console.error("Fetch error:", err)
            setError("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!country.trim()) return
        setError(null)
        setMeals([])
        fetchCountryMeals(country)
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-black-400 via-blue-300 to-black-400 text-[#0B132B]">
            <div className="p-8 sm:p-20 pb-10">
                {!user ? (
                    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg">
                        <h1 className="text-3xl font-bold text-[#0B132B]">Welcome to WorldFoods</h1>
                        <p className="text-gray-600 text-center">
                            Please log in to explore our collection of delicious recipes.
                        </p>
                        <Form />
                    </div>
                ) : (
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="mt-10 text-center">
                            <p className="text-gray-600 mt-4">
                                Search for meals by country:
                            </p>

                            <form
                                onSubmit={handleSearch}
                                className="mt-6 flex justify-center gap-4">
                                <input
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Enter a country (e.g. Sweden, Uganda)"
                                    className="px-4 py-2 w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm text-amber-950" />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:shadow-lg transition">
                                    Search
                                </button>
                            </form>

                            {loading && <p className="mt-6 text-blue-600">Loading...</p>}
                            {error && <p className="mt-6 text-red-600">{error}</p>}

                            {meals.length > 0 && (
                                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {meals.map((meal) => (
                                        <div
                                            key={meal.idMeal}
                                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                            <div className="relative w-28 h-28 mx-auto mt-4">
                                                <Image
                                                    src={meal.strMealThumb}
                                                    alt={meal.strMeal}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="rounded-full border-4 border-blue-500 shadow-md group-hover:border-blue-300 transition"
                                                />
                                            </div>
                                            <h2 className="p-4 text-lg font-semibold text-gray-800 text-center">
                                                {meal.strMeal}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CountryCategory
