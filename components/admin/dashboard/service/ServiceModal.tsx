"use client"

import { useState } from "react";
import AddServiceForm from "./dashboard/service/AddServiceForm";
import { X } from "lucide-react";

export default function ServiceModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="active:scale-95 transition border border-black px-6 py-3 hover:bg-black hover:text-white tracking-widest text-sm uppercase w-fit">New Service</button>
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-10 max-w-xl w-full relative">
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4">
                            <X />
                        </button>
                        <AddServiceForm />
                    </div>
                </div>
            )}
        </>
    )
}