"use client"

import { useState } from "react"
import ServiceStep from "./ServiceStep"
import TimeStep from "./TimeStep"
import DetailsStep from "./DetailsStep"
import ConfirmStep from "./ConfirmStep"

type FormData = {
    serviceId: string | null
    serviceTitle: string
    duration: number
    start: Date | null
    firstName: string
    lastName: string
    email: string
    phone: string
    status: string
}

export default function StepWrapper() {
    const [step, setStep] = useState<number>(1)
    const [formData, setFormData] = useState<FormData>({
        serviceId: null,
        serviceTitle: "",
        duration: 0,
        start: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "pending"
    })

    function handleNext(data: Partial<FormData>) {
        setFormData(prev => ({ ...prev, ...data }))
        setStep(prev => prev + 1)
    }

    function handleBack() {
        setStep(prev => prev - 1)
    }

    function renderStep() {
        if (step === 1) return <ServiceStep onNext={handleNext} formData={formData} />
        if (step === 2) return formData.serviceId
            ? <TimeStep formData={formData} onNext={handleNext} onBack={handleBack} />
            : null
        if (step === 3) return formData.start
            ? <DetailsStep formData={formData} onNext={handleNext} onBack={handleBack} />
            : null
        if (step === 4) return <ConfirmStep onNext={handleNext} onBack={handleBack} formData={formData} />
        return null
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex gap-2 mb-8">
                {[1, 2, 3, 4, 5].map(s => (
                    <div key={s} className={`h-1 flex-1 transition ${step >= s ? "bg-black" : "bg-gray-200"}`} />
                ))}
            </div>
            <div className="flex-1">
                {renderStep()}
            </div>
        </div>
    )
}