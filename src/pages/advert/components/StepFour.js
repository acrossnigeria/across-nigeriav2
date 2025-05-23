import { useEffect, useState } from "react";
import InfoIcon from "../../../../public/images/icon/InfoIcon";
import axios from "axios";
import PaystackClick from "@/components/PaystackClick";
import CycleLoader from "@/components/CycleLoader";
import ReloadIcon from "../../../../public/images/icon/ReloadIcon";


const StepFour = ( { duration, advertType, billingType, advertImage, displayMode, userEmail, userId, contactUsButton, success, isLoading, getDateData, expiryDate, startDate, hasLoadError }) => {

    const [ modalBottom, setModalBottom ] = useState('top-[-50px]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
    const [ errorMessage, setErrorMessage ] = useState('Unknon error');
    const [ isSubmiting, setIsSubmiting ] = useState(false);
    const [ allowSubmitRetry, setAllowSubmitRetry ] = useState(false);
    const [ tempPaymentRef, setTempPaymentRef ] = useState('');


    const ADVERT_RATES = [
        {   name:'Diamond', "daily":1000, "monthly":20000 },
        {   name:'Gold', 
            "static":{ "daily":500, "monthly":10000 }, 
            "scroll":{ "daily":200, "monthly":2500 } 
        },
        {   name:'Silver', 
            "static":{ "daily":200, "monthly":4000 }, 
            "scroll":{ "daily":100, "monthly":2000 } 
        },
        { name:'Bronze', "monthly":5000 }
    ]

    const showError = (error) => {
        if (error) {
            setErrorMessage(error);
        }
        setModalBottom('top-[120px]');
        setModalOpacity('opacity-100');
        setTimeout(() => {
            setModalBottom('top-[-50px]');
            setModalOpacity('opacity-0');
            setErrorMessage('Unkwown error');
        }, 1500);
    }
    
    function getAdExpiryDate(daysPaid) {
        console.log(daysPaid)
        const today = new Date();
        today.setDate(today.getDate() + daysPaid);
        return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    }
      
    const calculateTotal = () => {
        let total;
        if ( advertType === 1 || advertType === 4 ) {
            total = ADVERT_RATES[advertType-1][billingType] * duration;
        } else if ( advertType === 2 || advertType === 3 ) {
            total = ADVERT_RATES[advertType-1][displayMode][billingType]*duration;
        } else {
            total = 0;
        }
        return total;
    }
      

    const submitAdAndRedirect = async ( paymentRef ) => {
        setTempPaymentRef(paymentRef?.reference);
        setAllowSubmitRetry(false);
        setIsSubmiting(true);
        let adLength = billingType === 'daily'?duration:duration*31;
        const today = new Date();
        const startDate = today.toISOString().split('T')[0]; 
        const expiryDate = getAdExpiryDate(adLength);
        const advertTypeName = advertType===1?'Diamond':advertType===2?'Gold':advertType===3?'Silver':'Bronze';
        try {
            const data = {
                user:userId,
                startDate,
                expiryDate,
                advertImage,
                advertTypeName,
                displayMode,
                contactUsButton,
                billingType,
                paymentRef:paymentRef?.reference,
            }

            const response = await axios.post( '/api/advert/place', data);
            if (response.status === 200) {
                success(calculateTotal(), startDate, expiryDate, advertTypeName);
            } else {
                setAllowSubmitRetry(true);
                showError('Something went wrong, please check your internet connection');
            }

        } catch (err) {
            showError(err?.message)
            setAllowSubmitRetry(true);
        }
    }

    const retryCheckout = async () => {
        await getDateData();
    }

    useEffect(()=> {
        const fetchData = async () => {
            await getDateData();
        };
        fetchData();
        return () => {
            console.log('Check out page cleenup running...')
        }
    }, [])

    return (
        <div className="md:w-[70%] md:ml-[15%] mt-[20px] w-[100%] px-[3%] flex flex-col items-center text-center text-[18px]">
            { isSubmiting && (
                <div className="h-screen bg-black/70 backdrop-blur-sm gap-2 flex top-0 flex-col justify-center items-center absolute z-[100] w-screen">
                   { !allowSubmitRetry && (
                        <>
                            <CycleLoader size={'30px'}/>
                            <span className="text-white">Please wait...</span>
                        </>
                    )}
                    { allowSubmitRetry && (
                        <button onClick={()=>{submitAdAndRedirect(tempPaymentRef)}} className="flex flex-col justify-center items-center gap-3">
                            <span className="text-white">Something went wrong, Please Tap here to Re-submit</span>
                            <ReloadIcon size={'35px'} bg={'white'}/>
                        </button>
                    )}
                </div>
            )}
            <div style={{lineHeight:'16px'}} className={`fixed ${modalBottom} ${modalOpacity} transition-all text-center ease-in-out duration-500 text-red-600 bg-white z-[2000] rounded-[20px] md:w-fit w-[80%] border-b-1 border-red-500 h-fit p-3`}>
                <span>{errorMessage}</span>
            </div>
            <span style={{lineHeight:'20px'}} className="md:text-[25px] text-[20px] font-bold">Review And Checkout</span>
            <span style={{lineHeight:'20px'}} className="md:mt-[10px] mt-[4px] text-[15px]">Review Your Advert & Checkout.</span>
            <div className="md:w-[60%] w-[100%] h-[300px] bg-white rounded-[10px] flex flex-col gap-2 pt-[25px] p-3 mt-[14px]">
                { (isLoading && hasLoadError) && (
                    <div className="h-[100%] w-[100%] flex flex-col gap-2 justify-center items-center">
                        <span>Unable to load checkout</span>
                        <button onClick={retryCheckout} className="h-[35px] w-[200px] text-[14px] flex flex-row justify-center items-center text-white bg-gray-700 rounded-[15px] hover:bg-gray-600">Retry</button>
                    </div>
                )}
                { (isLoading && !hasLoadError) && (
                    <div className="h-[100%] w-[100%] flex flex-col justify-center gap-2 items-center">
                        <CycleLoader size={'20px'}/>
                        <span className="text-[13px]">Loading checkout...</span>
                    </div>
                )}
                { !isLoading && (
                    <>
                        <div className="flex flex-row gap-2">
                            <span className="font-bold">Advert level:</span>
                            <span>{advertType===1?'Diamond':advertType===2?'Gold':advertType===3?'Silver':'Bronze'}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="font-bold">Placement type:</span>
                            <span>{displayMode}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="font-bold">Billing:</span>
                            <span>{billingType}</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="font-bold">Total cost:</span>
                            <span>&#8358;{calculateTotal()}</span>
                        </div>
                        <div className="flex flex-row justify-center items-start gap-3 bg-gray-300 text-left rounded-[10px] mt-[7px] p-2">
                            <InfoIcon/>
                            <span className="text-[13px]">
                            You&apos;re about to pay &#8358;{calculateTotal()} for your advert. <br />
                            Your advert will be displayed on the site on <strong>{ startDate }</strong> and will expire on <strong>{expiryDate}</strong>
                            </span>
                        </div>
                    </>
                )}
            </div>
            { !isLoading && <PaystackClick email={userEmail} amount={calculateTotal()} redirect={'/advert/place/success'} callBack={submitAdAndRedirect} buttonText={'Pay and submit advert'}/> }
        </div>
    )
}

export default StepFour;