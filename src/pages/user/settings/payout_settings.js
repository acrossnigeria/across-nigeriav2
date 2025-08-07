import { useEffect, useState } from "react";
import Next from "../../../../public/images/icon/Next";
import { useRouter } from "next/router";
import CycleLoader from "@/components/CycleLoader";
import { useSession } from "next-auth/react";
import axios from "axios";

const Page = () => {
    const [ isBankInfo, setIsBankInfo ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ updateSuccess, setUpdateSuccess ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ showUpdateModal, setShowUpdateModal ] = useState(false);
    const [ modalHeight, setModalHeight ] = useState('h-[10%]');
    const [ modalOpacity, setModalOpacity ] = useState('opacity-0');
    const [ modalBlur, setModalBlur ] = useState('backdrop-blur-[0px]');
    
    //form state
    const [ bank, setBank ] = useState('');
    const [ bankName, setBankName ] = useState('');
    const [ bankAccNo, setBankAccNo ] = useState('');

    const router = useRouter();
    const { data:session } = useSession();

    const checkGetBankInfo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/api/checkers/checkUser?type=GETBANKINFO&id=${session?.user?._id}`);
            if (response.data.isBankInfoAvailable) {
                setIsBankInfo(response.data.bankInfo);
            } else {
                setIsBankInfo(null);
            }
            setIsLoading(false);
        } catch(err) {
            console.log(err.message)
            setIsLoading(false);
        }
    }

    const updateBankDetails = async () => {
        setIsSaving(true);
        try {
            const data = {
                bank,
                bankName,
                bankAccNo,
                id:session?.user?._id
            }
            const response = await axios.put(`/api/updaters/updateUser?type=UPDATEBANKINFO&id=${session?.user?._id}`, data);
            if ( response.data.success ) {
                setIsSaving(false);
                setUpdateSuccess(true);
                setIsBankInfo( { ...data })

                setTimeout(() => {
                    modal('out');
                }, 2000);
            } else {
                setIsSaving(false);
                setUpdateSuccess(false)
            }
        } catch(err) {
            console.log(err.message);
            setIsSaving(false);
            setUpdateSuccess(false)
        }
    }

    useEffect(() => {
        if (session) {
            checkGetBankInfo();
        }
    }, [ session ]);

    const modal = (type) => {
        if (type==='in') {
            setShowUpdateModal(true);

            setTimeout(() => {
                setModalHeight('h-[85%]');
                setModalOpacity('opacity-[100%]');
                setModalBlur('backdrop-blur-[2px]');
            }, 300);
        } else {
            setModalHeight('h-[10%]');
            setModalOpacity('opacity-0');
            setModalBlur('backdrop-blur-[0px]');

            setTimeout(() => {
                setShowUpdateModal(false);
            }, 500);
        }
    }

    const isFormFilled = bank !== '' && bankName !== '' && bankAccNo !== '';


    return (
        <div className="pt-[7%] bg-gray-100 flex flex-col h-screen">
            <div className="md:w-[50%] md:ml-[25%] ml-[3%] text-[18px] w-[94%]">
                <button onClick={()=>{router.push('/')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Back home</button>
            </div>
            <div className="md:w-[50%] md:ml-[25%] mt-[20px] ml-[3%] flex flex-col text-[18px] w-[94%]">
                <span className="text-[23px] font-bold">Add Bank Details</span>
                <span>Manage your bank details to make sure your payout info is accurate and up to date.</span>
            </div>
            { isLoading ? (
                <div className="md:w-[50%] md:ml-[25%] ml-[3%] items-center justify-center flex flex-col h-[150px] mt-[40px] w-[94%]">
                    <CycleLoader size={'30px'}/>
                </div>
            ): ( isBankInfo ? (
                <div className="mt-[40px] md:w-[50%] md:ml-[25%] ml-[3%] p-3 flex flex-col rounded-[15px] bg-gradient-to-b from-gray-300 to-gray-100 w-[94%] h-[150px]">
                    <span><span className="font-bold">Bank: </span>{isBankInfo.bank}</span>
                    <span><span className="font-bold">Bank name: </span>{isBankInfo.bankName}</span>
                    <span><span className="font-bold">Account number: </span>{isBankInfo.bankAccNo}</span>
                </div>
            ):(
                <div className="mt-[40px] h-[150px] text-[19px] text-gray-500 text-center">
                    <span>You have&apos;nt added any bank details</span>
                </div>
            ))
            }
            <div className="h-fit w-[94%] ml-[3%] md:w-[50%] md:ml-[25%] mt-[25px]">
                <button disabled={isLoading} onClick={()=>{modal('in')}} className={`${isLoading?'bg-gray-300':'bg-green-500 hover:bg-green-700 hover:scale-105'} h-[45px] w-[100%] text-white transition-all duration-500 ease-in-out rounded-[30px]`}>{isBankInfo?'Edit bank details':'Add bank details'}</button>
            </div>

            { showUpdateModal && 
                <div className={`h-screen w-screen transition-all duration-300 ease-in-out bg-black/10 flex flex-col justify-end ${modalBlur} fixed top-0`}>
                    <div className={`${modalHeight} ${modalOpacity} transition-all overflow-hidden duration-500 ease-in-out w-[100%] rounded-t-[30px] pt-[30px] md:px-[25%] px-[3%] bg-gray-100`}>
                        <div className="mb-[20px]">
                            <button onClick={()=>{modal('out')}} className="w-fit flex flex-row items-center transition-all duration-500 ease-in-out hover:scale-105 gap-2"><div className="rotate-180"><Next bg={'black'} size={'20px'}/></div>Go back</button>
                        </div>
                        <span className="text-[23px] font-bold">Fill In Your Bank Info</span>
                        <div className="mt-[20px] text-[18px]">
                            <div>
                                <label htmlFor="bank">Bank</label>
                                <input 
                                    type="text"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="Enter bank name.."
                                    value={bank}
                                    onChange={(e)=>{setBank(e.target.value)}}
                                />
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="bank">Bank account name</label>
                                <input 
                                    type="text"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="e.g Johnatan eze"
                                    value={bankName}
                                    onChange={(e)=>{setBankName(e.target.value)}}
                                />
                            </div>
                            <div className="mt-[10px]">
                                <label htmlFor="bank">Account number</label>
                                <input 
                                    type="number"
                                    className="h-[48px] mt-[7px] px-3 outline-none w-[100%] bg-gray-200 rounded-[15px] border-1 border-gray-400"
                                    placeholder="Enter account number.."
                                    value={bankAccNo}
                                    onChange={(e)=>{setBankAccNo(e.target.value)}}
                                />
                            </div>
                            <button 
                                disabled={!isFormFilled}
                                onClick={updateBankDetails}
                                className={`h-[45px] w-[100%] mt-[30px] flex flex-row justify-center items-center text-white ${isSaving || updateSuccess ?'bg-gray-400':(isFormFilled?'bg-green-500 hover:scale-105 hover:bg-green-700 transition-all':'bg-gray-400')} duration-500 ease-in-out rounded-[30px]`}>
                                {isSaving?(<CycleLoader size={'20px'}/>):(updateSuccess?'Saved':'Save')}
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Page;