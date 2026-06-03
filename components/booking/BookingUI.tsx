"use client";

import { Slot } from "@/types/slot";
import { useEffect, useState } from "react";

interface Props {
    serviceId: string;
    onSelect: (slot: Slot) => void;
    selected: Slot | null;
    onDateChange: (date: string) => void;
    defaultDate?: string;
}

export default function BookingUI({ serviceId, onSelect, selected, onDateChange, defaultDate }: Props) {
    type Slot = { start: string; end: string; available: boolean; };

    const [date, setDate] = useState(defaultDate || "");
    const [slots, setSlots] = useState<Slot[]>([]);

    useEffect(() => {
        if (!serviceId) return;
        fetch(`/api/availability?date=${date || "2026-01-01"}&serviceId=${serviceId}`)
            .then(res => res.json())
            .then(data => setSlots(data));
    }, [date, serviceId]);

    const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
    const labelClass = "text-xs tracking-widest uppercase text-gray-500 mb-2 block"

    const slotClass = (slot: Slot) =>
        `py-2 px-2 border text-xs active:scale-95 transition ${selected?.start === slot.start ? "bg-black text-white border-black" : ""} ${!slot.available ? "bg-red-50 border-red-200 text-red-300 cursor-not-allowed" : "border-gray-200 hover:border-black"}`

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <label className={labelClass}>Select Date</label>
                <input
                    defaultValue={defaultDate}
                    type="date"
                    className={inputClass}
                    onChange={(e) => { setDate(e.target.value); onDateChange(e.target.value); }}
                />
            </div>
            <div>
                <label className={labelClass}>Available Times</label>
                <div className="grid grid-cols-4 gap-1 h-48 overflow-y-auto content-start">
                    {slots.map((slot, i) => (
                        <button
                            type="button"
                            disabled={!slot.available}
                            key={i}
                            onClick={() => onSelect(slot)}
                            className={slotClass(slot)}
                        >
                            {slot.start.slice(11, 16)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}