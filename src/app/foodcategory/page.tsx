"use client"

import Link from "next/link"
import { useEffect} from "react"
import Image from "next/image"
import { Category } from "@/utils/type"
import { motion } from "framer-motion"
import { useFoodContext } from "@/utils/context"

const FoodListsLanding = () => {
    const { allFoods, setAllFoods } = useFoodContext()

    const API_ENDPOINT = "https://www.themealdb.com/api/json/v1/1/categories.php"

    const fetchFoods = async () => {
        try {
            const response = await fetch(API_ENDPOINT)
            const data = await response.json()
            setAllFoods(data)
            console.log("Fetched categories:", data)
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }

    useEffect(() => {
        fetchFoods()
    }, [])

    return (
        <div className="min-h-screen bg-[url(/image.jpg)] bg-auto bg-center py-14 px-6">
            <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-center mb-6 
          bg-gradient-to-r from-blue-600 via-cyan-600 to-pink-500 
          bg-clip-text text-transparent drop-shadow-lg ">
                Food Categories
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, rotateY: -30 }}
                animate={{ opacity: 1, rotateY: 0 }}
                whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                className="text-center text-white text-2xl mb-12 font-bold 
    drop-shadow-[5px_5px_8px_rgba(0,0,0,0.3)]"
            >
                Select a category below to explore delicious meals.
            </motion.p>

            <motion.div
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.1 } },
                }}>

                {allFoods &&
                    allFoods.categories.map((item: Category) => (
                        <motion.div
                            key={item.idCategory}
                            variants={{
                                hidden: { opacity: 0, y: 30, scale: 0.9 },
                                show: { opacity: 1, y: 0, scale: 1 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="group bg-white rounded-3xl shadow-md hover:shadow-xl 
              transition relative overflow-hidden cursor-pointer">
                            <Link
                                href={`/filteredfood/${item.strCategory}`}
                                className="flex flex-col items-center p-6">

                                <div className="relative w-28 h-28 mb-4">
                                    <Image
                                        src={item.strCategoryThumb}
                                        alt={item.strCategory}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="rounded-full border-4 border-blue-500 
                    shadow-md group-hover:border-blue-300 transition"
                                    />
                                </div>

                                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
                                    {item.strCategory}
                                </h2>
                                <p className="text-sm text-gray-600 mt-2 text-center line-clamp-4">
                                    {item.strCategoryDescription}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
            </motion.div>
        </div>
    )
}

export default FoodListsLanding
