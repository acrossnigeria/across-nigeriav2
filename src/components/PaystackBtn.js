import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import Pay from "../../public/images/illustration/Pay";

export default function PaystackBtn(props) {
//provide props for amount email key is proc.env.PAYSTACK
    const {amount, email, paystackKey, purpose}=props;
    const [price, setPrice]=useState(0);
    const [localePayment, setLocalePayment]=useState('');
    useEffect(()=>{
    setPrice(parseFloat(amount))
    const locale=price.toLocaleString();
    setLocalePayment(locale)
    }, [amount, price])
    
   const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.PAYSTACK_LIVE,
  };
  const handlePaystackSuccessAction = async (ref) => {
    props.pay(ref);
        // Implementation for whatever you want to do with reference and after success call.
   
  };
const handlePaystackCloseAction = () => {
    alert("The transaction was not completed");
    console.log("closed");
  };
const componentProps = {
    ...config,
    text: "Click to Pay",
    onSuccess: (ref) => handlePaystackSuccessAction(ref),
    onClose: handlePaystackCloseAction,
  };
   
  
    return (

       
<div className="absolute transform top-[0px] ease-in-out duration-1000 inset-0 flex flex-col items-center justify-center  bg-white m-0 bottom-0 h-[100%]">
      <div className="w-[fit-content]">
        <Pay/>
      </div>
      <h1 style={{lineHeight:'25px'}} className="text-[23px] px-3 text-gray-800 font-bold mb-4 text-center">You need to Pay <span className="text-green-600 animate-pulse">&#8358;{localePayment}</span> as {purpose}</h1>
      <div className="border-green-700 border-3 mt-[10px] py-2 w-40 rounded-[5px] bg-transparent text-green-700 text-[18px] hover:scale-105 font-extrabold hover:bg-green-700 hover:text-white mx-auto text-center">                   
          <PaystackButton {...componentProps} />                                                 
      </div>
   </div>
   
    );
};
