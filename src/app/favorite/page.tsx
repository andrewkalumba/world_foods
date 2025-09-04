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
        <div className="min-h-screen p-6 bg-gradient-to-r from-black-400 via-blue-300 to-black-400 text-[#0B132B] flex justify-center">
            <div className="w-[70%] max-w-6xl bg-white rounded-3xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-6">Your Saved Meals</h1>

                {savedMeal.length === 0 ? (
                    <p>You have no saved meals. Go save some delicious meals!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {savedMeal.map((meal) => (
                            <div key={meal.idMeal} className="bg-white rounded-lg shadow p-4 relative cursor-pointer"
                                onClick={() => setFoodInfo(meal)}>
                                <Image
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    width={200}
                                    height={150}
                                    className="rounded"
                                />
                                <h2 className="mt-2 font-semibold">{meal.strMeal}</h2>
                                <p className="text-sm">{meal.strCategory}</p>

                                <button
                                    onClick={() => removeMeal(meal.idMeal)}
                                    className="absolute top-4 right-4 font-bold bg-red-600 hover:bg-red-600 transition px-4 py-2 rounded-lg  text-white shadow">
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
                                onClick={() => setFoodInfo(null)}
                            />

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-6"
                            >
                                <div className="bg-white text-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
                                    <button
                                        onClick={() => setFoodInfo(null)}
                                        className="absolute top-4 right-4 font-bold bg-red-600 hover:bg-red-600 transition px-4 py-2 rounded-lg  text-white shadow animate-pulse">
                                        Close
                                    </button>

                                    <h2 className="text-2xl pt-10 font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                        {foodInfo.strMeal}
                                    </h2>

                                    <Image
                                        src={foodInfo.strMealThumb}
                                        alt={foodInfo.strMeal}
                                        width={500}
                                        height={350}
                                        className="rounded-2xl mb-6 object-cover mx-auto shadow-lg"
                                    />

                                    <div className="space-y-2 text-gray-700">
                                        <p>
                                            <strong>Category:</strong> {foodInfo.strCategory}
                                        </p>
                                        <p>
                                            <strong>Area:</strong> {foodInfo.strArea}
                                        </p>
                                    </div>

                                    <p className="mt-6 whitespace-pre-line leading-relaxed text-gray-800">
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
