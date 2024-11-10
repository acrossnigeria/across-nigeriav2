import React from 'react'; 
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../utils/Store';
import Cookies from 'js-cookie';

const Confirm = () => {
  const { state, dispatch } = useContext(Store);
  const {user:{userDetails},}= state;
  const router=useRouter();
  const name=userDetails[0]?.name?? 'Unknown';
  const surname=userDetails[0]?.surname?? 'Unknown';
  const dob=userDetails[0]?.dob?? 'Unknown';
  const email=userDetails[0]?.email?? 'Unknown';
  const gender=userDetails[0]?.gender?? 'Unknown';
  const phone=userDetails[0]?.phone?? 'Unknown';
  const residence=userDetails[0]?.residence?? 'Unknown';


  return (
    <div className="max-w-md lg:mx-auto ml-4">
      <h1 className="text-2xl font-bold mb-4 underline mt-4">Confirm Details</h1>
    <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Name: </span>{name}</p>
  <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Surname: </span>{surname}</p>
    <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Date of Birth: </span>{dob}</p>
     <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Email: </span>{email}</p>
      <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Phone Number: </span>{phone}</p>
      <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Residence: </span>{residence}</p> 
      <p className='mb4 p-3 text-lg font-semibold'><span className='pr-2 font-bold'>Gender: </span>{gender}</p>
      
      <p className='mb-16 font-semibold ml-4 lg:text-left text-large'>Please verify your details above.</p>
     <div className='w-36 ml-4 mb-8 cursor-pointer flex 
font-serif bg-green-500  rounded items-center opacity-85
justify-center font-bold hover:bg-gray-800 py-2 px-1 outline-none
hover:text-gray-200 text-center shadow-slate-900 shadow-lg' onClick={()=>(router.push('/reg'))}> Back to edit</div> 
     <div className='w-36 ml-4 mb-8 cursor-pointer flex 
font-serif bg-green-500  rounded items-center opacity-85
justify-center font-bold hover:bg-gray-800 py-2 px-1 outline-none
hover:text-gray-200 text-center shadow-slate-900 shadow-lg' onClick={()=>(router.push('/paystack'))}>Proceed to Pay</div> 
      
    </div>
  );
};

export default Confirm;
