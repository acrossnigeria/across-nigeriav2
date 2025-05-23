import { BearSlideImage } from "bear-react-carousel";
import Next from "../../public/images/icon/Next";

const SlideAdvertWithButton = ( { imageUrl, contact } ) => {
    function contactOnWhatsApp(phoneNumber) {
        const message = `Hello! I came across your advert on the Across Nigeria platform and I'm interested. I'd love to know more about what you offer. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    }

    return (
        <div className="h-[100%] w-[100%] flex flex-col border-1 justify-evenly items-center border-gray-400 bg-gray-200 rounded-[5px]">
            <BearSlideImage style={{ height:'85%', width:'99%', borderRadius:'5px'}} imageUrl={imageUrl} />
            <div className="flex flex-row justify-between md:px-3 w-[98%] h-[12%] items-center">
                <span className="md:text-[12px] text-[10px] text-gray-500">Sponsored</span>
                <button onClick={()=>{contactOnWhatsApp(contact)}} className="h-[99%] w-[fit] px-[5px] md:text-[16px] text-[13px] flex flex-row justify-center items-center gap-2 border-1 hover:bg-gray-300 transition-all ease-in-out duration-300 text-gray-500 border-gray-400 rounded-[5px]">
                    <span>Contact Us</span>
                    <Next size={'10px'} bg={'gray'}/>
                </button>
            </div>
        </div>
    )
}

export default SlideAdvertWithButton;