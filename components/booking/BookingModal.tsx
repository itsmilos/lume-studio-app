"use client"

import { X } from "lucide-react";
import StepWrapper from "./StepWrapper";

export default function BookingModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-10 max-w-2xl w-full relative h-[700px]">
                <div className="absolute top-4 right-4">
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>
                <StepWrapper />
            </div>
        </div>
    );
}