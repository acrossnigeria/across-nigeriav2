import { PaystackButton } from "react-paystack";
import { useRouter } from "next/router";


export default function PaystackClick({ amount, email, redirect, buttonText, callBack }) {

    const liveKey = 'pk_live_09ba874adcdca43ec856e37e480ec1e17dc13eda';
    const testKey = 'pk_test_cbdf33dbafe37c266634416e1b99f1f6b87e709a'
    const router = useRouter();

    // useEffect(()=>{
    //     setPrice(parseFloat(amount));
    //     const locale = price.toLocaleString();
    //     setLocalePayment(locale);
    // }, [ amount, price ])

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
        <div className="bg-green-500 cursor-pointer transition-all duration-300 ease-in-out md:w-[250px] w-[230px] h-[45px] hover:bg-green-700 border-1 border-black mt-[10px] flex flex-col justify-center items-center rounded-[25px] text-white text-center">                   
            <PaystackButton {...componentProps} />                                                 
        </div>
    );
};
