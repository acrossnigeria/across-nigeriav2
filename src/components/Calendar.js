import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Next from '../../public/images/icon/Next';

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
    } else {

      toast.error("The selected date is not available")
    }
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
      <div key={`day-label-${i}`} className="w-[45px] h-[45px] flex text-[15px] m-0 text-gray-700 items-center justify-center font-semibold">
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
      <div key={`day-${i}`} className={`w-[40px] rounded-[2px] h-[40px] font-bold flex items-center text-white justify-center cursor-pointer ${
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
    <div className=' sm:w-96 mx-auto rounded-[20px] border-1 border-gray-400 bg-gray-100 p-3'>
      <div className="flex justify-between mb-2">
        <button className='rounded-[50%] transition-background ease-in-out duration-100 hover:bg-gray-400 p-1 rotate-180' onClick={handlePrevMonth}><Next/></button>
        <span className="text-[22px] font-light">{`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.toLocaleString('default', { year: 'numeric' })}`}</span>
        <button className='transition-background ease-in-out duration-100 rounded-[50%] hover:bg-gray-400 p-1'  onClick={handleNextMonth}><Next/></button>
      </div>
      <div className="w-[100%] grid grid-cols-7 gap-1">
        {generateCalendarCells()}
      </div>
    </div>

  );
};

export default Calendar;
