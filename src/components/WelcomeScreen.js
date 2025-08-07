import Link from 'next/link'
import React, { useState } from 'react'
import Checkbox from './Checkbox';
function WelcomeScreen(props) {
    const[terms, setTerms]=useState(false)
  const [isTerms, setIsTerms]=useState(false);

    const handleCheckBox=(isChecked)=>{
setIsTerms(isChecked)
    }
  return (

     <div className={`fixed ${terms?"hidden":"grid col-span-1"} h-screen top-20 inset-0 z-50  pt-24 text-gray-300 px-20 bg-black bg-opacity-100`}>
                 <Link href="/" className="w-fit h-fit p-2 font-semibold text-lg 
                 rounded-md text-black cursor-pointer absolute left-2 top-1 z-50 bg-yellow-700" 
                >Close</Link >
              <p className='flex'>Welcome to {props.title}</p>  
                
                <button className="relative  mx-auto flex w-fit h-fit p-2 font-semibold text-lg 
                 rounded-md text-gray-300 cursor-pointer 
                  bg-yellow-700" onClick={()=>(setTerms(!terms))}>Accept Our Terms</button>
                  <Checkbox handleTermsCheckboxChange={handleCheckBox}/>
                
                   </div>
        )
}

export default WelcomeScreen