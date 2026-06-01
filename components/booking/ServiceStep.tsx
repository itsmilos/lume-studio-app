"use client"

import { useEffect, useState } from "react"

interface Props {
    onNext: (data: any) => void
    formData: any
}

interface Service {
    _id: string
    title: string
    price: number
    duration: number
}

const btnPrimary = "border border-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white active:scale-95 transition"

export default function ServiceStep({ onNext, formData }: Props) {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState(formData.serviceId || "");

    useEffect(() => {
        async function fetchServices() {
            const res = await fetch("/api/services");
            const data = await res.json();
            setServices(data);
        }
        fetchServices()
    }, [])

    const selected = services.find(s => s._id === selectedService);

    const [error, setError] = useState("");

    function handleNext() {
        if (selectedService === "") {
            setError("Please select a service.")
            return;
        }
        onNext({ service: selectedService, serviceTitle: selected?.title, duration: selected?.duration, serviceId: selectedService, });
    }

    return (
        <div>
            <h2 className="font-display text-2xl mb-4">Select a Service</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="grid grid-cols-2 gap-2 mb-4">
                {services.map((service) => (
                    <div
                        key={service._id}
                        onClick={() => setSelectedService(service._id)}
                        className={`active:scale-95 transition p-6 cursor-pointer border ${selectedService === service._id ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-400"}`}
                    >
                        <h3 className="font-semibold text-lg">{service.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{service.duration} min</p>
                        <p className="text-[#DE9E36] font-semibold mt-2">${service.price}</p>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-6 right-6 flex">
                <button onClick={handleNext} className={btnPrimary}>
                    Next
                </button>
            </div>
        </div>
    )
}