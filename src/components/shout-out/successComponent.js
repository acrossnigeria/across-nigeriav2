import Layout from "@/components/Layout";
import ShoutOutSuccess from "../../../public/images/illustration/ShoutOutSuccess";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SuccessComponent = () => {

    const [ bookingId, setBookingId ] = useState('');
    const [ bookingMessage, setBookingMessage ] = useState('');
    const router = useRouter();
    
    useEffect( () => {
        const shoutout = localStorage.getItem("shoutout");
        const bookingid = localStorage.getItem('bookingId');

        setBookingId(bookingid);
        setBookingMessage(shoutout);

        if ( !shoutout || !bookingid ) {
            router.push('/');
        }
    })

    
    return (
            <div className="flex flex-col justify-start pt-[25px] items-center h-[630px]">
                <ShoutOutSuccess/>
                <div className="flex flex-col md:w-[500px] w-[90%]">
                   <span style={{lineHeight:'25px'}} className="text-center text-[22px] font-bold text-green-700 animate-pulse"><strong>Congratulations! Your Shout-Out Is Officially Booked!</strong></span>
                   <span className="text-center text-gray-700">Your shout-out will shine on our homepage and catch everyone&apos;s attention! Get ready to make an unforgettable impact.</span>
                   <span className="text-[20px] text-green-700 font-bold mt-[20px]">What&apos;s Next? </span>
                   <span className="text-gray-700">Your shout-out will be live soon. Stay tuned and watch it light up the homepage</span>
                   <div className="bg-gray-100 mt-[7px] py-4 px-2 flex flex-col">
                        <span className="font-bold text-[17px] mb-[5px] text-gray-700">Details of Your Booking</span>
                        <span><strong>Booking Id: </strong>{bookingId}</span>
                        <span><strong>Booking Message: </strong>{bookingMessage}</span>
                   </div>
                   <span className="mt-[30px] text-center">Want to book another shout-out? <Link className="text-green-500" href={'/shoutout/booking'}>Click here.</Link></span>
                   <span className="mt-[20px] text-[13px] p-3 border-y-1 border-green-300">If you have any questions or need support, feel free to contact us at any of our social media handles</span>

                </div>
            </div>        
   
    )
}

export default SuccessComponent;