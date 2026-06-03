"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const gallery = [
    { id: "1", title: "Facial Treatments", size: "md:col-span-2", src: "/gallery/2.webp" },
    { id: "2", title: "Nail Art", size: "", src: "/gallery/3.webp" },
    { id: "3", title: "Brow & Lash", size: "", src: "/gallery/4.webp" },
    { id: "4", title: "Body Massage", size: "", src: "/gallery/5.webp" },
    { id: "5", title: "Makeup", size: "", src: "/gallery/6.webp" },
]

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
}

export default function Gallery() {
    return (
        <div className="py-20 px-6 md:px-10 max-w-6xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full text-center tracking-widest text-sm text-gray-400 mb-2"
            >
                OUR WORK
            </motion.h2>
            <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full text-center font-display text-3xl md:text-5xl uppercase mb-12"
            >
                Gallery
            </motion.h1>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                {gallery.map((itemData) => (
                    <motion.div
                        key={itemData.id}
                        variants={item}
                        className={`relative h-72 md:h-80 overflow-hidden group cursor-pointer ${itemData.size}`}
                    >
                        <Image
                            src={itemData.src}
                            alt={itemData.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition duration-500" />
                        <p className="absolute bottom-4 left-4 text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition duration-300">
                            {itemData.title}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}