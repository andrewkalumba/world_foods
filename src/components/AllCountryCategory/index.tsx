"use client"
import { MealData } from "@/utils/type"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSavedMeals } from "@/utils/context"
import { FaStar } from "react-icons/fa"

const AllCountryCategory = () => {
    const [allMealsByCountry, setAllMealsByCountry] = useState<{ [key: string]: MealData[] }>({})
    const [loading, setLoading] = useState(false)
    const { savedMeal, addMeal, removeMeal } = useSavedMeals()

    const isSaved = (idMeal: string) => savedMeal.some((m) => m.idMeal === idMeal)

    const toggleFavorite = async (favoriteMeal: MealData) => {
        if (isSaved(favoriteMeal.idMeal)) {
            removeMeal(favoriteMeal.idMeal)
        } else {
            try {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favoriteMeal.idMeal}`)
                const data = await res.json()
                if (data.meals && data.meals[0]) {
                    addMeal(data.meals[0])
                }
            } catch (error) {
                console.error("Error fetching meal details:", error)
            }
        }
    }

    const fetchAllMeals = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            const data = await response.json()
            if (data.meals) {
                const countries = data.meals.map((c: any) => c.strArea)

                const allMeals: { [key: string]: MealData[] } = {}

                await Promise.all(
                    countries.map(async (c: string) => {
                        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${c}`)
                        const d = await res.json()
                        if (d.meals) {
                            allMeals[c] = d.meals
                        }
                    })
                )

                setAllMealsByCountry(allMeals)
            }

        } catch (error) {
            console.error("Error fetching all meals:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAllMeals()
    }, [])

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-600">
                Explore Meals by Country
            </h2>

            {loading && <p className="text-blue-600 text-center">Loading delicious meals...</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(allMealsByCountry).map(([country, meals]) => (
                    <div key={country} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">{country}</h3>
                            <span className="text-sm text-gray-500">{meals.length} meals</span>
                        </div>

                        <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2">
                            {meals.map((meal) => (
                                <div key={meal.idMeal} className="min-w-[160px] bg-gray-50 rounded-xl shadow hover:shadow-md transition relative overflow-hidden">
                                    <div className="relative w-full h-28">
                                        <Image
                                            src={meal.strMealThumb}
                                            alt={meal.strMeal}
                                            fill
                                            sizes="150px"
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm font-medium text-gray-700 text-center line-clamp-2">
                                            {meal.strMeal}
                                        </p>

                                        <button onClick={() => toggleFavorite(meal)} className="absolute top-2 right-2 text-yellow-400 text-lg bg-black rounded-full p-1">
                                            <FaStar className={isSaved(meal.idMeal) ? "fill-yellow-400" : "fill-amber-50"} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllCountryCategory
