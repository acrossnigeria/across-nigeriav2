import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Calendar = ({ unavailableDates, selectedDate, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

 // Function to check if a date is available
const isDateAvailable = (date) => {
  const today = new Date();
  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
  const dateToCheckString = date.toISOString().split('T')[0];

  return date > today && !unavailableDates.includes(dateToCheckString) && dateToCheckString !== selectedDateString;
};

  // Function to handle date selection
  const handleSelectDate = (date) => {
    if (isDateAvailable(date)) {
      onSelectDate(date);
    }else{toast.error("The selected date is not available")}
  };

  // Function to generate calendar cells
 // Function to generate calendar cells
const generateCalendarCells = () => {
  const today = new Date(currentDate);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const calendarCells = [];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add day labels
  for (let i = 0; i < 7; i++) {
    calendarCells.push(
      <div key={`day-label-${i}`} className="w-12 h-12 flex m-0 items-center justify-center font-semibold">
        {daysOfWeek[i]}
      </div>
    );
  }

  // Add empty cells for the first week
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="w-12 h-12"></div>);
  }
const isSameDay = (date1, date2) => {
  return (
    date1.getDate() <= date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(today.getFullYear(), today.getMonth(), i);
    const isToday = isSameDay(date, new Date()); // Check if it's today's date
    calendarCells.push(
      <div
        key={`day-${i}`}
        className={`w-12 h-12 flex items-center justify-center border border-gray-700 cursor-pointer ${
          isToday||!isDateAvailable(date) ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-slate-100'
        }`}
        onClick={() => handleSelectDate(date)}
      >
        {i}
      </div>
    );
  }

  return calendarCells;
};


  // Function to navigate to the next month
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className=' sm:w-96 mx-auto'>
      <div className="flex justify-between mb-2">
        <button className='border border-green-400 rounded-full p-1' onClick={handlePrevMonth}>Prev Month</button>
       
        <h2 className="text-lg font-semibold">{currentDate.toLocaleString('default', { month: 'long' })}</h2>
        <h2 className="text-lg font-semibold">{currentDate.toLocaleString('default', { year: 'numeric' })}</h2> 
        <button className='border border-green-400 rounded-full p-1'  onClick={handleNextMonth}>Next Month</button>
      </div>
      <div className="mx-auto grid grid-cols-7 gap-1">
        {generateCalendarCells()}
      </div>
    </div>
  );
};

export default Calendar;
