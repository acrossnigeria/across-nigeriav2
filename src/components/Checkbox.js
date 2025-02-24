import Link from 'next/link';
import React, { useState } from 'react'

const Checkbox = ({handleTermsCheckboxChange}) => {
      const [termsAccepted, setTermsAccepted] = useState(false);
      const handleChange=(event)=>{
        const isChecked=event.target.checked;
        handleTermsCheckboxChange(isChecked)
        setTermsAccepted(isChecked)
      }
  return (
    
<div style={{alignItems:'center'}} className="mt-4 flex flex-row gap-3">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={termsAccepted}
            className='accent-green-700 h-[30px] w-[30px]'
            onChange={handleChange}
          />
          <label htmlFor="termsCheckbox">
            Accept our <Link className='text-green-500 underline hover:text-green-300' href="#">Terms and Conditions</Link>
          </label>
        </div>
  )
}

export default Checkbox
