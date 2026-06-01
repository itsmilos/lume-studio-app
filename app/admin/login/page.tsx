"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {

    async function handleLogin(e: any) {
        e.preventDefault();
        await signIn("credentials", {
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: '/admin'
        })
    }

    const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
    const labelClass = "text-xs tracking-widest uppercase text-gray-500 mb-1 block"

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-sm px-10">
                <h1 className="font-display text-3xl uppercase mb-2">Admin Login</h1>
                <p className="text-sm text-gray-400 mb-8 tracking-widest">Lumé Studio</p>
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    <div>
                        <label className={labelClass} htmlFor="email">Email</label>
                        <input className={inputClass} name="email" id="email" type="email" placeholder="admin@admin.com" />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="password">Password</label>
                        <input className={inputClass} type="password" name="password" id="password" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}