
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import PaystackBtn from '@/components/PaystackBtn';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Close from '../../../public/images/icon/Close';
import CycleLoader from '@/components/CycleLoader';


function Confirmbooking() {
  const { data: session } = useSession();
  const [ payment, setPayment ] = useState(0);
  const router=useRouter();
  const [ dateData, setDateData ] = useState()
  const [ category, setCategory ] = useState();
  const [ displayName, setDisplayName ] = useState();
  const [ shoutOut, setShoutOut ] = useState('');
  const [ bookingId, setBookingId ] = useState('');
  const [ processing, setProcessing ] = useState(false);
  const [ processingMessage, setProcessingMessage ] = useState('Setting up booking...');

  useEffect(()=>{
    const selectedDate = localStorage.getItem('selectedDate')
    const amount = localStorage.getItem("amount")
    const dataUrl = localStorage.getItem("dataUrl")
    const selectedCategory = localStorage.getItem("category")
    const displayName = localStorage.getItem("displayName")
    const shoutout = localStorage.getItem("shoutout")
    const bookingid = localStorage.getItem('bookingId');

    if(selectedDate&&amount){

     setDateData(selectedDate);
     setPayment(amount);
     setCategory(selectedCategory);
     setDisplayName(displayName);
     setShoutOut(shoutout);
     setBookingId(bookingid);

     console.log(new Date(selectedDate))
   
    } else{
        console.error('Selected date not found in localStorage')
    }
  },[]);

  const dateHandler= async()=>{
    setProcessing(true);
    await axios.patch('/api/booking/booking', {dateSelected:dateData,category:category, name:displayName, bookingId:bookingId, shoutOut:shoutOut});
    setProcessingMessage('loading...');
    router.push('/shoutout/bookingSuccess');
  }

  const formatPayment=parseFloat(payment);
  const localePayment=formatPayment.toLocaleString();

  return (
    <Layout>
          <div className={`${processing?'':'hidden'} fixed h-screen w-screen inset-0 z-[2000] flex items-center flex-col justify-center bg-gradient-to-br from-gray-100 to-white`} ><CycleLoader/><span className='text-[12px] mt-[15px]'>{processingMessage}</span></div>
          <div className={`${processing?'hidden':''} fixed h-screen w-screen inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-50`}>
            <button className=" absolute right-7 p-2 rounded-[50%]  top-7 z-50 hover:bg-gray-200" onClick={()=>(router.push('/shoutout/booking'))}><Close/></button>
            <PaystackBtn pay={dateHandler} amount={payment} email={session?.user.email} purpose={`Booking for a Shout-Out ${category==='general'?'Lottery':'Premium'} Edition`}/>
          </div>
    </Layout>
  )
}

export default Confirmbooking
