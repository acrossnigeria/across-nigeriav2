import Link from 'next/link';
import React, { useState } from 'react'

const Checkbox = ( { handleTermsCheckboxChange } ) => {
      const [ termsAccepted, setTermsAccepted ] = useState(false);
      const handleChange=(event)=>{
        const isChecked = event.target.checked;
        handleTermsCheckboxChange(isChecked);
        setTermsAccepted(isChecked);
      }
  return (
    
<div style={{alignItems:'center'}} className="mt-4 flex flex-row gap-3">
          <input
            type="checkbox"
            id="termsCheckbox"
            checked={termsAccepted}
            className='accent-green-600 h-[25px] hover:cursor-pointer w-[25px] border-gray-300'
            onChange={handleChange}
          />
          <label htmlFor="termsCheckbox" className='text-gray-500 text-[16px]'>
            Accept our <Link className='text-black underline hover:italic' href="#">Terms and Conditions</Link>
          </label>
        </div>
  )
}

export default Checkbox
