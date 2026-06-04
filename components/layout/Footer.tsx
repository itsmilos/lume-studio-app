"use client"

import Link from "next/link";
import BookingModal from "../booking/BookingModal";
import { useState } from "react";

export default function Footer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <footer className="bg-gradient-to-b from-[#1a1a1a] via-[#2c1810] to-[#8B5E3C] text-white px-10 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
                        <div className="md:w-1/3">
                            <h2 className="font-display text-3xl md:text-4xl mb-4">Book your next<br /><span className="italic text-[#DE9E36]">appointment</span></h2>
                            <p className="text-gray-400 font-light mb-8">Experience premium beauty treatments tailored just for you.</p>
                            <button className="shrink-0 border border-white px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm tracking-widest uppercase hover:bg-[#DE9E36] hover:text-white active:scale-95 transition" onClick={() => setModalIsOpen((prev) => !prev)}>
                                BOOK NOW
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">Navigation</p>
                            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
                            <Link href="#services" className="text-gray-300 hover:text-white transition">Services</Link>
                            <Link href="/about" className="text-gray-300 hover:text-white transition">About</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-xs tracking-widest text-gray-500 uppercase mb-2">Contact</p>
                            <p className="text-gray-300">@lume.studio</p>
                            <p className="text-gray-300">lume@gmail.com</p>
                            <p className="text-gray-300">+387 65 000 000</p>
                        </div>
                    </div>

                    <p className="flex justify-center items-center text-sm text-gray-500">© 2025 Lumé. All rights reserved.</p>

                </div>
            </footer>
            {modalIsOpen && (
                <BookingModal onClose={() => setModalIsOpen(false)} />
            )}
        </>
    )
}