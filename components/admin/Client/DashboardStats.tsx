"use client"

import { motion } from "framer-motion"

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

interface Props {
    total: number
    today: number
    pending: number
    confirmed: number
}

export default function DashboardStats({ total, today, pending, confirmed }: Props) {
    const stats = [
        { label: "Total Bookings", value: total },
        { label: "Today", value: today },
        { label: "Pending", value: pending },
        { label: "Confirmed", value: confirmed },
    ]

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
            {stats.map((stat) => (
                <motion.div key={stat.label} variants={item} className="border border-gray-200 p-6">
                    <p className="text-xs tracking-widest uppercase text-gray-400">{stat.label}</p>
                    <h2 className="font-display text-4xl mt-2">{stat.value}</h2>
                </motion.div>
            ))}
        </motion.div>
    )
}