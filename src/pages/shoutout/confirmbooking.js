
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '@/components/Layout'
import PaystackBtn from '@/components/PaystackBtn';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import ShoutOutCard from '@/components/ShoutOutCard';


function Confirmbooking() {
  const { data: session } = useSession();
  const [ loadPay,setLoadPay ] = useState(false);
  const [ payment, setPayment ] = useState(0);
  const router=useRouter();
  const [ dateData, setDateData ] = useState()
  const [ url, setUrl ] = useState();
  const [ category, setCategory ] = useState();
  const [ displayName, setDisplayName ] = useState();
  const [ shoutOut, setShoutOut ] = useState('');
  const [ bookingId, setBookingId ] = useState('');

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
     setUrl(dataUrl);
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
    await axios.patch('/api/booking/booking', {dateSelected:dateData,category:category, name:displayName, bookingId:bookingId, shoutOut:shoutOut});
    alert("Booked successfully click Ok to continue");
    router.push('/shoutout/booking');
  }

  const formatPayment=parseFloat(payment);
  const localePayment=formatPayment.toLocaleString();

  return (
    <Layout>
      <div className=''> 
        <button className="bg-red-300 text-black font-semibold py-2 cursor-pointer px-4  rounded"onClick={()=>(router.back())}>
          Back
        </button>

        <div className='text-center mx-auto'> 
          <button className="bg-yellow-300 text-black font-semibold py-2 cursor-pointer px-4 text-center mx-auto rounded" 
          onClick={()=>(setLoadPay(true))}>
            {/* Pay &#8358;{localePayment} Naira */}Share
          </button>
        </div> 
         {loadPay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-fit h-fit p-2 font-semibold text-lg rounded-md cursor-pointer absolute left-2  top-20 z-50 bg-yellow-700" onClick={()=>(setLoadPay(false))}>Close</div>
            <PaystackBtn pay={dateHandler} amount={payment} email={session?.user.email} purpose={`Booking for a Shout-Out ${category==='general'?'Lottery':'Premium'} Edition`}/>
          </div>
          )}
      </div>
    </Layout>
  )
}

export default Confirmbooking
