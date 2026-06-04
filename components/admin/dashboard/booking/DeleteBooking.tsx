"use client"

import { useRouter } from "next/navigation"

interface Props {
    id: string,
    onDelete: any
}

export default function DeleteBookingButton({ id, onDelete }: Props) {
    const router = useRouter();

    async function handleDelete(id: string) {
        try {
            await fetch(`/api/bookings/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            })

            onDelete();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={() => handleDelete(id)} className="border border-red-300 text-red-400 px-4 py-2 text-xs tracking-widest uppercase hover:bg-red-50 active:scale-95 transition">
            Delete
        </button>
    )
}