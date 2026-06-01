"use client"

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button onClick={() => signOut()} className="active:scale-95 transition border border-gray-300 px-6 py-3 hover:bg-black hover:text-white tracking-widest text-sm uppercase w-fit">
            Logout
        </button>
    )
}