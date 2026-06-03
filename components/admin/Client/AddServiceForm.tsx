"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"

export default function AddServiceForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "", price: "", duration: "", description: "", category: "", image: ""
    })

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function addService(e: any) {
        e.preventDefault();
        if (!form.title || !form.price || !form.duration || !form.category || !form.image) {
            setError('Please fill in all required fields.');
            return;
        }
        await fetch("/api/services", {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(form)
        })
        setSuccess(true);
        router.refresh();
    }

    const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
    const labelClass = "text-xs tracking-widest uppercase text-gray-500 mb-1 block"
    const btnPrimary = "bg-[#DE9E36] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#c48a2a] active:scale-95 transition"

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={addService}
            className="flex flex-col gap-6 max-w-xl p-10"
        >
            <AnimatePresence>
                {success && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-green-600 tracking-widest text-sm uppercase"
                    >
                        Service successfully added!
                    </motion.p>
                )}
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-red-500"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
            <div>
                <label className={labelClass} htmlFor="title">Service Title</label>
                <input className={inputClass} id="title" type="text" placeholder="e.g. Facial Treatment" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className={labelClass} htmlFor="price">Price ($)</label>
                    <input className={inputClass} id="price" type="number" placeholder="e.g. 45" onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div className="flex-1">
                    <label className={labelClass} htmlFor="duration">Duration (min)</label>
                    <input className={inputClass} id="duration" type="number" placeholder="e.g. 60" onChange={(e) => setForm({ ...form, duration: e.target.value })} />
                </div>
            </div>
            <div>
                <label className={labelClass} htmlFor="category">Category</label>
                <input className={inputClass} id="category" type="text" placeholder="e.g. Skincare" onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="description">Description</label>
                <textarea className={inputClass} id="description" placeholder="e.g. Classic deep-cleansing facial..." rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="image">Image URL</label>
                <input className={inputClass} id="image" placeholder="www.example.com" onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <button type="submit" className={btnPrimary}>
                Add Service
            </button>
        </motion.form>
    )
}