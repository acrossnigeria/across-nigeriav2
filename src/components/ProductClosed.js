import InfoIcon from "../../public/images/icon/InfoIcon";
import ShoutOutSuccess from "../../public/images/illustration/ShoutOutSuccess";

export default function ProductClosed() {
    return (
        <div className="flex flex-col items-center md:px-[0%] mt-[15px] px-[5%]">
            <span style={{lineHeight:'23px'}} className="text-transparent text-center font-extrabold bg-gradient-to-tr bg-clip-text from-green-700 to-green-300 text-[22px]">Giveaway Quiz Closed for December 2024</span>
            <ShoutOutSuccess/>
            <div className="md:w-[500px] flex flex-col justify-center">
                <span>Thank you for participating in the Giveaway Quiz for December 2024!</span>
                <div className="flex flex-col justify-center bg-gray-100 mt-[10px] text-gray-800 p-2 font-light rounded-[5px]">
                    <span className="text-transparent flex flex-row items-center gap-2 font-extrabold bg-gradient-to-tr bg-clip-text from-green-700 to-green-300 text-[19px]"><InfoIcon/>Winners Announcement</span>
                    <span>The winners will be contacted directly via email with instructions. Please keep an eye on your email inbox for updates.</span>        
                </div>
                <span className="text-transparent mt-[7px] font-extrabold bg-gradient-to-tr bg-clip-text from-green-700 to-green-300 text-[19px]">Stay Tuned</span>
                <span>Jan 2025 Giveaway Quizzes will begin soon. Be sure to stay connected with us for the next Giveaway quizzes!</span>
                <span className="mt-[10px]">Thank you for being part of the fun, and congratulations to all our December 2024 Giveaway Quiz participants</span>
                <div className="flex flex-row mt-[20px] rounded-[10px] pt-2 border-t-gray-500 border-t-1 gap-2 items-start">
                    <span className="text-gray-800 font-bold text-[15px]">Note:</span>
                    <span className="text-[13px] text-gray-500">If you have any questions or need further assistance, feel free to reach out to our support team through any of our social media handles.</span>
                </div>
            </div>
        </div>
    )
}