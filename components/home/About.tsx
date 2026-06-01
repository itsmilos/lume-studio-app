"use client"

import { motion } from "framer-motion"

const text =
    "We believe beauty is about enhancing your natural features, not changing who you are. Our goal is to help you feel confident, refreshed, and comfortable in your own skin."

const words = text.split(" ")

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
}

export default function About() {
    return (
        <div className="py-20">
            <h2 className="text-center uppercase tracking-widest text-sm text-gray-400">
                About Lumé
            </h2>

            <div className="flex justify-center">
                <motion.p
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="text-sm md:text-2xl p-5 text-center text-gray-600 font-light max-w-4xl leading-relaxed"
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={item}
                            viewport={{ once: true, amount: 0.4 }}
                            className="inline-block mr-2"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.p>
            </div>
        </div>
    )
}