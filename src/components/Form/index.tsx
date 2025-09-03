"use client"

import { useState } from "react"
import { userArray } from "@/data/user"
import { useUser } from "@/utils/context"
import { motion, AnimatePresence } from "framer-motion"

const Form = () => {
    const [userInput, setUserInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const { setUser } = useUser()

    const handleClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if (!userInput.trim() || !passwordInput.trim()) {
            setErrorMessage("⚠️ Please fill in both username and password!")
            setTimeout(() => setErrorMessage(""), 3000)
            return
        }

        const foundUser = userArray.find(user => user.name === userInput && user.password.toString() === passwordInput)

        if (foundUser) {
            setUser(foundUser)
        } else {
            setErrorMessage("❌ Invalid username or password!")
            setTimeout(() => setErrorMessage(""), 3000)
        }
    }

    return (
        <div className="min-h-screen flex items-start pt-40 p-3 md:p-0 md:pt-0 md:items-center justify-center bg-[url(/image1.jpg)] bg-center bg-cover">
            <motion.form
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">

                <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Login
                </h2>

                <AnimatePresence>
                    {errorMessage && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-600 text-center mb-4 font-semibold">
                            {errorMessage}
                        </motion.p>
                    )}
                </AnimatePresence>

                <div className="flex flex-col md:gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-gray-900 font-medium mb-2">
                            Username
                        </label>
                        <input
                            onChange={e => setUserInput(e.target.value)}
                            type="text"
                            placeholder="Enter your username"
                            id="username"
                            value={userInput}
                            className="px-4 py-3 text-amber-950 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition shadow-sm"
                            required />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            onChange={e => setPasswordInput(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            id="password"
                            value={passwordInput}
                            className="px-4 py-3 rounded-xl border text-amber-950 border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none transition shadow-sm"
                            required
                        />
                    </div>
                    <div className="pt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleClick}
                            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                            Login
                        </motion.button>
                    </div>
                </div>
            </motion.form>
        </div>
    )
}

export default Form
