import React from "react";
import { useEffect, useState } from "react";


const  CountDownTimer = () => {

    const useCountdown = ( targetDate ) => {
        const calcTimeLeft = () => {
          const now = new Date();
          const target = new Date(targetDate);
          target.getFullYear(now.getFullYear()); //keeps the countdown for the current year
      
          if (target<now) {
            target.getFullYear(now.getFullYear()+1)// move to the next year if the date has passed
          }
      
          const difference = target - now;
      
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          }
        }
      
        const [ timeLeft, setTimeLeft ] = useState(calcTimeLeft());
      
        useEffect(()=> {
          const timer = setInterval(() => {
            setTimeLeft(calcTimeLeft);
          }, 1000);
      
          return () => clearInterval(timer);
        }, [])
      
        return timeLeft;
      }

    const { days, hours, minutes, seconds } = useCountdown('May 22, 2025 00:00:00');
    

    return (
        <div className="md:text-[28px] text-[20px] text-gray-700">
        <span>{days}{days>1?'Days':'Day'} : </span>
        <span>{hours}h : </span>
        <span>{minutes}m : </span>
        <span>{seconds}s</span>
      </div>
    )
}

export default CountDownTimer;