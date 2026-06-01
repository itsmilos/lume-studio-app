"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative w-full h-[80vh] flex flex-col items-center justify-end pb-20 overflow-hidden">

            {/* IMAGE */}
            <motion.img
                src="/1.jpg"
                alt="Beauty salon"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40" />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center px-4 text-center">

                <motion.h1
                    initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                    transition={{ duration: 1 }}
                    className="font-display text-4xl md:text-7xl text-white"
                >
                    ELEVATE YOUR NATURAL BEAUTY
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="mt-4 text-lg text-gray-200 max-w-2xl"
                >
                    Premium beauty treatments and personalized care designed to help you look and feel your best.
                </motion.p>

            </div>

            {/* SCROLL ICON */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                >
                    <ChevronDown size={32} />
                </motion.div>
            </motion.div>

        </section>
    )
}