import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AddAccDetails( { userId }) {
    const [ modPosition, setModPosition ] = useState('pt-0');
    const [ modOpacity, setModOpacity ] = useState('opacity-0');
    const [ modBlur, setModBlur ] = useState('backdrop-blur-[0px]');
    const [ show, setShow ] = useState(false);

    const router = useRouter();
    

    const animation = (type) => {
        if ( type==='in') {
            setShow(true);
            setTimeout(() => {
                setModPosition('pt-[8%]');
                setModOpacity('opacity-100');
                setModBlur('backdrop-blur-[2px]');
            }, 100);
        } else {
            setModPosition('pt-0');
            setModOpacity('opacity-50');
            setModBlur('backdrop-blur-0')
            setTimeout(() => {
                setShow(false);
            }, 200);
        }
    }

    const checkAndNotify = () => {
        const lastChecked = localStorage.getItem('addBankNotifier');
        if ( lastChecked ) {
            const currentTimestamp = new Date().getTime();
            const difference = currentTimestamp - lastChecked;
            const threeHrsInMs = 2*60*60*1000;
            if ( difference >= threeHrsInMs ) {
                check();
            }
        } else {
            check();
        }
    }

    const check = async () => {
        try {
            const response = await axios.get(`/api/checkers/checkUser?type=CHECKBANKINFO&id=${userId}`);
            if (!response.data.isBankInfoAvailable) {
                animation('in');
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    const remindMeLater = () => {
        const timestamp = new Date().getTime();
        localStorage.setItem('addBankNotifier', timestamp);
        animation('out');
    }

    useEffect(() => {
        if ( userId ) {
            checkAndNotify();
        }
    }, [ userId ])
    return (
        <div className={`h-screen ${show?'':'hidden'} flex transition-all duration-500 ease-in-out flex-col items-center ${modPosition} ${modOpacity} w-screen z-[3000] bg-black/10 ${modBlur} top-0 fixed`}>
            <div className="bg-gray-100 flex flex-col p-4 text-center items-center rounded-[15px] md:w-[50%] w-[95%]">
                <span className="text-[19px] font-bold">Receive Your Winnings Securely</span>
                <div className="mt-[10px">
                    <span>To receive payments for your winnings, please add your bank account details. Your information is kept safe and used only for payouts.</span>
                </div>
                <div className="flex flex-row items-center mt-[15px] justify-around gap-3">
                    <button onClick={remindMeLater} className="text-[16px] h-[45px] hover:scale-105">Remind Me later</button> 
                    <button onClick={()=>{router.push('/user/settings/payout_settings')}} className="text-[16px] hover:bg-green-600 text-white px-[15px] bg-green-500 rounded-[30px] h-[40px]">Add Bank Details</button>
                </div>
            </div>
        </div>
    )
}