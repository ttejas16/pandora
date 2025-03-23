import { CalendarDays } from "lucide-react";
import { useRef, useState } from "react";

function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); 
    return tomorrow.toISOString().split("T")[0];
};

export default function DatePickerButton({ onDateChange, currentDate }) {
    const dateInputRef = useRef(null);

    const handleDateClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker(); // Opens the native date picker
        }
    };

    return (
        <div className="flex">
            <input
                min={getTomorrowDate()}
                required
                type="date"
                ref={dateInputRef}
                className="absolute opacity-0 pointer-events-none"
                onChange={(e) => onDateChange(e.target.value)}
            />
            <button
                title={currentDate == null ? null : currentDate}
                onClick={handleDateClick}
                type="button"
                className="text-sky-600 relative">
                <div className={`w-2 h-2 rounded-full absolute -right-[2px] ${currentDate ? "bg-lime-400" : "bg-amber-400"}`}></div>
                <CalendarDays />
            </button>
        </div>
    );
}
