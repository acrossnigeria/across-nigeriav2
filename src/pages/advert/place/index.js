import { useEffect, useState } from "react";
import Next from "../../../../public/images/icon/Next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import StepOne from "../components/StepOne";
import StepTwo from "../components/StepTwo";
import StepThree from "../components/StepThree";
import StepFour from "../components/StepFour";
import axios from "axios";

const Page = () => {
    const router = useRouter();
    const { data:session } = useSession();
    const [ step, setStep ] = useState(1);
    
    const [ advertType, setAdvertType ] = useState(0);
    const [ billingType, setBillingType ] = useState('daily');
    const [ duration, setDuration ] = useState(1);
    const [ displayMode, setDisplayMode ] = useState('static');
    const [ contactUsButton, setContactUsButton ] = useState({});
    const [ advertImage, setAdvertImage ] = useState('');
    const [ temporaryImageFile, setTemporaryImageFile ] = useState(null);
    const [ isGettingStartAndExpiry, setIsGettingStartAndExpiry ] = useState(true);
    const [ getExpiryError, setGetExpiryError ] = useState(false);
    const [ startDate, setStartDate ] = useState('');
    const [ expiryDate, setExpiryDate ] = useState('');

    const nextScreen = () => {
        if (step<4) {
            setStep(step+1)
        }
    }

    const prevScreen = () => {
        if (step !== 1) {
            setStep(step-1)
        } else {
            router.push('/advert');
        }
    }

    const sendSuccessEmail = async ( amount, startDate, endDate, advertType) => {
        const days = billingType === "daily" ?duration:duration*31;
        const userEmail = session?.user?.email; 
        if (userEmail) {
            const data =  { recipient:userEmail, clientName:session?.user?.name, duration:days, amount, startDate, endDate, advertType };
            try {
                const response = await axios.post('/api/mail/admail', data);
                if (response.status === 200) {
                    router.push('/advert/place/success');
                }
            } catch(err) {
                console.log(`error occured: ${err.message}`)
            }
        } else {
            console.log('No email was found to send advert info to')
        }
    }

    const getStartAndExpiryDate = async () => {
        const days = billingType === "daily" ?duration:duration*31;
        const type = advertType===1?'Diamond':advertType===2?'Gold':advertType===3?'Silver':'Bronze'
        const data = {
            days,
            type,
            displayMode,
        }
        
        if ((startDate==='') && (expiryDate==='') ) {
            setIsGettingStartAndExpiry(true);
            setGetExpiryError(false);
            try {
                const response = await axios.post("/api/advert/get_start_and_expiry", data);
                const datesData = response.data?.datesData;
                setStartDate(datesData?.startDate);
                setExpiryDate(datesData?.expiryDate);
                setIsGettingStartAndExpiry(false);
            } catch ( err ) {
                setGetExpiryError(true);
                console.log('Unable to get start and expiry date', err.message);
            }
        } else {
            setIsGettingStartAndExpiry(false);
        }
        
    }


    return (
        <div className="pt-[20px] bg-gray-200 flex flex-col h-screen">
            <div className="pl-[3%] text-[18px] w-[100%]">
                <button onClick={prevScreen} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
            </div>
            { step === 1 && <StepOne nextScreen={nextScreen} selectAdvert={setAdvertType} selectedAdvert={advertType}/>}
            { step === 2 && <StepTwo 
                            duration={duration} 
                            setDuration={setDuration} 
                            billingType={billingType} 
                            setBillingType={setBillingType} 
                            nextScreen={nextScreen}
                            setDisplayMode={setDisplayMode}
                            displayMode={displayMode}
                            advertType={advertType}
                            setContactUsButton={setContactUsButton}/>
            }
            { step === 3 && <StepThree 
                            nextScreen={nextScreen}
                            setAdvertImage={setAdvertImage}
                            tempImageFile={temporaryImageFile} 
                            setTempImageFile={setTemporaryImageFile}
                            advertType={advertType} 
                            showContactUsButton={contactUsButton?.showContactButton}
                            advertImage={advertImage}/> 
            }
            { step === 4 && <StepFour
                            duration={duration}
                            billingType={billingType}
                            advertType={advertType} 
                            displayMode={displayMode}
                            showContactUsButton={contactUsButton?.showContactButton}
                            userId={session?.user?._id}
                            contactUsButton={contactUsButton}
                            success={sendSuccessEmail}
                            userEmail={session?.user?.email}
                            advertImage={advertImage}
                            getDateData={getStartAndExpiryDate}
                            startDate={startDate}
                            expiryDate={expiryDate}
                            hasLoadError={getExpiryError}
                            isLoading={isGettingStartAndExpiry}/> 
            }
        
        </div>
    )
}

Page.auth = true;

export default Page;