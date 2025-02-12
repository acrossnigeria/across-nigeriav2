import React from "react";
import useCountdown from "./hooks/CountDown";

export default function CountDownTimer() {
    const { days, hours, minutes, seconds } = useCountdown('February 22, 2025 00:00:00');

    return (
        <div className="md:text-[28px] text-[20px] text-gray-700">
        <span>{days}{days>1?'Days':'Day'} : </span>
        <span>{hours}h : </span>
        <span>{minutes}m : </span>
        <span>{seconds}s</span>
      </div>
    )
}