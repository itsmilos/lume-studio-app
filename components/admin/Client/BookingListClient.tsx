"use client"

import { motion } from "framer-motion"
import StatusButton from "./StatusButton"
import DeleteBookingButton from "./DeleteBooking"

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const cardClass = "border border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
const textClass = "text-sm text-gray-400 mt-1"

export default function BookingsListClient({ data }: { data: any[] }) {
    if (data.length === 0) return <p className="text-gray-400 tracking-widest text-sm uppercase">No bookings to preview.</p>

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
        >
            {data.map((booking: any) => (
                <motion.div key={booking._id} variants={item} className={cardClass}>
                    <div>
                        <h2 className="font-semibold text-lg">{booking.firstName} {booking.lastName}</h2>
                        <p className={textClass}>{booking.service?.title}</p>
                        <p className={textClass}>{new Date(booking.start).toLocaleString()}</p>
                        <p className={textClass}>{booking.email} · {booking.phone}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <StatusButton booking={booking} id={booking._id} currentStatus={booking.status} />
                        <DeleteBookingButton id={booking._id} />
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}