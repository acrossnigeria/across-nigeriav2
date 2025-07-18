import { PaystackButton } from "react-paystack";
import { useRouter } from "next/router";


export default function PaystackClick({ amount, email, buttonText, callBack }) {

    const liveKey = process.env.NEXT_PUBLIC_PAYSTACK_LIVE;
    const testKey = process.env.NEXT_PUBLIC_PAYSTACK_TEST;

    const config = {
      reference: new Date().getTime().toString(),
      email: email,
      amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
      publicKey: testKey
    };

    const handlePaystackSuccessAction = async (ref) => {
        // success call and redirect.
        callBack(ref);
    };

    const handlePaystackCloseAction = () => {
        alert("The transaction was not completed");
        console.log("closed");
    };

    const componentProps = {
        ...config,
        text: buttonText,
        onSuccess: (ref) => handlePaystackSuccessAction(ref),
        onClose: handlePaystackCloseAction,
    };
   
  
    return (
        <div className="bg-green-500 cursor-pointer transition-all duration-300 ease-in-out w-full h-[45px] hover:bg-green-700 mt-[10px] flex flex-col justify-center items-center rounded-[5px] text-white text-center">                   
            <PaystackButton {...componentProps} />                                                 
        </div>
    );
};
