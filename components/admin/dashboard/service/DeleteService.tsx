"use client"

import { useRouter } from "next/navigation"

interface Props {
    id: string
}

export default function DeleteServiceButton({ id }: Props) {
    const router = useRouter();

    async function handleDelete(id: string) {
        try {
            await fetch(`/api/services/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            })
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={() => handleDelete(id)} className="active:scale-95 transition border border-red-300 text-red-400 px-4 py-2 text-xs tracking-widest uppercase hover:bg-red-50">
            Delete
        </button>
    )

}