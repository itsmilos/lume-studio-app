"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7 },
    },
}

export default function ServicesClient({ data }: any) {
    return (
        <div className="my-10">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6 }}
                className="w-full text-center tracking-widest text-sm text-gray-400"
            >
                OUR SERVICES
            </motion.h2>
            <motion.h1
                initial={{ opacity: 0, y: 30, letterSpacing: "0.2em" }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8 }}
                className="w-full text-center font-display text-2xl md:text-5xl uppercase my-5"
            >
                Crafted Beauty Experiences
            </motion.h1>
            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 my-10 gap-0"
            >
                {data.map((service: any) => (
                    <motion.div
                        key={service._id}
                        variants={item}
                        className="relative h-96 overflow-hidden group cursor-pointer"
                    >
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-500" />
                        <motion.div
                            className="absolute bottom-0 left-0 p-8 text-white"
                            initial={{ y: 10, opacity: 0.8 }}
                            whileHover={{ y: -6, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <p className="text-xs uppercase tracking-widest text-gray-300">
                                {service.category}
                            </p>

                            <h3 className="text-2xl font-display mt-2">
                                {service.title}
                            </h3>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.section>
        </div>
    )
}