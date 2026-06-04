"use client"

interface Props {
    id: string
    currentStatus: string
    booking: any
}

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react";

export default function StatusButton({ id, currentStatus, booking }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(currentStatus);

    function getNextStatus(current: string) {
        if (current === "pending") return "confirmed"
        if (current === "confirmed") return "cancelled"
        return "pending"
    }

    async function updateStatus() {
        const nextStatus = getNextStatus(status);

        setStatus(nextStatus);

        try {
            await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: nextStatus })
            })

            startTransition(() => {
                router.refresh();
            });

        } catch (error) {
            console.error(error);

            setStatus(currentStatus);
        }
    }

    const statusClass = status === 'confirmed'
        ? 'border-green-400 text-green-600'
        : status === 'cancelled'
            ? 'border-red-400 text-red-500'
            : 'border-gray-300 text-gray-500'

    return (
        <button
            className={`active:scale-95 transition text-xs tracking-widest uppercase px-3 py-1 border ${statusClass}`}
            onClick={updateStatus}
            disabled={isPending}
        >
            {isPending ? "Updating" : status}
        </button>
    )
}