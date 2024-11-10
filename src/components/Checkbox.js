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
    
<div className="mt-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={termsAccepted}
            className='accent-green-700'
            onChange={handleChange}
          />
          <label htmlFor="termsCheckbox" className="ml-2">
            Accept our <Link className='text-green-800 hover:text-green-300' href="#">Terms and Conditions</Link>
          </label>
        </div>
  )
}

export default Checkbox
