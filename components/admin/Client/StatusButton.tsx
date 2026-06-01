"use client"

interface Props {
    id: string
    currentStatus: string
    booking: any
}

import { useRouter } from "next/navigation"

export default function StatusButton({ id, currentStatus, booking }: Props) {
    const router = useRouter();

    function getNextStatus(current: string) {
        if (current === "pending") return "confirmed"
        if (current === "confirmed") return "cancelled"
        return "pending"
    }

    async function updateStatus(id: string, nextStatus: string) {
        try {
            await fetch(`http://localhost:3000/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            })
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    }

    const statusClass = booking.status === 'confirmed'
        ? 'border-green-400 text-green-600'
        : booking.status === 'cancelled'
            ? 'border-red-400 text-red-500'
            : 'border-gray-300 text-gray-500'

    return (
        <button
            className={`active:scale-95 transition text-xs tracking-widest uppercase px-3 py-1 border ${statusClass}`}
            onClick={() => updateStatus(id, getNextStatus(currentStatus))}
        >
            {currentStatus}
        </button>
    )
}