"use client"

import { useState } from "react"

interface Props {
    onNext: (data: any) => void
    onBack: () => void
    formData: any
}

const labelClass = "text-xs tracking-widest uppercase text-gray-400 mb-1 block"
const valueClass = "text-sm font-medium mb-5"
const btnPrimary = "bg-[#DE9E36] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#c48a2a] active:scale-95 transition"
const btnSecondary = "border border-gray-300 px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 active:scale-95 transition"

export default function ConfirmStep({ onBack, formData }: Props) {
    const [confirmed, setConfirmed] = useState(false);

    async function confirmBooking() {
        try {
            await fetch("/api/bookings", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    service: formData.serviceId,
                    start: formData.start,
                    email: formData.email,
                    phone: formData.phone
                })
            })
            setConfirmed(true);
        } catch (error) {
            console.error(error);
        }
    }

    if (confirmed) return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <h1 className="font-display text-4xl">Booking Confirmed!</h1>
            <p className="text-gray-500">Thank you, {formData.firstName}! Your appointment has been booked.</p>
        </div>
    )

    return (
        <div className="flex flex-col h-full">
            <h2 className="font-display text-2xl mb-8">Review Your Booking</h2>
            <div className="flex-1">
                <div>
                    <span className={labelClass}>Service</span>
                    <span className={valueClass}>{formData.serviceTitle}</span>
                </div>
                <div>
                    <span className={labelClass}>Date & Time</span>
                    <span className={valueClass}>{new Date(formData.start).toLocaleString()}</span>
                </div>
                <div>
                    <span className={labelClass}>Name</span>
                    <span className={valueClass}>{formData.firstName} {formData.lastName}</span>
                </div>
                <div>
                    <span className={labelClass}>Email</span>
                    <span className={valueClass}>{formData.email}</span>
                </div>
                <div>
                    <span className={labelClass}>Phone</span>
                    <span className={valueClass}>{formData.phone}</span>
                </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <button onClick={onBack} className={btnSecondary}>Back</button>
                <button onClick={confirmBooking} className={btnPrimary}>Confirm</button>
            </div>
        </div>
    )
}