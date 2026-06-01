"use client"

import { motion } from "framer-motion"
import DeleteServiceButton from "./DeleteService"

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const textClass = "text-sm text-gray-400 mt-1"

export default function ServicesListClient({ data }: { data: any[] }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
        >
            {data.map((service: any) => (
                <motion.div key={service._id} variants={item} className="border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-lg">{service.title}</h2>
                        <p className={textClass}>{service.category} · {service.duration}min · ${service.price}</p>
                        <p className={textClass}>{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <DeleteServiceButton id={service._id} />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}