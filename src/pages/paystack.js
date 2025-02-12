import Layout from "@/components/Layout";
import PaystackBtn from "@/components/PaystackBtn";
import axios from "axios";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import { useContext,useEffect, useState } from "react";
import { Store } from '../../utils/Store';
import { signIn } from "next-auth/react";
import Cookies from "js-cookie";

export default function PayScreen (){
  const paystackLiveKey=process.env.PAYSTACK_TEST;
  const { state, dispatch } = useContext(Store);
  const {user:{userDetails},}= state;
  const [loading, setLoading]=useState(false)
  const router=useRouter();

  useEffect(() => {
    if (!userDetails[0]?.name) {
      router.push('/account/reg'); 
      }
      
  }, [router, userDetails]);

  const name=userDetails[0]?.name?? 'Unknownn';

  const paymentUpdate = async (ref) => { 

    const name=userDetails[0]?.name?? null;
    const surname=userDetails[0]?.surname?? null;
    const email=userDetails[0]?.email?? null;
    const phone= userDetails[0]?.phone?? null;
    const residence=userDetails[0]?.residence?? null;
    const dob=userDetails[0]?.dob?? null;
    const gender= userDetails[0]?.gender?? null;
    const password=userDetails[0]?.password?? null;

    if ( name===null || surname===null || phone===null || residence===null || dob===null || password===null || gender===null ) {
    router.push(
      {
          pathname: '/account/reg',
          query:"Fill in all required parameters"
        }
    )
    }

    setLoading(true);

    try {
      function generateRandomCode() {
        const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 7; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

      const referee = localStorage.getItem('refId');
      const randomCode = generateRandomCode();
      const refCode= name.trim()+randomCode;

      Cookies.set('refCode',refCode, {expires:1});
      localStorage.setItem("refCode",refCode);
      // Outputs something like: '4J8QKLP'

      const refInfo = ref.transaction

      const regData = await axios.post('/api/auth/signup', {
        name,surname, email, phone, residence, dob,
        gender, password, refInfo, refCode,referee
      });

      console.log(localStorage.getItem('refCode'))
      const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
      });
      if (result.error) {
          console.log(result.error);
      }
      setLoading(false)
      router.push('/success')

    } catch (err) {
      setLoading(false)
      console.log("Error in the page:",getError(err))
    }
  };
    return (
    <div>
       { loading && <div className="absolute z-50 bg-white flex flex-col justify-center items-center text-black text-center h-screen w-screen font-sans">
          <span className="font-extrabold text-[15px] text-green-700 animate-pulse">ACROSS NIGERIA REALITY SHOW</span>
          <span className="py-[10px] text-[20px]">Submiting your Details, please wait</span>
          <svg class="loader" viewBox="0 0 384 384" xmlns="http://www.w3.org/2000/svg">
          <circle
            class="active"
            pathLength="360"
            fill="transparent"
            stroke-width="32"
            cx="192"
            cy="192"
            r="176"
          ></circle>
          <circle
            class="track"
            pathLength="360"
            fill="transparent"
            stroke-width="32"
            cx="192"
            cy="192"
            r="176"
          ></circle>
          </svg>
        </div>}
       <PaystackBtn pay={paymentUpdate} paystackKey={paystackLiveKey} amount={1000} email={userDetails[0]?.email?? null} purpose="Registration to use Our Products"/>

      </div>
    
    );

 }
