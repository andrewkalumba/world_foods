"use client"

import Link from "next/link"
import { NavItems } from "@/utils/type"

const Navigation = () => {
    return (
        <nav className="backdrop-blur-md bg-[#040F0F]/90 text-white px-8 py-3 flex items-center justify-center shadow-lg sticky top-0 z-50 rounded-b-2xl border-b border-white/10">
            <div className="flex gap-10 items-center text-lg font-medium">
                {NavItems.map((item) => (
                    <Link key={item.name} href={item.link} className="relative group transition">
                        <span className="hover:text-blue-400 transition text-md md:text-2xl">{item.name}</span>
                    
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Navigation
