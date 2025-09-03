"use client"

import Link from "next/link"
import { NavItems } from "@/utils/type"
import { useUser } from "@/utils/context"
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";

const Navigation = () => {
    const { user, setUser } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    const ToggleMenu = () => {
        setIsOpen(isOpen === false)
    }

    const handleLogout = () => {
        setUser(null)
    }
    if (!user) return null
    return (
        <nav className="backdrop-blur-md bg-[#040F0F]/90 text-white px-8 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50 rounded-b-2xl border-b border-white/10">
            <div className="hidden md:flex gap-10 justify-between w-full" >
                <div className=" flex gap-10 items-center text-lg font-medium">
                    {NavItems.map((item) => (
                        <Link key={item.name} href={item.link} className="relative group transition">
                            <span className="hover:text-blue-400 transition text-md md:text-2xl">{item.name}</span>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    ))}
                </div>

                {user && (
                    <div className="">
                        <span>Logged in as {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-white font-semibold">
                            Logout
                        </button>
                    </div>
                )}
            </div>

         
            <button onClick={ToggleMenu} className="md:hidden p-4">
                {isOpen ? <RiCloseLine /> : <RxHamburgerMenu />}
            </button>
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#040F0F]/95 text-white flex flex-col gap-4 px-6 py-6 shadow-lg md:hidden rounded-b-2xl">
                    {NavItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.link}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium hover:text-blue-400 transition">
                            {item.name}
                        </Link>
                    ))}
                    <span className="mt-4">Logged in as {user.name}</span>
                    <button
                        onClick={handleLogout}
                        className="mt-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition text-white font-semibold w-full"
                    >
                        Logout
                    </button>
                </div>
            )}


        </nav>
    )
}

export default Navigation
