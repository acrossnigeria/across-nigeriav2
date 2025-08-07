import { useEffect, useState } from "react";
import { PaystackButton } from "react-paystack";
import Pay from "../../public/images/illustration/Pay";


export default function PaystackBtn(props) {
//provide props for amount email key is proc.env.PAYSTACK
    const {amount, email, purpose}=props;
    const [price, setPrice]=useState(0);
    const [localePayment, setLocalePayment]=useState('');
    const liveKey = process.env.NEXT_PUBLIC_PAYSTACK_LIVE;
    const testKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST;

    useEffect(()=>{
      setPrice(parseFloat(amount))
      const locale=price.toLocaleString();
      setLocalePayment(locale)
    }, [amount, price])

    const config = {
      reference: new Date().getTime().toString(),
      email: email,
      amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: liveKey
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

      <div className="absolute transform top-[0px] ease-in-out duration-1000 inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm m-0 bottom-0 h-[100%]">
        <div className="flex flex-col gap-3 bg-gray-100 md:px-2 md:py-20 md:h-fit h-[70%] md:w-fit w-[95%] rounded-[10px] justify-center items-center">
            <div className="w-[fit-content]">
              <Pay/>
            </div>
            <h1 style={{lineHeight:'25px', width:'90%'}} className="text-[20px] text-gray-800  mb-3 text-center">You need to Pay <span className="text-green-600 animate-pulse">&#8358;{localePayment}</span> as {purpose}</h1>
            <div className="bg-green-500 hover:border-l-0 cursor-pointer hover:border-b-0 hover:bg-green-600 border-l-3 border-b-3 border-b-green-800 border-l-green-800 mt-[10px] py-[15px] w-44 rounded-[30px] text-white text-[18px] hover:scale-105 d mx-auto text-center">                   
                <PaystackButton {...componentProps} />                                                 
            </div>
        </div>
      </div>
   
    );
};
