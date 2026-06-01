"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReviewModal from "../review/ReviewModal"

interface Testimonials {
    _id: string
    firstName: string
    lastName: string
    service: { title: string }
    text: string
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonials[]>([])
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/reviews")
            const data = await res.json()
            setTestimonials(data)
        }

        fetchData()
    }, [refreshKey])

    return (
        <div className="py-20 px-6 md:px-10 max-w-6xl mx-auto">

            {/* HEADER */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="tracking-widest text-sm text-gray-400 mb-2 text-center"
            >
                CLIENT EXPERIENCES
            </motion.h2>

            <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8 }}
                className="font-display text-3xl md:text-5xl uppercase mb-16 text-center"
            >
                Trusted by Women<br />Who Value Elegance
            </motion.h1>

            {/* CONTENT */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-16">

                {/* LEFT LIST */}
                <div className="flex flex-col gap-4 md:w-1/3 order-2 md:order-1">

                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t._id}
                            onClick={() => setSelectedIndex(index)}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex items-center gap-4 p-4 cursor-pointer border-l-2 transition ${selectedIndex === index
                                ? "border-[#DE9E36] bg-gray-50"
                                : "border-transparent"
                                }`}
                        >
                            <div className="w-11 h-11 rounded-full bg-[#DE9E36] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-semibold">
                                    {t.firstName[0]}{t.lastName[0]}
                                </span>
                            </div>

                            <div>
                                <p className="font-semibold text-sm">
                                    {t.firstName} {t.lastName}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {t.service.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                    <ReviewModal onClose={() => setRefreshKey(prev => prev + 1)} />
                </div>

                {/* RIGHT QUOTE */}
                <div className="md:w-2/3 flex flex-col justify-center order-1 md:order-2">

                    <AnimatePresence mode="wait">
                        {testimonials.length > 0 && (
                            <motion.p
                                key={selectedIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-2x1 md:text-lg font-display leading-relaxed text-gray-700"
                            >
                                "{testimonials[selectedIndex].text}"
                            </motion.p>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    )
}