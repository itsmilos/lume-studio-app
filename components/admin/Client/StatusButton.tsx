"use client"

interface Props {
    id: string
    currentStatus: string
}

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function StatusButton({ id, currentStatus }: Props) {
    const router = useRouter();
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    function getNextStatus(current: string) {
        if (current === "pending") return "confirmed"
        if (current === "confirmed") return "cancelled"
        return "pending"
    }

    async function updateStatus() {
        const nextStatus = getNextStatus(status);

        setStatus(nextStatus);
        setLoading(true);

        try {
            await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            });

            router.refresh();

        } catch (error) {
            console.error(error);
            setStatus(currentStatus);
        } finally {
            setLoading(false);
        }
    }

    const statusClass = status === 'confirmed'
        ? 'border-green-400 text-green-600'
        : status === 'cancelled'
            ? 'border-red-400 text-red-500'
            : 'border-gray-300 text-gray-500'

    return (
        <button
            className={`active:scale-95 transition text-xs uppercase px-3 py-1 border ${statusClass} ${loading ? "opacity-60" : ""}`}
            onClick={updateStatus}
            disabled={loading}
        >
            {status}
        </button>
    )
}