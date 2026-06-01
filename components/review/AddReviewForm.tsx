"use client"

interface Service {
    _id: string,
    title: string
}

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const btnPrimary = "bg-[#DE9E36] text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-[#c48a2a] active:scale-95 transition"

export default function AddReviewForm() {
    const router = useRouter();

    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", text: "", service: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [services, setServices] = useState<Service[]>([]);

    async function addReview(e: any) {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.text || !form.service) {
            setError("Please fill in all required fields.");
            return;
        }
        await fetch("/api/reviews", {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(form)
        })
        setSuccess(true);
        router.refresh();
    }

    useEffect(() => {
        async function servicesFetch() {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
            setForm(prev => ({ ...prev, service: data[0]._id }))
        }
        servicesFetch();
    }, [])

    const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
    const labelClass = "text-xs tracking-widest uppercase text-gray-500 mb-1 block"

    return (
        <form onSubmit={addReview} className="flex flex-col gap-6 max-w-xl p-10">
            {success && <p className="text-green-600 tracking-widest text-sm uppercase">Service successfully added!</p>}
            <div>
                <label className={labelClass} htmlFor="firstName">First Name</label>
                <input id="firstName" name="firstName" type="text" placeholder="e.g. Sophia" className={inputClass} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="lastName">Last Name</label>
                <input id="lastName" name="lastName" type="text" placeholder="e.g. Williams" className={inputClass} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="email">Email</label>
                <input id="email" name="email" type="text" placeholder="e.g. sophia@gmail.com" className={inputClass} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="text">Text</label>
                <textarea id="text" name="text" placeholder="Share your experience..." rows={3} className={inputClass} onChange={(e) => setForm({ ...form, text: e.target.value })} />
            </div>
            <div>
                <label className={labelClass} htmlFor="text">Service</label>
                <select className={inputClass} onChange={(e) => setForm({ ...form, service: e.target.value })} >{services.map((service) => <option key={service._id} value={service._id}>{service.title}</option>)}</select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className={btnPrimary}>
                Share Your Experience
            </button>
        </form>
    )

}