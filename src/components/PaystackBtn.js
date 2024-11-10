import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";

export default function PaystackBtn(props) {
//provide props for amount email key is proc.env.PAYSTACK
    const {amount, email,paystackKey, purpose}=props;
    const [price, setPrice]=useState(0)
    const [localePayment, setLocalePayment]=useState('')
    useEffect(()=>{
    setPrice(parseFloat(amount))
    const locale=price.toLocaleString();
    setLocalePayment(locale)
    }, [amount, price])
  
   const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_live_09ba874adcdca43ec856e37e480ec1e17dc13eda",
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

       
<div className="absolute transform ease-in-out duration-1000 
inset-0 p-6  bg-white m-auto bottom-0 h-screen">
 
      <h1 className="text-3xl mt-56 font-bold mb-4 text-center">You need to Pay &#8358;{localePayment} as {purpose}</h1>
    <div className="border-yellow-500 border h-14 py-4 w-40 rounded-lg bg-green-700 text-white text-xl
     font-semibold italic mx-auto text-center">
                           
                              <PaystackButton {...componentProps} />
                          
                                                       
        </div>
   </div>
   
    );
};
