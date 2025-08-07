import React, { useEffect, useState } from 'react';

const DateInputComponent = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const handleDayChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 2 characters
    if (/^\d{0,2}$/.test(value)) {
      setDay(value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and limit to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
    }
  };
useEffect(()=>{
  const formatEnteredDate = () => {
    // Ensure all parts of the date are entered
    if (day && month && year) {
      // Format the date as YYYY-MM-DD
      setFormattedDate(`${year}-${month}-${day.padStart(2, '0')}`);
    }
  };
  formatEnteredDate();
},[day,month, year])
  return (
      <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <input
          type="text"
          value={day}
          onChange={handleDayChange}
          placeholder="Day (DD)"
          className="col-span-1 border w-16 p-2"
        /><span className='text-4xl'>/</span>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
       className="block appearance-none bg-white border w-32 border-green-300 hover:border-green-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"

        >
          <option value="">--Select Month--</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select><span>/</span>
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="Year (YYYY)"
          className="col-span-1 border w-20 p-2"
        />
      </div>
           {formattedDate && <p>Formatted Date: {formattedDate}</p>}
    </div>
  );
};

export default DateInputComponent;
