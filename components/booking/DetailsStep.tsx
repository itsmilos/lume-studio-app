"use client"

import { useState } from "react"

interface Props {
    onNext: (data: any) => void
    onBack: () => void
    formData: any
}

const inputClass = "w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition"
const labelClass = "text-xs tracking-widest uppercase text-gray-500 block"
const btnPrimary = "border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white active:scale-95 transition"
const btnSecondary = "border border-gray-300 px-8 py-3 text-sm tracking-widest uppercase hover:bg-gray-100 active:scale-95 transition"

export default function DetailsStep({ onNext, onBack, formData }: Props) {
    const [firstName, setFirstName] = useState(formData.firstName || "");
    const [lastName, setLastName] = useState(formData.lastName || "");
    const [email, setEmail] = useState(formData.email || "");
    const [phone, setPhone] = useState(formData.phone || "");

    const [error, setError] = useState("");

    function handleNext() {
        if (firstName === "" || lastName === "" || email === "" || phone === "") {
            setError("Please write valid credentials.")
            return;
        }
        onNext({ firstName, lastName, email, phone })
    }

    return (
        <div >
            <h2 className="font-display text-3xl mb-8">Credentials</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col gap-1 mb-5">
                <label className={labelClass} htmlFor="firstname">First Name</label>
                <input className={inputClass} type="text" id="firstname" name="firstname" placeholder="Michelle" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className={labelClass} htmlFor="lastname">Last Name</label>
                <input className={inputClass} type="text" id="lastname" name="lastname" placeholder="Anderson" onChange={(e) => setLastName(e.target.value)} value={lastName} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className={labelClass} htmlFor="email">Email</label>
                <input className={inputClass} type="email" id="email" name="email" placeholder="example@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email} />
            </div>
            <div className="flex flex-col gap-1 mb-5">
                <label className={labelClass} htmlFor="phone">Phone</label>
                <input className={inputClass} type="tel" id="phone" name="phone" placeholder="xx xxx xxx" onChange={(e) => setPhone(e.target.value)} value={phone} />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
                <button className={btnSecondary} onClick={onBack}>Back</button>
                <button className={btnPrimary} onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}