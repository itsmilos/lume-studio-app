"use client"

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"
import BookingModal from "../booking/BookingModal";

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <nav className="flex items-center justify-between px-8 py-4 fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90">
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="font-display font-semibold text-2xl text-[#DE9E36]">Lumé</h1>
                </div>
                <button onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? <X /> : <Menu />}
                </button>
                {isOpen && (
                    <div className="absolute top-full left-0 w-full backdrop-blur-md bg-white/90 flex flex-col p-5">
                        <Link className="py-3" href="/">Home</Link>
                        <Link className="py-3" href="/#services">Services</Link>
                        <Link className="py-3" href="/about">About</Link>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <button className="shrink-0 border border-black px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm tracking-widest uppercase hover:bg-black hover:text-white active:scale-95 transition" onClick={() => setModalIsOpen((prev) => !prev)}>
                        BOOK NOW
                    </button>
                </div>
            </nav>
            {modalIsOpen && (
                <BookingModal onClose={() => setModalIsOpen(false)} />
            )}
        </>
    )
}