"use client"

import { Slot } from "@/types/slot";

import { useState } from "react"
import BookingUI from "./BookingUI"

interface Props {
    onNext: (data: any) => void
    onBack: () => void
    formData: any
}

const btnPrimary = "border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white active:scale-95 transition"
const btnSecondary = "border border-gray-300 px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 active:scale-95 transition"

export default function TimeStep({ onNext, onBack, formData }: Props) {
    const [selected, setSelected] = useState<Slot | null>(formData.start ? { start: formData.start, end: formData.end, available: true } : null);
    const [error, setError] = useState("");

    const [date, setDate] = useState("");

    function handleNext() {
        if (!selected) {
            setError("Please select a time slot.")
            return;
        }
        onNext({ start: selected?.start, end: selected?.end, date: date })
    }

    return (
        <div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <BookingUI defaultDate={formData.date} onDateChange={(date) => setDate(date)} selected={selected} serviceId={formData.serviceId} onSelect={(slot: any) => setSelected(slot)} />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <button className={btnSecondary} onClick={onBack}>Back</button>
                <button className={btnPrimary} onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}