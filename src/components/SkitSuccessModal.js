import logo1 from "../../public/images/logo1.png";
import Image from "next/image";

const SkitSuccessModal = ( { closeFunction, bgOpacity, modalOpacity } ) => {

    return (
        <div className={`fixed ${bgOpacity} transition-all duration-300 ease-in-out backdrop-blur-sm h-screen w-screen flex flex-col items-center justify-center gap-3 bg-black/50 z-[1000] top-0 left-0`}>
            <div className="h-fit flex flex-col justify-center w-[100%] items-center">
                <button onClick={()=>{closeFunction('out')}} className="border-1 text-[15px] flex flex-row gap-2 text-white hover:bg-green-600/50 hover:scale-105 transition-all duration-300 ease-in-out justify-center items-center px-[30px] py-2 rounded-[20px] mb-[20px] border-gray-100">
                    View my skit
                </button>
                <div className={`overflow-hidden h-[300px] md:w-[400px] transition-all duration-500 ease-in-out w-[80%] text-center ${modalOpacity} p-3 md:p-5 flex flex-col justify-center items-center bg-gray-100 rounded-[5px]`}>
                    <div className='text-center mb-[25px] flex flex-row justify-center gap-1 items-center'>
                        <Image src={logo1} alt='logo' placeholder='blur' className='h-[30px] w-[35px]' />
                        <div className='flex flex-col justify-center items-start gap-0'>
                            <span className='text-[12px] font-semibold text-green-700'>ACROSS NIGERIA</span>
                            <span className='text-[10px] text-green-500'>REALITY SHOW</span>
                        </div>
                    </div>
                    <span className="text-[17px]">🎉 Your skit has been successfully uploaded! 🚀🔥 Share your skit, gather votes, and claim your prize! Don't wait <br></br> <span className="font-bold">spread the word now!🎤</span></span>
                </div>
            </div>
        </div>
    )
};

export default SkitSuccessModal;