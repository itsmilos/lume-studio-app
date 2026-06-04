"use client"

interface Props {
    bookings: any
    services: any
}

import { useState } from "react"

export default function AdminTabs({ bookings, services }: Props) {
    const [activeTab, setActiveTab] = useState("bookings");

    const tabClass = (tab: string) =>
        `px-6 py-2 text-xs tracking-widest uppercase active:scale-95 transition ${activeTab === tab ? "bg-black text-white" : "border border-gray-300 hover:bg-black hover:text-white"}`

    return (
        <div>
            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => setActiveTab("bookings")}
                    className={tabClass('bookings')}
                >
                    Bookings
                </button>
                <button
                    onClick={() => setActiveTab("services")}
                    className={tabClass('services')}
                >
                    Services
                </button>
            </div>
            <div className={activeTab === 'bookings' ? 'block' : 'hidden'}>
                {bookings}
            </div>
            <div className={activeTab === 'services' ? 'block' : 'hidden'}>
                {services}
            </div>
        </div>
    )
}