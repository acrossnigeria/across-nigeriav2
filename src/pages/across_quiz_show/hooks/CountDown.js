import { useState, useEffect } from "react";

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
      }, 100);
  
      return () => clearInterval(timer);
    }, [])
  
    return timeLeft;
  }

  export default useCountdown;