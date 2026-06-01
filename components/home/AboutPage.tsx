"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"
import BookingModal from "../booking/BookingModal"

const team = [
    { name: "Emma Laurent", role: "Founder & Lead Aesthetician", img: "/founder.jpg" },
    { name: "Sophie Clarke", role: "Nail Artist", img: "/nails-artist.jpg" },
    { name: "Isabelle Ward", role: "Brow & Lash Specialist", img: "/brows-specialist.jpg" },
]

const info = [
    { label: "Address", value: "27 Sloane Street, Chelsea, London SW1X 9LP" },
    { label: "Mon–Fri", value: "9:00 – 20:00" },
    { label: "Saturday", value: "9:00 – 17:00" },
    { label: "Sunday", value: "Closed" },
    { label: "Phone", value: "+44 20 7946 0823" },
    { label: "Email", value: "hello@lumestudio.co.uk" },
]

const teamContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } }
}

const teamItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } }
}

export default function AboutPage() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-10 py-20">

            {/* Hero */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <h2 className="tracking-widest text-sm text-gray-400 mb-4">ABOUT LUMÉ</h2>
                <h1 className="font-display text-4xl md:text-6xl uppercase mb-8">Beauty rooted in<br />confidence, crafted<br />with care.</h1>
                <p className="text-gray-500 font-light max-w-2xl text-lg">
                    Lumé was founded with a simple belief — every woman deserves to feel beautiful in her own skin. Based in the heart of Chelsea, we combine expert techniques with premium products to deliver results that speak for themselves.
                </p>
            </motion.div>

            {/* Team */}
            <div className="mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="tracking-widest text-sm text-gray-400 mb-10"
                >
                    OUR TEAM
                </motion.h2>
                <motion.div
                    variants={teamContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {team.map((member) => (
                        <motion.div key={member.name} variants={teamItem}>
                            <div className="group relative h-80 bg-gray-100 mb-4 overflow-hidden">
                                <Image fill alt={member.name} className="object-cover group-hover:scale-105 transition duration-700" src={member.img} />
                            </div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-xs tracking-widest uppercase text-gray-400 mt-1">{member.role}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Info + CTA */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-20 border-t border-gray-100 pt-20"
            >
                <div className="flex-1">
                    <h2 className="tracking-widest text-sm text-gray-400 mb-8">VISIT US</h2>
                    <div className="flex flex-col gap-4">
                        {info.map((item) => (
                            <div key={item.label} className="flex flex-col">
                                <span className="text-xs tracking-widest uppercase text-gray-400">{item.label}</span>
                                <span className="text-sm font-medium mt-1">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="font-display text-3xl md:text-4xl mb-6">Ready to experience Lumé?</h2>
                    <p className="text-gray-500 font-light mb-8">Book your appointment today and let us take care of the rest.</p>
                    <button
                        className="shrink-0 border border-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm tracking-widest uppercase hover:bg-black hover:text-white active:scale-95 transition w-fit"
                        onClick={() => setModalIsOpen(true)}
                    >
                        Book Your Appointment
                    </button>
                </div>
            </motion.div>

            {modalIsOpen && <BookingModal onClose={() => setModalIsOpen(false)} />}
        </div>
    )
}