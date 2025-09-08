"use client"

import { AllMeals, meal } from "@/utils/type"
import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { use } from "react"
import { useSavedMeals } from "@/utils/context"
import toast from "react-hot-toast"

const EachFoodCategory = ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = use(params)
  const [filteredFood, setFilteredFood] = useState<AllMeals | null>(null)
  const [foodInfo, setFoodInfo] = useState<meal | null>(null)
  const { addMeal } = useSavedMeals()

  const fetchFilteredFood = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      const data = await response.json()
      setFilteredFood(data)
    } catch (error) {
      console.error("Error fetching meals:", error)
    }
  }

  const SingleFoods = async (idMeal: string) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      const data = await response.json()
      setFoodInfo(data.meals[0])
    } catch (err) {
      console.error("Error fetching meal details:", err)
    }
  }

  useEffect(() => {
    fetchFilteredFood()
  }, [category])

  if (!category) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-black-400 via-blue-300 to-black-400 text-[#0B132B] py-12 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
        {category} Meals
      </motion.h1>

      <motion.div
        className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}>
        {filteredFood &&
          filteredFood.meals.map((item: meal) => (
            <motion.div
              key={item.idMeal}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition relative overflow-hidden cursor-pointer">
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={item.strMealThumb}
                  alt={item.strMeal}
                  fill
                  sizes="100%"
                  className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-5 flex flex-col items-center text-center">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
                  {item.strMeal}
                </h2>
                <motion.button
                  onClick={() => SingleFoods(item.idMeal)}
                  whileTap={{ scale: 0.9 }}
                  className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-yellow-500 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all">
                  View Recipe
                </motion.button>
              </div>
            </motion.div>
          ))}
      </motion.div>

      <AnimatePresence>
        {foodInfo && (
          <div className="bg-gradient-to-r from-black-400 via-blue-300 to-black-400 text-[#0B132B]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setFoodInfo(null)} />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6">

              <div className="bg-white text-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
                <button onClick={() => setFoodInfo(null)} className="absolute top-4 right-4 font-bold bg-red-600 hover:bg-red-600 transition px-4 py-2 rounded-lg  text-white shadow animate-pulse">
                  Close
                </button>

                <motion.button
                  onClick={() => {
                    if (foodInfo) {
                      addMeal(foodInfo)
                      toast.success("✨ Meal added to favorites!")
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 px-4 py-2 rounded-lg bg-green-600 text-white shadow hover:bg-green-700 animate-pulse">
                  Save Meal
                </motion.button>

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
                      src={`https://www.youtube.com/embed/${foodInfo.strYoutube.split("v=")[1]
                        }`}
                      title={foodInfo.strMeal}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EachFoodCategory
