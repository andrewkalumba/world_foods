"use client"

import { useSavedMeals } from "@/utils/context"
import { meal } from "@/utils/type"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

const ProfilePage = () => {
    const { savedMeal, removeMeal } = useSavedMeals()
    const [foodInfo, setFoodInfo] = useState<meal | null>(null)

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-blue-100 via-white to-blue-200 text-[#0B132B] flex justify-center">
            <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
                    Your Saved Meals
                </h1>

                {savedMeal.length === 0 ? (
                    <p className="text-center text-gray-600">You have no saved meals. Go save some delicious meals!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {savedMeal.map((meal) => (
                            <div key={meal.idMeal} className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 p-4 relative cursor-pointer flex flex-col" onClick={() => setFoodInfo(meal)}>
                                
                                <Image src={meal.strMealThumb} alt={meal.strMeal} width={300} height={200} className="rounded-lg object-cover w-full h-40" />
                                <div className="mt-3 flex-1">
                                    <h2 className="font-semibold text-lg truncate">{meal.strMeal}</h2>
                                    <p className="text-sm text-gray-500">{meal.strCategory}</p>
                                </div>

                                <button onClick={(e) => { e.stopPropagation(), removeMeal(meal.idMeal) }} className="absolute top-3 right-3 font-semibold bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-lg text-white shadow text-sm" >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <AnimatePresence>
                    {foodInfo && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                                onClick={() => setFoodInfo(null)} />

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 40 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                                <div className="bg-white text-gray-900 rounded-3xl shadow-2xl w-full max-w-3xl relative overflow-y-auto max-h-[90vh] p-6 sm:p-8">

                                    <h2 className="text-xl sm:text-2xl pt-10 font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {foodInfo.strMeal}
                                    </h2>

                                    <Image src={foodInfo.strMealThumb} alt={foodInfo.strMeal} width={600} height={400}
                                        className="rounded-2xl mb-6 object-cover mx-auto shadow-lg w-full max-h-80" />

                                    <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                                        <p>
                                            <strong>Category:</strong> {foodInfo.strCategory}
                                        </p>
                                        <p>
                                            <strong>Area:</strong> {foodInfo.strArea}
                                        </p>
                                    </div>

                                    <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-800 text-sm sm:text-base">
                                        {foodInfo.strInstructions}
                                    </p>

                                    {foodInfo.strYoutube && (
                                        <div className="mt-8 w-full aspect-video">
                                            <iframe
                                                className="w-full h-full rounded-xl shadow-md"
                                                src={`https://www.youtube.com/embed/${foodInfo.strYoutube.split("v=")[1]}`}
                                                title={foodInfo.strMeal}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProfilePage
